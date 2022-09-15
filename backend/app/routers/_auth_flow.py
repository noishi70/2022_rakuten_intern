import hashlib
from uuid import uuid4
from datetime import datetime, timedelta, timezone

from db import session
from fastapi import APIRouter, Depends, HTTPException
from starlette.requests import Request
from libs.auth import generate_provisional_token
from libs.mail import registration_mail_body, send_mail, password_reset_mail_body

from schemas.users import CreateUserAuth
from models.models import ProvisionalUser, User

router = APIRouter(
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)

JST = timezone(timedelta(hours=+9), 'JST')

@router.post("/provisional_signup")
async def provisional_signup(
    req: Request,
    create_user: CreateUserAuth,
):
    user = session.query(User).filter(create_user.email == User.email).first()
    if user:
        raise HTTPException(
            status_code=409, detail="This address is already registered",
        )
        
    (token, expired_at) = generate_provisional_token()
    user = session.query(ProvisionalUser).filter(create_user.email == ProvisionalUser.email).first()
    if user:
        user.token = token
        user.expired_at = expired_at
    else:
        hashed_password = hashlib.md5(create_user.password.encode()).hexdigest()
        user = ProvisionalUser(
            name=create_user.name,
            email=create_user.email,
            hashed_password=hashed_password,
            token=token,
            expired_at=expired_at,
        )
        session.add(user)
    session.commit()
    
    registration_url = f"""
    {req.base_url.scheme}://{req.base_url.hostname}:3000/mail?token={token}
    """
    
    body = registration_mail_body(
        mail_to=create_user.email,
        registration_url=registration_url,
        valid_until=expired_at,
    )
    
    print(body)
    await send_mail(create_user.email, "メールアドレスの仮登録を受け付けました", body)
    
    
@router.post("/auth_mail")
async def provisional_signup_email_verify(
    token: str, 
):
    user = session.query(ProvisionalUser).filter(ProvisionalUser.token==token).first()
    now = datetime.now(JST)
    time = datetime(now.year, now.month, now.day, now.hour, now.minute, now.second)
    if user and user.expired_at > time:
        # Prevent second attempt
        user.expired_at = datetime.now(JST)
        user_id = str(uuid4())
        db_user = User(user_id=user_id, name=user.name, email=user.email, hashed_password=user.hashed_password)
        session.add(db_user)
        provisional_user = session.query(ProvisionalUser).filter(ProvisionalUser.token==token).first()
        session.delete(provisional_user)
        session.commit()
        return {"登録完了"}
    elif user and user.expired_at < time:
        raise HTTPException(
            status_code=400,
            detail="URL expired",
        )
    elif not user:
        raise HTTPException(
            status_code=400,
            detail="URL not found",
        )
    return
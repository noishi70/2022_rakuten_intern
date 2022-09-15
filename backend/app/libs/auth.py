from datetime import datetime, timedelta, timezone
import hashlib
import os
from typing import Tuple
import secrets

from dotenv import load_dotenv
from fastapi import HTTPException, Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt
from pydantic import BaseModel

from db import session
from models.models import User
import schemas.users

load_dotenv("../.env")
SECRET_KEY: str = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
JST = timezone(timedelta(hours=+9), 'JST')

router = APIRouter()


class Token(BaseModel):
    access_token: str
    token_type: str
    

def generate_provisional_token() -> Tuple[str, datetime]:
    """メール送信のための一時的なトークンを発行

    Returns:
        Tuple[str, datetime]: トークンとトークンの期限
    """
    token = secrets.token_urlsafe(36)
    return (token, datetime.now(JST) + timedelta(minutes=30))


def authenticate(email: str, password: str) -> User:
    """パスワード認証を行う

    Args:
        email (str): emailアドレス
        hashed_password (str): ハッシュ化されたパスワード

    Raises:
        HTTPException: パスワードが異なるときのエラー

    Returns:
        User: emailとパスワードから得られた認証されたユーザ
    """
    hashed_password = hashlib.md5(password.encode()).hexdigest()
    user = session.query(User).filter(User.email==email).first()
    session.close()
    if user is None or user.hashed_password != hashed_password:
        raise HTTPException(status_code=401, detail='Incorrect password')
    
    return user


def create_tokens(user_id: str):
    """ユーザIDからトークンを作成

    Args:
        user_id (str): ユーザID
    """
    access_payload = {
        "token_type": "access_token",
        "exp": datetime.utcnow() + timedelta(minutes=60),
        "user_id": user_id
    }

    access_token = jwt.encode(access_payload, SECRET_KEY, algorithm='HS256')

    return {"access_token": access_token, 'token_type': 'bearer'}


def get_current_user_from_token(token: str, token_type: str):
    """トークンからログインユーザを取得

    Args:
        token (str): トークン
        token_type (str): トークンタイプ

    Raises:
        HTTPException: トークンタイプが違う例外
    """
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

    if payload["token_type"] != token_type:
        raise HTTPException(status_code=401, detail="token type is not correct")
    
    user = session.query(User).filter(User.user_id==payload["user_id"]).first()
    session.close()

    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """ログインユーザを返す

    Args:
        token (str, optional): トークン. Defaults to Depends(oauth2_scheme).
    """
    return get_current_user_from_token(token, "access_token")


@router.post("/token", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    """トークン発行

    Args:
        form (OAuth2PasswordRequestForm, optional): username は email であることに注意 

    Returns:
        Token: トークン
    """
    user = authenticate(form.username, form.password)
    return create_tokens(user.user_id)



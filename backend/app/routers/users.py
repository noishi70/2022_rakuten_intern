from uuid import uuid4
import hashlib
from fastapi import APIRouter, Depends, HTTPException
from typing import List

from schemas.users import User, CreateUser, UserAndPosts, PatchUser
import schemas.posts
from cruds.users import signup, get_user_by_id
from cruds.posts import fetch_posts_by_id
from cruds.follow import count_followers, count_followees
from libs.auth import get_current_user
from libs.img import save_icon_imag, change_imag_to_base64
from db import session

router = APIRouter(
    tags=["users"]
)

@router.get("/me", response_model=UserAndPosts)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """ログイン中ユーザを取得

    Args:
        current_user (User, optional): トークンにより現在のユーザを取得

    Returns:
        User: 現在のユーザ
    """
    user = get_user_by_id(user_id=current_user.user_id)
    posts = fetch_posts_by_id(user_id=current_user.user_id)
    followers = count_followers(user_id=current_user.user_id)
    followees = count_followees(user_id=current_user.user_id)

    users_posts = []
    for p in posts:
        users_post = schemas.posts.UsersPost(
            id=p.post_id,
            title=p.title,
            content=p.content,
            url=p.url,
            time=p.duration,
            datetime=p.datetime,
        )
        
        users_posts.append(users_post)
        
    head_img = change_imag_to_base64(str(user.header_img))
    img = change_imag_to_base64(str(user.icon))
    res_data = UserAndPosts(
        user_id=str(user.user_id),
        name=str(user.name),
        header_img=head_img,
        icon=img,
        comment=str(user.comment),
        email=user.email,
        follows=followers,
        followers=followees,
        posts=users_posts
    )

    return res_data

@router.post("/signup")
def user_signup(
    create_user: CreateUser,
):
    """サインアップする機能

    Args:
        email (str): emailアドレス
        password (str): パスワード
    """
    user_id = str(uuid4())
    hashed_password = hashlib.md5(create_user.password.encode()).hexdigest()
    signup(user_id=user_id, email=create_user.email, hashed_password=hashed_password)
    return 

@router.patch("/me", response_model=User)
def patch_me(patch_user: PatchUser, current_user: User = Depends(get_current_user)):
    """自身のプロフィールを変更する

    Args:
        patch_user (PatchUser): プロフィール変更のリクエストボディ
        current_user (User, optional): 現在ログインしているユーザ
    """
    me = get_user_by_id(user_id=current_user.user_id)
    if not me:
        raise HTTPException(status_code=409, detail="user not found")
    if patch_user.name:
        me.name = patch_user.name
    if patch_user.header_img:
        me.header_img = save_icon_imag(patch_user.header_img, me.header_img)
    if patch_user.icon:
        me.icon = save_icon_imag(patch_user.icon, me.icon)
    if patch_user.comment:
        me.comment = patch_user.comment
    
    session.commit()
    session.close()

    return 



@router.get("/{user_id}", response_model=UserAndPosts)
def get_user(
    user_id: str,
    current_user: User = Depends(get_current_user)
):
    """ID で指定したユーザとその投稿を返す

    Args:
        user_id (str): ユーザID
    """
    user = get_user_by_id(user_id=user_id)
    posts = fetch_posts_by_id(user_id=user_id)
    followers = count_followers(user_id=user_id)
    followees = count_followees(user_id=user_id)

    users_posts = []
    for p in posts:
        users_post = schemas.posts.UsersPost(
            id=p.post_id.v,
            title=p.title.v,
            content=p.content.v,
            url=p.url.v,
            time=p.duration.v,
            datetime=p.datetime.v,
        )
        
        users_posts.append(users_post)

    img = change_imag_to_base64(str(user.icon))
    head_img = change_imag_to_base64(str(user.header_img))
    res_data = UserAndPosts(
        user_id=str(user.user_id),
        name=str(user.name),
        header_img=head_img,
        icon=img,
        comment=str(user.comment),
        email=user.email.v,
        follows=followers,
        followers=followees,
        posts=users_posts
    )

    return res_data



@router.get("/timeline", response_model=List[schemas.posts.Post])
def get_timeline(current_user: User = Depends(get_current_user)):
    """タイムラインの投稿を取る

    Args:
        current_user (User, optional): 現在ログインしているユーザ
    """


    return 

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

    res_data = UserAndPosts(
        
    )

    return current_user

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


# ## 本当は, /users/me はトークンで current_user 的なのになる (要サーベイ)
# def mock_authorize():
#     return User(user_id=1, email="rakuten@sample.com", password="rakuten")


# @router.get("/me")
# def users_me(current_user: User = Depends(mock_authorize)):
#     """プロフィールの部分
#     """
#     return current_user


# ここまで

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
        me.header_img = patch_user.header_img
    if patch_user.icon:
        me.icon = patch_user.icon
    if patch_user.comment:
        me.comment = patch_user.comment
    
    session.commit()
    session.close()

    return 



@router.get("/{id}", response_model=UserAndPosts)
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

    return 



@router.get("/timeline", response_model=List[schemas.posts.Post])
def get_timeline(current_user: User = Depends(get_current_user)):
    """タイムラインの投稿を取る

    Args:
        current_user (User, optional): 現在ログインしているユーザ
    """


    return 

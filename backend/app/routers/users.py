from uuid import uuid4
import hashlib
from fastapi import APIRouter, Depends
from typing import List

from schemas.users import User, CreateUser, UserAndPosts
import schemas.posts
from cruds.users import signup
from libs.auth import get_current_user

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


# @router.patch("/me")
# def patch_me():
#     """プロフィールの変更
#     """
#     user = mock_authorize()
#     update_me(user_id=user.user_id, name="rakuten panda")
#     return

# ここまで


@router.get("/{id}", response_model=UserAndPosts)
def get_user(
    id: str,
    current_user: User = Depends(get_current_user)
):
    """ID で指定したユーザを返す

    Args:
        id (str): ユーザID
    """
    pass


@router.get("/timeline", response_model=List[schemas.posts.Post])
def get_timeline(current_user: User = Depends(get_current_user)):
    """タイムラインの投稿を取る

    Args:
        current_user (User, optional): 現在ログインしているユーザ
    """


    return 

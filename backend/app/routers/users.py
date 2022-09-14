import email
import hashlib
from fastapi import APIRouter, Depends

from schemas.users import User, CreateUser
from cruds.users import signup, update_me
from libs.auth import get_current_user

router = APIRouter(
    tags=["users"]
)

@router.get("/me", response_model=User)
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
    hashed_password = hashlib.md5(create_user.password.encode()).hexdigest()
    signup(email=create_user.email, hashed_password=hashed_password)
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


@router.get("/{id}")
def get_user(id: str):
    """ID で指定したユーザを返す

    Args:
        id (int): ユーザーID
    """
    pass


@router.get("/timeline")
def get_timeline():
    """タイムライン情報の取得
    """
    pass


@router.get("/favorite")
def get_favorites():
    pass


@router.post("/favorite")
def favorites(id: str):
    pass


@router.delete("/favorite")
def delete_favorites(id: str):
    pass
import email
from fastapi import APIRouter, Depends

from schemas.users import User
from cruds.users import signup, update_me

router = APIRouter()

@router.post("/signup")
def user_signup(email: str, password: str):
    signup(email, password)
    return 


## 本当は, /users/me はトークンで current_user 的なのになる (要サーベイ)
def mock_authorize():
    return User(user_id=1, email="rakuten@sample.com", password="rakuten")


@router.get("/me")
def users_me(current_user: User = Depends(mock_authorize)):
    """プロフィールの部分
    """
    return current_user


@router.patch("/me")
def patch_me():
    """プロフィールの変更
    """
    user = mock_authorize()
    update_me(user_id=user.user_id, name="rakuten panda")
    return

# ここまで


@router.get("/{id}")
def get_user(id: int):
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
def favorites(id: int):
    pass


@router.delete("/favorite")
def delete_favorites(id: int):
    pass
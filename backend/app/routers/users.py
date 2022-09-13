from fastapi import APIRouter

router = APIRouter()

@router.post("/signup")
def users_signup():
    """サインアップする機能
    """
    pass


@router.get("/me")
def users_me():
    """プロフィールの部分
    """
    pass


@router.patch("/me")
def patch_me():
    """プロフィールの変更
    """
    pass


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
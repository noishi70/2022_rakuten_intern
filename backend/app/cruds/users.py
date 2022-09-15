from typing import Optional

from db import session
from models.models import User

def signup(user_id: str, email: str, hashed_password: str) -> None:
    """DB にユーザを追加する

    Args:
        user_id (str): uuid
        email (str): Eメールアドレス
        hashed_password (str): ハッシュ化されたパスワード
    """
    user = User(user_id=user_id, name="", email=email, hashed_password=hashed_password)
    session.add(user)
    session.commit()
    session.close()

    return


def get_user_by_id(user_id: str) -> User:
    """ユーザをIDから指定して情報を取得する

    Args:
        user_id (str): userID

    Returns:
        User: ユーザの情報
    """
    user = session.query(User).filter(User.user_id==user_id).first()
    return user


def update_me(
    user_id: str,
    name: Optional[str] = "", 
    header_img: Optional[str] = None,
    icon: Optional[str] = None, 
    comment: Optional[str] = None
    ) -> None:
    """自身のプロフィールをアップデートする

    Args:
        user_id (str): userID
        name (Optional[str], optional): 変更後のユーザの名前. Defaults to "".
        header_img (Optional[str], optional): 変更後のユーザのheader. Defaults to None.
        icon (Optional[str], optional): 変更後のユーザのicon. Defaults to None.
        comment (Optional[str], optional): 変更後のユーザのプロフィールコメント. Defaults to None.
    """
    
    me = session.query(User).filter(User.user_id==user_id).first()
    if name:
        me.name = name
    if header_img:
        me.header_img = header_img
    if icon:
        me.icon = icon
    if comment:
        me.comment = comment
    
    session.commit()
    session.close()
    return 
     
    
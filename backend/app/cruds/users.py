from typing import Optional

from db import session
from models.models import User

def signup(email: str, hashed_password: str) -> None:
    """DB にユーザを追加する

    Args:
        email (str): Eメールアドレス
        hashed_password (str): ハッシュ化されたパスワード
    """
    user = User(name="", email=email, hashed_password=hashed_password)
    session.add(user)
    session.commit()
    session.close()

    return

# TODO: user を id からゲットするやつ

# TODO: me なので 認可状態で
def update_me(
    user_id: int,
    name: Optional[str] = "", 
    header_img: Optional[str] = None,
    icon: Optional[str] = None, 
    comment: Optional[str] = None
    ) -> None:
    
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
     
    
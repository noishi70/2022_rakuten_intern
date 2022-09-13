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

    return 
    
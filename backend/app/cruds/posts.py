from typing import Optional

from db import session
from sqlalchemy import and_, or_
from models.models import Post
from uuid import uuid4


def create_post(title: str, content: str, url: str, time: int, user_id: str) -> None:
    """投稿を作成してDBに流す

    Args:
        title (str): 投稿タイトル名
        content (str): 投稿内容
        url (str): 投稿のURL
        time (int): 投稿の所要時間
        user_id (str): 投稿者ID
    """
    post = Post(
        post_id=str(uuid4()),
        title=title,
        content=content,
        url=url,
        time=time, 
        user_id=user_id
    )
    
    session.add(post)
    session.commit()
    session.close()
    return 


def fetch_posts(
    key_word: Optional[str] = None,
    time: Optional[int] = None,
) -> list[Post]:
    """条件にあった投稿をDBから取得

    Args:
        key_word (Optional[str], optional): 投稿を探すためのキーワード. Defaults to None.
        time (Optional[int], optional): 通勤時間など(暇な時間のこと). Defaults to None.

    Returns:
        list[Post]: 条件にあった投稿を取得
    """
    filters = []
    if key_word:
        filters.append(
            or_(
                Post.title.like(f"%{key_word}%"),
                Post.content.like(f"%{key_word}%")
            ),
        )
    if time:
        filters.append(Post.time <= time)
    
    posts = session.query(Post) \
                .filter(and_(*filters)).all()
    session.close()
    return posts


def fetch_posts_by_id(user_id: str) -> list[Post]:
    """id から全投稿を取ってくる

    Args:
        user_id (str): userID

    Returns:
        list[Post]: 全投稿
    """
    posts = session.query(Post).filter(Post.user_id==user_id).all()
    session.close()
    return posts


def fetch_all_posts() -> list[Post]:
    """タイムラインのために全ての投稿を取る

    Returns:
        list[Post]: DBに登録されている全ての投稿
    """
    posts = session.query(Post).all()    
    session.close()
    return posts
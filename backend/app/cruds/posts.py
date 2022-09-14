from typing import Optional

from db import session
from sqlalchemy import and_, or_
from models.models import Post
from uuid import uuid4

# create
def create_post(title: str, content: str, url: str, duration: int, user_id: str) -> None:
    post = Post(
        post_id=str(uuid4()),
        title=title,
        content=content,
        url=url,
        duration=duration, 
        user_id=user_id
    )
    
    session.add(post)
    session.commit()
    session.close()
    return 

# read
def fetch_posts(
    key_word: Optional[str] = None,
    time: Optional[int] = None,
) -> list[Post]:
    filters = []
    if key_word:
        filters.append(
            or_(
                Post.title.like(f"%{key_word}%"),
                Post.content.like(f"%{key_word}%")
            ),
        )
    if time:
        filters.append(Post.duration <= time)
    
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

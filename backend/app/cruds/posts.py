from typing import Optional

from db import session
from models.models import Post

# create
def create_post(title: str, content: str, url: str, duration: int, created_by: int) -> None:
    post = Post(title=title, content=content, url=url, duration=duration, created_by=created_by)
    
    session.add(post)
    session.commit()
    session.close()
    return 

# read
def fetch_posts() -> list[Post]:
    # TODO: key_word と time に関する検索ができるようにする
    posts = session.query(Post).all()
    session.close()
    return posts

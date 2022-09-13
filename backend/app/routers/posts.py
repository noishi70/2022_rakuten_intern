from typing import Optional

from fastapi import APIRouter

from cruds.posts import  create_post,fetch_posts
from schemas.posts import Post 

router = APIRouter()


@router.post("/posts")
def post_post(title: str, content: str, url: str, duration: int):
    """"投稿を新規作成するエンドポイント

    Args:
        title (str): 投稿のタイトル
        content (str): 投稿の内容
        url (str): 投稿のURL
        duration (int): 所要時間
    """
    create_post(title=title, content=content, url=url, duration=duration)
    return 

@router.get("/posts")
def get_posts(key_word: Optional[str] = None, time: Optional[int] = None) -> list[Post]:
    """投稿を取得するエンドポイント

    Args:
        key_word (Optional[str], optional): キーワード
        time (Optional[int], optional): 投稿の内容にかかる時間

    Returns:
        list[Post]: 投稿の一覧
    """
    posts = fetch_posts()
    # schemaに移し替えす
    schema_posts = [Post(**post) for post in posts]
    
    return schema_posts

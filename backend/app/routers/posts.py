from typing import Optional, List

from fastapi import APIRouter, Depends, status, HTTPException

from cruds.posts import  create_post,fetch_posts
from models.models import Post 
from schemas.users import User

import schemas.posts
from libs.auth import get_current_user

router = APIRouter(
    tags=["posts"]
)


@router.post("/posts", status_code=status.HTTP_200_OK)
def post_post(
    create_post_body: schemas.posts.CreatePost,
    current_user: User = Depends(get_current_user)
):
    """"投稿を新規作成するエンドポイント

    Args:
        title (str): 投稿のタイトル
        content (str): 投稿の内容
        url (str): 投稿のURL
        duration (int): 所要時間
    """
    try:
        create_post(title=create_post_body.title, content=create_post_body.content, url=create_post_body.url, duration=create_post_body.duration, created_by=current_user.user_id)
    except:
        raise HTTPException(status_code=409, detail="Can't regist your post")
    return {"message": "succses"}

@router.get("/posts", response_model=List[schemas.posts.Post])
def get_posts(
    key_word: Optional[str] = None, 
    time: Optional[int] = None,
    current_user: User = Depends(get_current_user)
)-> list[Post]:
    """投稿を取得するエンドポイント

    Args:
        key_word (Optional[str], optional): キーワード
        time (Optional[int], optional): 投稿の内容にかかる時間

    Returns:
        list[Post]: 投稿の一覧
    """
    posts = fetch_posts()
    return posts

from typing import Optional, Any
from fastapi import APIRouter, Depends, status, HTTPException

from cruds.posts import  create_post,fetch_posts
from cruds.users import get_user_by_id
from models.models import Post 
from schemas.users import User
from libs.img import change_imag_to_base64

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
        time (int): 所要時間
    """
    try:
        if create_post_body.time < 0:
            raise HTTPException(status_code=409, detail="time should be positive")
        if len(create_post_body.title) > 127:
            raise HTTPException(status_code=409, detail="too long title")
        if len(create_post_body.content) > 1023:
            raise HTTPException(status_code=409, detail="too long content")
        if len(create_post_body.url) > 511:
            raise HTTPException(status_code=409, detail="too long URL")

        create_post(
            title=create_post_body.title, 
            content=create_post_body.content, 
            url=create_post_body.url, 
            time=create_post_body.time, 
            user_id=current_user.user_id,
        )
    except:
        raise HTTPException(status_code=409, detail="Can't register your post")
    return {"message": "success"}

@router.get("/posts", response_model=list[schemas.posts.Post])
def get_posts(
    key_word: Optional[str] = None, 
    time: Optional[int] = None,
    current_user: User = Depends(get_current_user)
)-> list[schemas.posts.Post]:
    """投稿を取得するエンドポイント

    Args:
        key_word (Optional[str], optional): キーワード
        time (Optional[int], optional): 投稿の内容にかかる時間

    Returns:
        list[Post]: 投稿の一覧
    """
    user_post: list[dict[str, Any]] = []
    posts = fetch_posts(key_word, time)
    for post in posts:
        user = get_user_by_id(post.user_id)
        user_dict: dict[str, Any] = dict()
        user_dict = post.to_dict()
        user_dict['name'] = user.name
        user_dict['icon'] = change_imag_to_base64(user.icon)
        user_post.append(user_dict)
    #res_posts = [schemas.posts.Post(**post.to_dict(), name="", icon="") for post in posts]
    return user_post

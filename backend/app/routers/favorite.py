from fastapi import APIRouter, Depends

from libs.auth import get_current_user
from schemas.users import User
from schemas.posts import Post as schemas_post
from cruds.users import get_user_by_id
from cruds.favorite import favorite_post_lists, give_favorite, del_favorite


router = APIRouter(tags=["favorite"])

@router.get("/users/favorites", response_model=list[schemas_post])
async def fetch_favorite_posts(current_user: User = Depends(get_current_user)):
    """自分がお気に入りした投稿を取る

    Args:
        current_user (User, optional): ログインユーザ. Defaults to Depends(get_current_user).
    """
    posts = favorite_post_lists(user_id=current_user.user_id)
    if posts:
        res_posts = [schemas_post(**post.to_dict(), name=get_user_by_id(post.user_id).name, icon=get_user_by_id(post.user_id).icon, ) for post in posts]
        return res_posts
    return []
    


@router.post("/users/favorites")
async def favorite(post_id: str, current_user: User = Depends(get_current_user)):
    """投稿をお気に入りする

    Args:
        post_id (str): 投稿ID
        current_user (User, optional): ログインユーザ. Defaults to Depends(get_current_user).
    """
    give_favorite(user_id=current_user.user_id, post_id=post_id)
    return


@router.delete("/users/favorites")
async def delete_favorite(post_id: str, current_user: User = Depends(get_current_user)):
    """投稿のおお気に入りを消す

    Args:
        post_id (str): 投稿ID
        current_user (User, optional): ログインユーザ. Defaults to Depends(get_current_user).
    """
    del_favorite(user_id=current_user.user_id, post_id=post_id)
    return 
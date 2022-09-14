from fastapi import APIRouter, Depends

from libs.auth import get_current_user
from schemas.users import User
from schemas.posts import Post as schemas_post
from models.models import Post as models_post
from cruds.users import get_user_by_id
from cruds.favorite import favorite_post_lists, give_favorite, del_favorite


router = APIRouter(tags=["favorite"])

@router.get("/users/favorite", response_model=list[schemas_post])
async def fetch_favorite_posts(current_user: User = Depends(get_current_user)):
    posts = favorite_post_lists(current_user.user_id)

    res_posts = [schemas_post(**post.to_dict(), name=post.user_id, icon=get_user_by_id(post.user_id).icon.v) for post in posts]
    return res_posts


@router.post("/users/favorite")
async def favorite(post_id: str, current_user: User = Depends(get_current_user)):
    give_favorite(user_id=current_user.user_id, post_id=post_id)
    return


@router.delete("/users/favorite")
async def delete_favorite(post_id: str, current_user: User = Depends(get_current_user)):
    del_favorite(user_id=current_user.user_id, post_id=post_id)
    return 
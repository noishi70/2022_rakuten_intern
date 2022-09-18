from fastapi import APIRouter, Depends

from libs.auth import get_current_user
from schemas.users import User
from schemas.follow import CreateFollow
from cruds.follow import follow,unfollow

router = APIRouter(
    tags=["follow"]
)

@router.post('/users/follow')
def follow_users(
    followee: CreateFollow,
    follower: User = Depends(get_current_user),
):
    """ユーザをフォローする

    Args:
        followee (CreateFollow): フォロイーの情報
        follower (User, optional): ログインユーザ. Defaults to Depends(get_current_user).
    """
    follow(
        follower_id=follower.user_id,followee_id=followee.followee_id
    )
    return

@router.delete('/users/follow')
def delete_follow(
    followee: CreateFollow,
    follower: User = Depends(get_current_user),
):
    """ユーザをアンフォローする

    Args:
        followee (CreateFollow): フォロイーの情報
        follower (User, optional): ログインユーザ. Defaults to Depends(get_current_user).
    """
    unfollow(
        follower_id=follower.user_id,
        followee_id=followee.followee_id,
    )
    return

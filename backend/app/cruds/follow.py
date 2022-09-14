from db import session
from models.models import Follow
from sqlalchemy import and_


def follow(follower_id: str, followee_id: str):
    """DBにフォロー情報を追加する

    Args:
        follower_id (str): フォローを行うユーザのid
        followee_id (str): フォローされるユーザのid
    """
    follow = Follow(follower_id=follower_id, followee_id=followee_id)
    session.add(follow)
    session.commit()
    session.close()
    return

def unfollow(follower_id: str, followee_id: str):
    """DBのフォロー情報を削除する

    Args:
        follower_id (str): フォローを行ったユーザのid
        followee_id (str): フォローされたユーザのid
    """
    follow = session.query(Follow) \
            .filter(
                and_(
                    Follow.follower_id==follower_id, 
                    Follow.followee_id==followee_id)
            ).first()
    
    # もし該当するfollow条件がなければそのまま終了する
    if follow is None:
        session.close()
        return
    
    # もし該当するfollowがあれば削除
    session.delete(follow)
    session.commit()
    session.close()
    return
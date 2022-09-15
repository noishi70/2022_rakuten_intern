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


def get_followers(followee_id: str):
    """フォロワーIDを取得

    Args:
        followee_id (str): 自分のID
    """
    followers = session.query(Follow) \
        .filter(Follow.followee_id==followee_id).all()
    session.close()
    return followers


def get_followees(follower_id: str):
    """フォロイーIDを取得

    Args:
        follower_id (str): 自分のID
    """
    followees = session.query(Follow) \
        .filter(Follow.follower_id==follower_id).all()
    session.close()
    return followees

def count_followers(user_id: str):
    """フォロワーの数を取得

    Args:
        user_id (str): 自分のID
    """
    number_of_followers = session.query(Follow) \
                    .filter(Follow.follower_id == user_id).count()
    session.close()
    return number_of_followers

def count_followees(user_id: str):
    """フォロイーの数を取得

    Args:
        user_id (str): 自分のID
    """
    number_of_followers = session.query(Follow) \
                    .filter(Follow.follower_id == user_id).count()
    session.close()
    return number_of_followers

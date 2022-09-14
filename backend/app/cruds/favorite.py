from fastapi import HTTPException
from sqlalchemy import and_

from db import session
from models.models import UserFavoritePost, Post


def favorite_post_lists(user_id: str) -> Post:
    """DBからfavoriteの情報を受け取る

    Args:
        user_id (str): userID

    Returns:
        Post: お気に入りしている投稿
    """
    favs = session.query(UserFavoritePost).filter(UserFavoritePost.user_id==user_id).all()
    posts = [session.query(Post).filter(Post.post_id==fav.post_id).first() for fav in favs]

    session.close()
    
    return posts


def give_favorite(user_id: str, post_id: str):
    """投稿にお気に入りをつけてDBに反映

    Args:
        user_id (str): userID
        post_id (str): 投稿のID

    Raises:
        HTTPException: 投稿をすでにお気に入りしている
        HTTPException: 投稿が存在しない
    """
    exists = session.query(UserFavoritePost).filter(UserFavoritePost.post_id==post_id).filter(UserFavoritePost.user_id==user_id).first()
    if exists:
        raise HTTPException(status_code=409, detail="already favorite the post")

    favorite_post = session.query(Post).filter(Post.post_id==post_id).first()
    if not favorite_post:
        raise HTTPException(status_code=409, detail="post doesn't exsit")

    user_favorite_post = UserFavoritePost(user_id=user_id, post_id=favorite_post.post_id)
    if not user_favorite_post:
        raise HTTPException(status_code=409, detail="post doesn't exsit")

    session.add(user_favorite_post)
    session.commit()
    session.close()

    return 


def del_favorite(user_id: str, post_id: str):
    """投稿からお気に入りを消す

    Args:
        user_id (str): userID
        post_id (str): 投稿のID

    Raises:
        HTTPException: 投稿が存在しない
    """
    post = session.query(UserFavoritePost).filter(UserFavoritePost.post_id==post_id).filter(UserFavoritePost.user_id==user_id).first()
    if not post:
        raise HTTPException(status_code=409, detail="post doesn't exsit")
    
    session.delete(post)
    session.commit()
    session.close()

    return

    

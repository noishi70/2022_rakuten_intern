from uuid import uuid4
import hashlib
from fastapi import APIRouter, Depends, HTTPException
from cruds.users import is_exist_user_by_email

from schemas.users import User, CreateUser, UserAndPosts, PatchUser
import schemas.posts
from cruds.users import signup, get_user_by_id
from cruds.posts import fetch_posts_by_id, fetch_all_posts
from cruds.follow import count_followers, count_followees, get_followees
from libs.auth import get_current_user
from libs.img import save_icon_imag, change_imag_to_base64
from db import session

router = APIRouter(
    tags=["users"]
)


@router.get("/timeline", response_model=list[schemas.posts.Post])
def get_timeline(current_user: User = Depends(get_current_user)):
    """フォローしている人のタイムラインの投稿を取る

    Args:
        current_user (User, optional): 現在ログインしているユーザ
    """
    posts = fetch_all_posts()
    
    followee_ids = get_followees(current_user.user_id)
    res_posts = [schemas.posts.Post(**post.to_dict(), name=get_user_by_id(post.user_id).name, icon=get_user_by_id(post.user_id).icon) for post in posts if post.user_id in followee_ids]
    return res_posts


@router.get("/me", response_model=UserAndPosts)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """ログイン中ユーザを取得

    Args:
        current_user (User, optional): トークンにより現在のユーザを取得

    Returns:
        User: 現在のユーザ
    """
    user = get_user_by_id(user_id=current_user.user_id)
    posts = fetch_posts_by_id(user_id=current_user.user_id)
    followers = count_followers(user_id=current_user.user_id)
    followees = count_followees(user_id=current_user.user_id)

    users_posts = []
    for p in posts:
        users_post = schemas.posts.UsersPost(
            id=p.post_id,
            title=p.title,
            content=p.content,
            url=p.url,
            time=p.time,
            datetime=p.datetime,
        )
        
        users_posts.append(users_post)
    
    head_img = change_imag_to_base64(str(user.header_img))
    img = change_imag_to_base64(str(user.icon))

    res_data = UserAndPosts(
        user_id=str(user.user_id),
        name=str(user.name),
        header_img=head_img,
        icon=img,
        comment=str(user.comment),
        email=user.email,
        follows=followers,
        followers=followees,
        posts=users_posts
    )

    return res_data

@router.post("/signup")
def user_signup(
    create_user: CreateUser,
):
    """サインアップする機能

    Args:
        email (str): emailアドレス
        password (str): パスワード
    """
    email = create_user.email
    if is_exist_user_by_email(email):
        return HTTPException(status_code=400, detail="Bad Requests")
    user_id = str(uuid4())
    hashed_password = hashlib.md5(create_user.password.encode()).hexdigest()
    signup(user_id=user_id, email=create_user.email, hashed_password=hashed_password)
    return 

@router.patch("/me", response_model=User)
def patch_me(patch_user: PatchUser, current_user: User = Depends(get_current_user)):
    """自身のプロフィールを変更する

    Args:
        patch_user (PatchUser): プロフィール変更のリクエストボディ
        current_user (User, optional): 現在ログインしているユーザ
    """
    me = get_user_by_id(user_id=current_user.user_id)
    if not me:
        raise HTTPException(status_code=409, detail="user not found")
    if patch_user.name and len(str(patch_me))< 32:
        me.name = patch_user.name
    if patch_user.header_img:
        me.header_img = save_icon_imag(patch_user.header_img, me.header_img)
    if patch_user.icon:
        me.icon = save_icon_imag(patch_user.icon, me.icon)
    if patch_user.comment:
        me.comment = patch_user.comment
    
    session.commit()
    session.close()

    return 



@router.get("/{user_id}", response_model=UserAndPosts)
def get_user(
    user_id: str,
    current_user: User = Depends(get_current_user)
):
    """ID で指定したユーザとその投稿を返す

    Args:
        user_id (str): ユーザID
    """
    user = get_user_by_id(user_id=user_id)
    posts = fetch_posts_by_id(user_id=user_id)
    followers = count_followers(user_id=user_id)
    followees = count_followees(user_id=user_id)

    users_posts = []
    for p in posts:
        users_post = schemas.posts.UsersPost(
            id=p.post_id,
            title=p.title,
            content=p.content,
            url=p.url,
            time=p.time,
            datetime=p.datetime,
        )
        
        users_posts.append(users_post)

    img = change_imag_to_base64(str(user.icon))
    head_img = change_imag_to_base64(str(user.header_img))
    res_data = UserAndPosts(
        user_id=str(user.user_id),
        name=str(user.name),
        header_img=head_img,
        icon=img,
        comment=str(user.comment),
        email=user.email,
        follows=followers,
        followers=followees,
        posts=users_posts
    )

    return res_data




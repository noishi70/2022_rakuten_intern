from fastapi import APIRouter

router = APIRouter()

@router.post("/users/signup")
def users_signup():
    """サインアップする機能
    """
    pass


@router.get("/users/me")
def users_me():
    """プロフィールの部分
    """
    pass


@router.get("/users/{id}")
def get_user(id: int):
    """ID で指定したユーザを返す

    Args:
        id (int): ユーザーID
    """
    pass


@router.patch("/users/me")
def patch_me():
    """プロフィールの変更
    """
    pass


@router.get("/users/timeline")
def get_timeline():
    """タイムライン情報の取得
    """
    pass


# @router.post("/users/post")
# # TODO: Post の schemas をかく
# def post_post(post: Post):
#     """投稿をする機能

#     Args:
#         post (Post): 投稿内容
#     """
#     pass






# API設計
# /apiの配下に設置

# /users/sigunup(post)
# body
# {email: email_str
# password: str
# }
# return{
# 204 or 409
# }

# pass
# /token(post)
# body
# {email: email_str
# password: str
# }
# return
# {
# token:str
# tpkem_type:str
# }

# /users/me(get)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# return
# {
# id: int
# name: str
# header_img : str(base64)
# icon: str(base64)
# comment: str
# follows : int
# followers : int
# posts: {
#  id: int
#  title: str
#  content: str
#  url: str
#  datetime: str
#  }
# }

# /users/:id(get)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# return
# {
# name: str
# header_img : str(base64)
# icon: str(base64)
# comment: str
# follows : int
# followers : int
# posts: {
#  id: int
#  title: str
#  content: str
#  url: str
#  datetime: str
#  }
# }

# /users/me(patch)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# body
# {
# name: str
# header_img : str(base64)
# icon: str(base64)
# comment: str
# }
# retrun{
# 200 or 409
# }

# /users/timeline(get)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# return{
# [
# user_id:int
# name: str
# icon:str
# post_id: int
# title: str
# content: str
# url: str
# datetime: str
# ]

# }

# /users/post(post)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# body
# {
# title: str
#  content: str
#  url: str
# }
# retrun{
# 200 or 409
# }


# /posts(get)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# Query params
# {
# key_word : str
# }
# return{
# [
# user_id:int
# name: str
# icon:str
# post_id: int
# title: str
# content: str
# url: str
# datetime: str
# ]
# }

# /usrs/favorites(get)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# return{
# [
# usr_id:int
# name: str
# icon:str
# post_id: int
# title: str
# content: str
# url: str
# datetime: str

# ]
# }

# /users/favorite(post)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# body{
# id: int
# }
# return{
# 201 or 409
# }

# /users/favorite(delete)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# body{
# id: int
# }
# return{
# 204 or 409
# }

# /users/follow(post)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# body{
# id: int
# }
# return{
# 201 or 409
# }

# /users/follow(delete)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# body{
# id: int
# }
# return{
# 204 or 409
# }

# /ranking(get)
# headers
# {
# Authorization: "bearer aaaaaa"
# }
# return{
# [
# user_id:int
# name: str
# icon:str
# post_id: int
# title: str
# content: str
# url: str
# datetime: str
# ]
# }

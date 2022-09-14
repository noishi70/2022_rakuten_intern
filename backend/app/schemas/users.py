from typing import Optional

from pydantic import BaseModel, Field, EmailStr
from schemas.posts import Post

# TODO: ID => UUID
class User(BaseModel):
    user_id: str 
    name: Optional[str] = Field(None)
    header_img: Optional[str] = Field(None)
    icon: Optional[str] = Field(None)
    comment: Optional[str] = Field(None)
    email: EmailStr

    class Config:
        orm_mode = True
        
class CreateUser(BaseModel):
    email: EmailStr
    password: str


class UserAndPosts(User):
    posts: list[Post]
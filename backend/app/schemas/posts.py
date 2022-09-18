from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field



# TODO: ID => UUID

class Post(BaseModel):
    user_id: str
    name: str
    icon: str
    post_id: str
    title: str
    content: str
    url: str
    datetime: datetime
    time: int

    class Config:
        orm_mode = True
        
class CreatePost(BaseModel):
    title: str
    content: str
    url: str
    time: int


class UsersPost(BaseModel):
    id: str
    title: str
    content: str
    url: str
    time: int
    datetime: datetime
    
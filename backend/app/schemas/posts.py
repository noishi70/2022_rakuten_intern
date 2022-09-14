from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field



# TODO: ID => UUID

class Post(BaseModel):
    created_by: int
    name: str
    icon: str
    post_id: str
    title: str
    content: str
    url: str
    datetime: datetime
    duration: int

    class Config:
        orm_mode = True
        
class CreatePost(BaseModel):
    title: str
    content: str
    url: str
    duration: str
    
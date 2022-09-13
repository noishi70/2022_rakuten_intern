from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field


class Post(BaseModel):
    post_id: int
    title: str
    content: str
    url: str
    datetime: datetime

    class Config:
        orm_mode = True
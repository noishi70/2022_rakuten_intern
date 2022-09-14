from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field



# TODO: ID => UUID

class Post(BaseModel):
    post_id: str
    title: str
    content: str
    url: str
    datetime: datetime
    duration: int
    created_by: int

    class Config:
        orm_mode = True
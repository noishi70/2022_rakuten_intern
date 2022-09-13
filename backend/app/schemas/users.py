from typing import Optional

from pydantic import BaseModel, Field


class User(BaseModel):
    user_id: int 
    name: str
    header_img: Optional[str] = Field(None)
    icon: Optional[str] = Field(None)
    comment: Optional[str] = Field(None)

    class Config:
        orm_mode = True

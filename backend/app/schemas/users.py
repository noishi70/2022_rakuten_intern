from typing import Optional

from pydantic import BaseModel, Field


class User(BaseModel):
    user_id: int 
    name: Optional[str] = Field(None)
    header_img: Optional[str] = Field(None)
    icon: Optional[str] = Field(None)
    comment: Optional[str] = Field(None)
    email: str
    password: str

    class Config:
        orm_mode = True

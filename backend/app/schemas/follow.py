from pydantic import BaseModel

class CreateFollow(BaseModel):
    followee_id: str

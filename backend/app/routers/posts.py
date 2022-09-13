from typing import Optional

from fastapi import APIRouter


router = APIRouter()


@router.post("/posts")
def post_post():
    pass


@router.get("/posts")
def get_post(key_word: Optional[str] = None, time: Optional[int] = None):
    pass

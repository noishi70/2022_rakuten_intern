from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from sqlalchemy.sql.functions import current_timestamp

from db import Base

# TODO: ID => UUID

class UserFavoritePost(Base):
    """User がお気に入りに登録した Post
    """
    __tablename__ = "user_favorite_posts"
    user_id = Column(String(64), ForeignKey("users.user_id"), primary_key=True)
    post_id = Column(String(64), ForeignKey("posts.post_id"), nullable=False)


class User(Base):
    __tablename__ = "users"

    # TODO: UUID
    user_id = Column(String(64), primary_key=True)
    name = Column(String(32), nullable=False)
    email = Column(String(32), nullable=False)
    header_img = Column(String(1024), default='./img/defalut_header.jpg')
    icon = Column(String(1024), default='./img/defalut_icon.jpg')
    comment = Column(String(512))
    hashed_password = Column(String(512), nullable=False)

    def to_schema(self):
        return{
            "user_id": self.user_id,
            "name": self.name,
            "email": self.email,
            "header_img": self.header_img,
            "icon": self.icon,
            "comment": self.comment,
        }

    # post = relationship("Post", back_populates="users")
    
class ProvisionalUser(Base):
    __tablename__ = "provisional_users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(64), nullable=False, index=True)
    email = Column(String(64), nullable=False, unique=True, index=True)
    hashed_password = Column(String(128), nullable=False)
    token = Column(String(256), nullable=False, unique=True)
    created_at = Column(
        Timestamp,
        nullable=False,
        server_default=current_timestamp(),
    )

    expired_at = Column(Timestamp, nullable=False, server_default=current_timestamp())
    
    def __init__(self, name: str, email: str, hashed_password: str, token: str, expired_at: datetime) -> None:
        self.name = name
        self.email = email
        self.hashed_password = hashed_password
        self.token = token
        self.expired_at = expired_at

class Post(Base):
    __tablename__ = "posts"

    post_id = Column(String(64), primary_key=True)
    title = Column(String(128), nullable=False)
    content = Column(String(1024))
    url = Column(String(512))
    datetime = Column(DateTime, default=datetime.now(), nullable=False)
    time = Column(Integer)
    user_id = Column(String(64), ForeignKey("users.user_id"), nullable=False)

    def to_dict(self):
        return {
            "post_id": self.post_id,
            "title": self.title,
            "content": self.content,
            "url": self.url,
            "datetime": self.datetime,
            "time": self.time,
            "user_id": self.user_id
        }
    


# class ProvisionalUser(Base):
#     __tablename__ = "provisional_users"

class Follow(Base):
    __tablename__ = "follow"

    follower_id = Column(String(64), ForeignKey("users.user_id"), primary_key=True)
    followee_id = Column(String(64), ForeignKey("users.user_id"), nullable=False)


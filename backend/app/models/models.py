from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

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
    header_img = Column(String(1024))
    icon = Column(String(1024))
    comment = Column(String(512))
    hashed_password = Column(String(512), nullable=False)

    # post = relationship("Post", back_populates="users")


class Post(Base):
    __tablename__ = "posts"

    post_id = Column(String(64), primary_key=True)
    title = Column(String(128), nullable=False)
    content = Column(String(1024))
    url = Column(String(512))
    datetime = Column(DateTime, default=datetime.now(), nullable=False)
    duration = Column(Integer)
    created_by = Column(String(64), ForeignKey("users.user_id"), nullable=False)

    def to_dict(self):
        return {
            "post_id": self.post_id,
            "title": self.title,
            "content": self.content,
            "url": self.url,
            "datetime": self.datetime,
            "duration": self.duration,
            "created_by": self.created_by
        }
    


# class ProvisionalUser(Base):
#     __tablename__ = "provisional_users"

class Follow(Base):
    __tablename__ = "follow"

    follower_id = Column(String(64), ForeignKey("users.user_id"), primary_key=True)
    followee_id = Column(String(64), ForeignKey("users.user_id"), nullable=False)


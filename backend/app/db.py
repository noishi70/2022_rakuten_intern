from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

URL = "mysql+pymysql://root:docker@db:3306/demo?charset=utf8"

Engine = create_engine(URL, echo=True)
session = sessionmaker(
    autocommit=False, autoflush=False, bind=Engine
)

Base = declarative_base()
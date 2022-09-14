from typing import Optional
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, scoped_session
from dotenv import load_dotenv
import os

load_dotenv("../.env")

DRIVER_NAME: Optional[str] = os.environ.get("DRIVER_NAME")
DB_USER: Optional[str] = os.environ.get("DB_USER")
DB_PASSWORD: Optional[str] = os.environ.get("DB_PASSWORD")
DB_HOST: Optional[str] = os.environ.get("DB_HOST")
DB_PORT: Optional[str] = os.environ.get("DB_PORT")
DB_NAME: Optional[str] = os.environ.get("DB_NAME")
SECRET_KEY: Optional[str] = os.environ.get("SECRET_KEY")

# URL = f"{DRIVER_NAME}+pymysql://{DB_USER}:{DB_USER}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8"
URL = "mysql+pymysql://root:docker@db:3306/reakuten_db?charset=utf8"

Engine = create_engine(URL, echo=True)
session = scoped_session(
    sessionmaker(
        autocommit=False, 
        autoflush=False, 
        bind=Engine
    )
)

Base = declarative_base()
Base.query = session.query_property()
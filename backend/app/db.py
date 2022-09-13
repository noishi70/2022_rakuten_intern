from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, scoped_session

URL = "mysql+pymysql://root:docker@db:3306/demo?charset=utf8"

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
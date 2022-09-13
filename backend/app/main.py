from fastapi import FastAPI
from routers import users
from routers import posts
import auth

app = FastAPI()

app.include_router(users.router, prefix="/api/users")
app.include_router(posts.router, prefix="/api")
app.include_router(auth.router)

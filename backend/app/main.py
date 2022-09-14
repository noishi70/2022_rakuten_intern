from fastapi import FastAPI
from routers import users
from routers import posts
from routers import follow
from routers import favorite
from routers import _auth_flow
from libs import auth

app = FastAPI()

app.include_router(auth.router)
app.include_router(favorite.router, prefix="/api")
app.include_router(users.router, prefix="/api/users")
app.include_router(posts.router, prefix="/api")
app.include_router(follow.router, prefix="/api")
app.include_router(_auth_flow.router, prefix="/api/auth")
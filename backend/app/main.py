from fastapi import FastAPI
from routers import users
from routers import posts
from routers import follow
from routers import favorite
from routers import _auth_flow
from starlette.middleware.cors import CORSMiddleware
from libs import auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["content-disposition"],
)

app.include_router(auth.router)
app.include_router(favorite.router, prefix="/api")
app.include_router(users.router, prefix="/api/users")
app.include_router(posts.router, prefix="/api")
app.include_router(follow.router, prefix="/api")
app.include_router(_auth_flow.router, prefix="/api/auth")
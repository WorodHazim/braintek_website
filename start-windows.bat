@echo off
setlocal
if not exist .env (
  copy .env.example .env >nul
  echo Created .env from .env.example. Review secrets before non-local use.
)
docker compose up --build

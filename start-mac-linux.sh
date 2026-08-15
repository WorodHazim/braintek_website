#!/usr/bin/env sh
set -eu
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example. Review secrets before non-local use."
fi
docker compose up --build

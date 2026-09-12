# Multi-Service Application

A production-style Docker Compose project demonstrating:

- React
- Node.js Express
- MongoDB
- Redis
- Nginx
- Docker Compose
- Docker secrets
- Multi-stage builds
- Custom base images
- Docker networks
- Persistent volumes
- Health checks
- Log rotation

## Architecture

Browser
    |
    v
Nginx
    |
    +---- React
    |
    +---- Express API
              |
              +---- MongoDB
              |
              +---- Redis

## Start the project

Build the custom base images:

docker compose --profile build-base build

Build application images:

docker compose build

Start:

docker compose up -d

Check:

docker compose ps

Open:

http://localhost:8080

## API

GET /api

GET /api/items

GET /health

## Logs

docker compose logs -f

API logs:

docker compose logs -f api

Nginx logs:

docker compose logs -f nginx

## Stop

docker compose down

## Remove volumes

docker compose down -vdocker --version
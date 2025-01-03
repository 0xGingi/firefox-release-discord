#!/bin/bash

if [ ! -f .env ]; then
    echo "Error: .env file not found"
    echo "Please run 'bun run setup' first and configure your .env file"
    exit 1
fi

docker stop firefox-release-bot
docker rm firefox-release-bot
docker run -d \
    --name firefox-release-bot \
    --restart unless-stopped \
    --env-file .env \
    -v "$(pwd)/data:/app/data" \
    0xgingi/firefox-release-discord:latest 
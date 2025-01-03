# 🦊 Firefox Release Discord Bot

A Discord bot that monitors Firefox releases and notifies you when a new version is available. Built with Bun and Docker.

## Quick Start

### Using Docker (Recommended)

1. In a New Directory, Create your .env file and the data/ directory
```
mkdir firefox-release-discord
touch .env
mkdir data
```

2. Edit `.env` with your Discord bot token and channel ID

3. Run with Docker
```
docker run -d \
    --name firefox-release-bot \
    --restart unless-stopped \
    --env-file /path/to/.env \
    -v "/path/to/data:/app/data" \
    0xgingi/firefox-release-discord:latest
```

### Manual Setup

1. Install dependencies
```
bun install
```

2. Copy your example.env as .env
```
bun run setup
```

3. Run the bot
```
bun start
```

## Configuration

Edit your `.env` file with the following variables:
```
DISCORD_TOKEN=your_bot_token_here
CHANNEL_ID=your_channel_id_here
CHECK_INTERVAL=3600000
FIREFOX_RELEASES_URL=https://www.mozilla.org/en-US/firefox/releases/ 
```

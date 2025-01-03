# 🦊 Firefox Release Discord Bot

A Discord bot that monitors Firefox releases and notifies you when a new version is available. Built with Bun and Docker.

## Quick Start

### Using Docker (Recommended)

1. Clone the repository
```
git clone https://github.com/0xgingi/firefox-release-discord
cd firefox-release-discord
```

2. Copy the example.env file as .env
```
cp example.env .env
```

3. Edit `.env` with your Discord bot token and channel ID

4. Run with Docker
```
./docker.sh
```

### Manual Setup

1. Install dependencies
```
bun install
```

2. Configure your environment
```
bun run setup
```

3. Run the bot
```
bun start
```

## Configuration

Create a `.env` file with the following variables:
```
DISCORD_TOKEN=your_bot_token_here
CHANNEL_ID=your_channel_id_here
CHECK_INTERVAL=3600000  # Check interval in milliseconds (default: 1 hour)
```
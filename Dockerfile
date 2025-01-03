FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --frozen-lockfile

COPY src/ src/
RUN mkdir -p data

ENV CHECK_INTERVAL=3600000
ENV FIREFOX_RELEASES_URL=https://www.mozilla.org/en-US/firefox/releases/

# Run the bot
CMD ["bun", "start"] 
export const CONFIG = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  CHANNEL_ID: process.env.CHANNEL_ID,
  CHECK_INTERVAL: parseInt(process.env.CHECK_INTERVAL || '3600000'),
  FIREFOX_RELEASES_URL: process.env.FIREFOX_RELEASES_URL || 'https://www.mozilla.org/en-US/firefox/releases/'
}; 
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { CONFIG } from './config.js';
import { loadLastVersion, saveLastVersion } from './storage.js';

if (!CONFIG.DISCORD_TOKEN || !CONFIG.CHANNEL_ID) {
  console.error('Missing required environment variables. Please check your .env file');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let lastVersion = loadLastVersion();

function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  // Pad arrays to same length
  while (parts1.length < parts2.length) parts1.push(0);
  while (parts2.length < parts1.length) parts2.push(0);
  
  for (let i = 0; i < parts1.length; i++) {
    if (parts1[i] > parts2[i]) return 1;
    if (parts1[i] < parts2[i]) return -1;
  }
  return 0;
}

async function checkFirefoxVersion() {
  try {
    const response = await fetch(CONFIG.FIREFOX_RELEASES_URL);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Get the first major version section and all its point releases
    const firstVersionBlock = $('ol > li').first();
    const mainVersion = firstVersionBlock.find('strong').text().trim();
    const pointReleases = firstVersionBlock.find('ol > li').map((_, el) => $(el).text().trim()).get();
    
    // Get the latest version (either the point release if exists, or main version)
    const latestVersion = pointReleases.length > 0 ? pointReleases[0] : mainVersion;
    
    console.log('Raw version data:', {
      mainVersion,
      pointReleases,
      latestVersion
    });

    if (!latestVersion) {
      console.error('Failed to parse version number');
      return;
    }

    console.log(`Checking version: ${latestVersion} (Previous: ${lastVersion || 'none'})`);

    if (!lastVersion) {
      lastVersion = latestVersion;
      saveLastVersion(latestVersion);
      console.log(`Initial Firefox version: ${latestVersion}`);
      return;
    }

    if (compareVersions(latestVersion, lastVersion) > 0) {
      const channel = client.channels.cache.get(CONFIG.CHANNEL_ID);
      if (channel) {
        const embed = new EmbedBuilder()
          .setTitle('New Firefox Version Released! 🦊')
          .setColor('#FF7139')
          .setDescription(`Firefox has been updated from ${lastVersion} to ${latestVersion}`)
          .setURL(CONFIG.FIREFOX_RELEASES_URL)
          .setTimestamp();

        await channel.send({ embeds: [embed] });
      }
      
      lastVersion = latestVersion;
      saveLastVersion(latestVersion);
      console.log(`New Firefox version detected: ${latestVersion}`);
    }
  } catch (error) {
    console.error('Error checking Firefox version:', error);
  }
}

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  checkFirefoxVersion();
  setInterval(checkFirefoxVersion, CONFIG.CHECK_INTERVAL);
});

client.login(CONFIG.DISCORD_TOKEN); 
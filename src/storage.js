import { existsSync, readFileSync, writeFileSync } from 'fs';

const STORAGE_FILE = './data/version.json';

export function loadLastVersion() {
    try {
        if (existsSync(STORAGE_FILE)) {
            const data = JSON.parse(readFileSync(STORAGE_FILE, 'utf8'));
            return data.version;
        }
    } catch (error) {
        console.error('Error loading version:', error);
    }
    return null;
}

export function saveLastVersion(version) {
    try {
        const dir = './data';
        if (!existsSync(dir)) {
            Bun.mkdir(dir);
        }
        writeFileSync(STORAGE_FILE, JSON.stringify({ version }, null, 2));
    } catch (error) {
        console.error('Error saving version:', error);
    }
} 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_DIR = path.join(__dirname, '../cache');
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

/**
 * Get cached data by key
 * @param {string} key - Cache key
 * @returns {object|null} - Cached data or null if not found/expired
 */
export const getCachedData = (key) => {
    try {
        const cacheFile = path.join(CACHE_DIR, `${key}.json`);

        if (!fs.existsSync(cacheFile)) {
            return null;
        }

        const stats = fs.statSync(cacheFile);
        const now = Date.now();
        const fileAge = now - stats.mtimeMs;

        // Check if expired
        if (fileAge > DEFAULT_TTL) {
            fs.unlinkSync(cacheFile);
            console.log(`[CacheService] Cache expired and deleted: ${key}`);
            return null;
        }

        const data = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
        console.log(`[CacheService] Cache hit for key: ${key}`);
        return data;
    } catch (error) {
        console.error('[CacheService] Error reading cache:', error);
        return null;
    }
};

/**
 * Set cached data
 * @param {string} key - Cache key
 * @param {object} data - Data to cache
 */
export const setCachedData = (key, data) => {
    try {
        const cacheFile = path.join(CACHE_DIR, `${key}.json`);
        fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2), 'utf8');
        console.log(`[CacheService] Cached data for key: ${key}`);
    } catch (error) {
        console.error('[CacheService] Error writing cache:', error);
    }
};

/**
 * Clear all expired cache entries
 */
export const clearExpiredCache = () => {
    try {
        const files = fs.readdirSync(CACHE_DIR);
        const now = Date.now();
        let cleared = 0;

        files.forEach((file) => {
            const filePath = path.join(CACHE_DIR, file);
            const stats = fs.statSync(filePath);
            const fileAge = now - stats.mtimeMs;

            if (fileAge > DEFAULT_TTL) {
                fs.unlinkSync(filePath);
                cleared++;
            }
        });

        if (cleared > 0) {
            console.log(`[CacheService] Cleared ${cleared} expired cache files`);
        }
    } catch (error) {
        console.error('[CacheService] Error clearing expired cache:', error);
    }
};

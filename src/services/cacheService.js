// Cache service for managing localStorage operations
const CACHE_PREFIX = 'tide_chart_';
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get cached data by key
 * @param {string} key - Cache key
 * @returns {object|null} - Cached data or null if not found/expired
 */
export const getCachedData = (key) => {
    try {
        const cacheKey = CACHE_PREFIX + key;
        const cached = localStorage.getItem(cacheKey);

        if (!cached) {
            return null;
        }

        const { data, expiry } = JSON.parse(cached);

        // Check if expired
        if (Date.now() > expiry) {
            localStorage.removeItem(cacheKey);
            return null;
        }

        console.log(`[CacheService] Cache hit for key: ${key}`);
        return data;
    } catch (error) {
        console.error('[CacheService] Error reading cache:', error);
        return null;
    }
};

/**
 * Set cached data with TTL
 * @param {string} key - Cache key
 * @param {object} data - Data to cache
 * @param {number} ttl - Time to live in milliseconds (default: 24 hours)
 */
export const setCachedData = (key, data, ttl = DEFAULT_TTL) => {
    try {
        const cacheKey = CACHE_PREFIX + key;
        const expiry = Date.now() + ttl;

        const cacheEntry = {
            data,
            expiry,
        };

        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
        console.log(`[CacheService] Cached data for key: ${key}, expires at: ${new Date(expiry).toISOString()}`);
    } catch (error) {
        console.error('[CacheService] Error writing cache:', error);
    }
};

/**
 * Clear all expired cache entries
 */
export const clearExpiredCache = () => {
    try {
        const keys = Object.keys(localStorage);
        let cleared = 0;

        keys.forEach((key) => {
            if (key.startsWith(CACHE_PREFIX)) {
                try {
                    const cached = JSON.parse(localStorage.getItem(key));
                    if (Date.now() > cached.expiry) {
                        localStorage.removeItem(key);
                        cleared++;
                    }
                } catch (e) {
                    // Invalid cache entry, remove it
                    localStorage.removeItem(key);
                    cleared++;
                }
            }
        });

        if (cleared > 0) {
            console.log(`[CacheService] Cleared ${cleared} expired cache entries`);
        }
    } catch (error) {
        console.error('[CacheService] Error clearing expired cache:', error);
    }
};

/**
 * Clear all cache entries
 */
export const clearAllCache = () => {
    try {
        const keys = Object.keys(localStorage);
        let cleared = 0;

        keys.forEach((key) => {
            if (key.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(key);
                cleared++;
            }
        });

        console.log(`[CacheService] Cleared ${cleared} cache entries`);
    } catch (error) {
        console.error('[CacheService] Error clearing cache:', error);
    }
};

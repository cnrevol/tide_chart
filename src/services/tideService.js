import axios from 'axios';
import { getCachedData, setCachedData } from './cacheService';

const API_KEY = import.meta.env.VITE_QWEATHER_API_KEY;
const API_HOST = import.meta.env.VITE_QWEATHER_API_HOST;
const TIDE_BASE_URL = `${API_HOST}/v7/ocean/tide`;
const GEO_BASE_URL = `${API_HOST}/geo/v2/poi/lookup`;

export const getTideData = async (lng, lat, date) => {
    console.log(`[TideService] getTideData called with: lng=${lng}, lat=${lat}, date=${date}`);

    try {
        // Step 1: Find the nearest tide station (POI type: TSTA)
        console.log(`[TideService] Requesting POI Lookup: ${GEO_BASE_URL}?location=${lng},${lat}&type=TSTA`);
        const poiResponse = await axios.get(GEO_BASE_URL, {
            params: {
                location: `${lng},${lat}`,
                type: 'TSTA',
                key: API_KEY,
            },
        });

        console.log('[TideService] POI Response:', poiResponse.data);

        if (poiResponse.data.code !== '200' || !poiResponse.data.poi || poiResponse.data.poi.length === 0) {
            console.error('[TideService] No tide station found.');
            throw new Error('No tide station found near this location.');
        }

        const stationId = poiResponse.data.poi[0].id;
        const stationName = poiResponse.data.poi[0].name;
        console.log(`[TideService] Found tide station: ${stationName} (${stationId})`);

        // Generate cache key based on station ID and date
        const cacheKey = `${stationId}_${date}`;

        // Step 2: Check cache first
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
            console.log('[TideService] Returning cached tide data');
            return cachedData;
        }

        // Step 3: Get tide data for the station from API
        console.log(`[TideService] Requesting Tide Data: ${TIDE_BASE_URL}?location=${stationId}&date=${date}`);
        const tideResponse = await axios.get(TIDE_BASE_URL, {
            params: {
                location: stationId,
                date: date,
                key: API_KEY,
            },
        });

        console.log('[TideService] Tide Response:', tideResponse.data);

        if (tideResponse.data.code !== '200') {
            console.error(`[TideService] Failed to fetch tide data. Code: ${tideResponse.data.code}`);
            throw new Error(`Failed to fetch tide data. Code: ${tideResponse.data.code}`);
        }

        // Step 4: Cache the successful response
        setCachedData(cacheKey, tideResponse.data);

        return tideResponse.data;

    } catch (error) {
        console.error('[TideService] Error fetching tide data:', error);
        throw error;
    }
};

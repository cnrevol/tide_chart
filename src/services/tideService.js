import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getTideData = async (lng, lat, date) => {
    console.log(`[TideService] getTideData called with: lng=${lng}, lat=${lat}, date=${date}`);

    try {
        console.log(`[TideService] Requesting from backend: ${API_URL}/api/tide`);
        const response = await axios.get(`${API_URL}/api/tide`, {
            params: {
                lng,
                lat,
                date,
            },
        });

        console.log('[TideService] Backend response:', response.data);
        return response.data;

    } catch (error) {
        console.error('[TideService] Error fetching tide data:', error);
        throw error;
    }
};

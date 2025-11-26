import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { getTideData } from './services/tideService.js';
import { clearExpiredCache } from './services/cacheService.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Clear expired cache on startup
clearExpiredCache();

// API Routes
app.get('/api/tide', async (req, res) => {
    try {
        const { lng, lat, date } = req.query;

        // Validate parameters
        if (!lng || !lat || !date) {
            return res.status(400).json({
                error: 'Missing required parameters: lng, lat, date',
            });
        }

        const tideData = await getTideData(parseFloat(lng), parseFloat(lat), date);
        res.json(tideData);
    } catch (error) {
        console.error('[Server] Error:', error);
        res.status(500).json({
            error: error.message || 'Failed to fetch tide data',
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const server = app.listen(PORT, () => {
    console.log(`[Server] Tide Chart API server running on http://localhost:${PORT}`);
    console.log(`[Server] QWeather API Host: ${process.env.QWEATHER_API_HOST}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('[Server] Server error:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('[Server] SIGTERM received, closing server...');
    server.close(() => {
        console.log('[Server] Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('[Server] SIGINT received, closing server...');
    server.close(() => {
        console.log('[Server] Server closed');
        process.exit(0);
    });
});

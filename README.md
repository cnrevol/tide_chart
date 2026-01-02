# 🌊 Tide Chart - Real-time Tide Forecast Visualization

A modern web application for real-time tide data visualization with interactive location selection and beautiful chart rendering.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Node](https://img.shields.io/badge/Node-18+-339933.svg)

## ✨ Features

- **📍 Multiple Location Selection Methods**
  - GPS-based automatic location detection
  - Interactive map-based location selection (powered by Amap)
  - Manual coordinate input

- **📊 Interactive Tide Charts**
  - Real-time tide height visualization using ECharts
  - Current time indicator on the chart
  - Smooth animations and responsive design
  - 24-hour tide forecast display

- **💾 Smart Caching System**
  - Server-side file-based caching for better data reusability
  - Automatic cache expiration management
  - Reduced API calls and faster response times

- **🎨 Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design for all devices
  - Real-time data updates

## 🛠️ Technology Stack

### Frontend
- **React 19.2** - Modern UI library with latest features
- **Vite** - Fast build tool and dev server
- **ECharts** - Professional data visualization library
- **Amap (高德地图)** - Interactive map integration
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **File-based Caching** - Persistent data storage
- **CORS** - Cross-origin resource sharing support

### APIs
- **QWeather API** - Tide data provider
- **Amap API** - Location and map services

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- QWeather API key ([Get it here](https://dev.qweather.com/))
- Amap API key ([Get it here](https://lbs.amap.com/))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tide_chart.git
   cd tide_chart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `.env` file in the root directory:
   ```env
   VITE_AMAP_KEY=your_amap_api_key_here
   VITE_QWEATHER_KEY=your_qweather_api_key_here
   VITE_API_BASE_URL=http://localhost:3001
   ```

   Create `server/.env` file:
   ```env
   QWEATHER_API_KEY=your_qweather_api_key_here
   QWEATHER_API_HOST=https://api.qweather.com
   PORT=3001
   ```

4. **Start the application**

   Option 1 - Run both frontend and backend together:
   ```bash
   npm run dev:all
   ```

   Option 2 - Run separately:
   ```bash
   # Terminal 1 - Backend server
   npm run server

   # Terminal 2 - Frontend dev server
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🚀 Usage

1. **Select a Location**
   - Click "Get Current Location" to use your device's GPS
   - Or click on the map to select any coastal location
   - The selected coordinates will be displayed

2. **View Tide Data**
   - Tide chart will automatically load for the selected location
   - The chart shows tide heights over a 24-hour period
   - A vertical line indicates the current time
   - Hover over the chart to see detailed tide information

3. **Automatic Updates**
   - The current time indicator updates every minute
   - Cached data is automatically managed by the server

## 📁 Project Structure

```
tide_chart/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── LocationManager.jsx   # Location selection component
│   │   └── TideChart.jsx         # Tide chart visualization
│   ├── services/            # Frontend services
│   │   └── tideService.js        # API client
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── server/                   # Backend server
│   ├── services/            # Server services
│   │   ├── tideService.js        # Tide data fetching
│   │   └── cacheService.js       # Cache management
│   ├── cache/               # Cache storage directory
│   └── index.js             # Express server
├── public/                   # Static assets
├── .env                      # Frontend environment variables
├── server/.env              # Backend environment variables
└── package.json             # Project dependencies
```

## 🔧 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend API server
- `npm run dev:all` - Start both frontend and backend concurrently
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### GET `/api/tide`
Fetch tide data for a specific location and date.

**Query Parameters:**
- `lng` (required) - Longitude
- `lat` (required) - Latitude
- `date` (required) - Date in YYYYMMDD format

**Example:**
```bash
curl "http://localhost:3001/api/tide?lng=121.4737&lat=31.2304&date=20260102"
```

### GET `/health`
Health check endpoint.

## 🗺️ Caching Strategy

The application implements a smart server-side caching system:

- **Cache Key Format**: `tide_{lng}_{lat}_{date}.json`
- **Cache Location**: `server/cache/` directory
- **Cache Duration**: 24 hours
- **Auto-cleanup**: Expired cache files are automatically removed on server startup

This approach ensures:
- Faster response times for repeated queries
- Reduced API usage and costs
- Better data reusability across multiple clients

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [QWeather](https://www.qweather.com/) - Tide data provider
- [Amap](https://lbs.amap.com/) - Map and location services
- [ECharts](https://echarts.apache.org/) - Data visualization library
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ for ocean enthusiasts and coastal communities

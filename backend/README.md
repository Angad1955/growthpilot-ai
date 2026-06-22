# GrowthPilot AI — Backend API

Express + TypeScript API deployed on **Render**, storing data in **MongoDB Atlas**.

## Architecture

```
User → Vercel (Frontend) → Render (This API) → MongoDB Atlas
                                 ↕
                           Google Gemini AI
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/analyze` | Run Gemini AI analysis, save & return strategy |
| GET | `/api/analyze` | Fetch last 20 saved strategies |
| POST | `/api/bookings` | Create a demo booking |
| GET | `/api/bookings` | List all bookings |
| PATCH | `/api/bookings/:id/status` | Update booking status |
| POST | `/api/waitlist` | Add email to waitlist |
| GET | `/api/waitlist/count` | Get total waitlist count |

## Local Development

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Fill in MONGODB_URI and GEMINI_API_KEY in .env

# 3. Run dev server (hot reload)
npm run dev
# → http://localhost:4000
```

## Deploy to Render

1. Push this `backend/` folder to a GitHub repo (or a monorepo).
2. In [Render dashboard](https://dashboard.render.com), click **New → Web Service**.
3. Connect your repo and set **Root Directory** to `backend`.
4. Render will auto-detect `render.yaml` — just add the three secret env vars:
   - `MONGODB_URI` — from Atlas → Connect → Drivers
   - `GEMINI_API_KEY` — from Google AI Studio
   - `ALLOWED_ORIGINS` — your Vercel URL e.g. `https://growthpilot.vercel.app`

## Connect the Frontend (Vercel)

In your Vercel project, add an environment variable:

```
VITE_API_URL=https://growthpilot-api.onrender.com
```

Then update your frontend `fetch` calls from `/api/analyze` to:

```ts
const API = import.meta.env.VITE_API_URL ?? '';
fetch(`${API}/api/analyze`, { ... });
```

## MongoDB Atlas Setup

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Add a database user with read/write access.
3. Whitelist `0.0.0.0/0` in Network Access (Render uses dynamic IPs).
4. Copy the connection string into `MONGODB_URI`.

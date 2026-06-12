# Nomea

Nomea is a ranch management dashboard for cow-calf operations. It turns the Ranching 4 Profit methodology into an interactive 90-day action plan — with a 10-dimension diagnostic, prioritized ROI-ranked tasks, and the key performance indicators that separate profitable ranches from subsistence ones.

## Stack

- React 18 + TypeScript
- Vite 5
- Deploy: Railway (via Nixpacks)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy on Railway

1. Push this repo to GitHub
2. Railway → **New Project → Deploy from GitHub repo**
3. Select the repo — Nixpacks auto-detects the setup
4. **Settings → Networking → Generate Domain** for a public URL

> `railway.json` already configures the correct start command (`npm run preview`) with `$PORT` support.

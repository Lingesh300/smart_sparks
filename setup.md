# Math Galaxy Setup & Production Deployment Guide

This guide covers deployment options for Math Galaxy across **Render** and **Google Cloud Run**.

---

## 1. Local Development Setup

```bash
# Install dependencies
npm install

# Set your Gemini API Key in .env
echo "GEMINI_API_KEY=your_key_here" > .env

# Run Vite development server
npm run dev
```

---

## 2. Deploying to Render (Recommended)

Math Galaxy includes a ready-to-use `render.yaml` blueprint defining:
1. **Frontend Static Site**: Built with Vite, served with custom embedding headers (`Content-Security-Policy: frame-ancestors *;`).
2. **Backend Proxy Service**: Lightweight Node.js server (`server/server.mjs`) managing Gemini AI requests, rate limits, and secret isolation.

### Steps on Render:
1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** → **Blueprint**.
3. Select this repository. Render automatically reads `render.yaml`.
4. In the environment variables prompt, enter your `GEMINI_API_KEY` for the backend service.
5. Click **Apply**.

---

## 3. Deploying to Google Cloud Run (Containerized)

Math Galaxy includes a multi-stage `Dockerfile` and `nginx.conf`:
- **Stage 1 (Builder)**: Node 20 compiles the Vite static bundle.
- **Stage 2 (Runner)**: Minimal Nginx image (~25MB) serves the bundle on port `8080` with SPA fallback.

### Deploy Command:
```bash
gcloud run deploy math-galaxy \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars GEMINI_API_KEY="YOUR_KEY"
```

---

## 4. Parent Platform Embedding

When integrating Math Galaxy into an existing LMS or learning portal:

1. **Embed via Iframe**:
   ```html
   <iframe 
     src="https://your-math-galaxy-app.com/?embed=true&grade=12&lesson=g12-l1-riemann-sums"
     width="100%" 
     height="750px"
     allow="microphone; speech-synthesis"
     style="border: none; border-radius: 1.5rem;"
   ></iframe>
   ```

2. **Cross-Origin PostMessage Integration**:
   - Math Galaxy fires `MATH_GALAXY` events for:
     - `LESSON_COMPLETED`
     - `QUIZ_COMPLETED`
     - `GAME_COMPLETED`
     - `PROGRESS_UPDATED`
   - You can securely track student grades and time spent directly inside your parent backend!

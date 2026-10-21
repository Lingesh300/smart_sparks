import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

/**
 * Math Galaxy Secure Backend Server
 * Automatically loads .env / .env.local from the project root so `npm run server`
 * picks up GEMINI_API_KEY or VITE_GEMINI_API_KEY without manual export commands.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const loadEnvFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      let val = line.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch (err) {
    console.warn('Could not read env file:', filePath, err);
  }
};

loadEnvFile(path.join(projectRoot, '.env.local'));
loadEnvFile(path.join(projectRoot, '.env'));

const PORT = process.env.PORT || 4000;
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY ||
  process.env.VITE_GEMINI_API_KEY ||
  process.env.API_KEY ||
  '';

// Rate limiting: 40 requests per minute per IP
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 40;

const checkRateLimit = (ip) => {
  const now = Date.now();
  const clientData = requestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT_WINDOW_MS;
    requestCounts.set(ip, clientData);
    return true;
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  clientData.count++;
  requestCounts.set(ip, clientData);
  return true;
};

// Initialize Google GenAI on server
let aiClient = null;
if (GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
}

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const clientIp = req.socket.remoteAddress || 'unknown';

  // Health check endpoint
  if (req.url === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'Math Galaxy Secure AI Backend',
      hasApiKey: Boolean(GEMINI_API_KEY)
    });
  }

  // AI Proxy endpoint
  if (req.url === '/api/ai/generate' && req.method === 'POST') {
    if (!checkRateLimit(clientIp)) {
      return sendJson(res, 429, {
        error: 'Too many requests. Please wait a moment before asking again.'
      });
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.socket.destroy();
      }
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { action, text, history = [], context = '', grade, topic } = payload;

        if (!GEMINI_API_KEY) {
          // Return source: 'educational_fallback' when no server key is configured
          return sendJson(res, 200, {
            success: true,
            source: 'educational_fallback',
            data: {
              speech_response: `Welcome to Math Galaxy! Exploring **Grade ${grade || 'K-12'} Math** on **${topic || 'Mathematics'}**. How can Cosmo guide your mission today?`,
              svg_code: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#0f172a"/><circle cx="400" cy="300" r="120" fill="#6366f1" opacity="0.4"/><text x="400" y="300" text-anchor="middle" dominant-baseline="middle" fill="#38bdf8" font-family="sans-serif" font-size="28" font-weight="bold">Math Galaxy Mission Center</text><text x="400" y="340" text-anchor="middle" dominant-baseline="middle" fill="#94a3b8" font-family="sans-serif" font-size="16">Ready for your mathematical journey</text></svg>`,
              question: 'Would you like to explore an interactive visual or solve a practice challenge?',
              scaffolding_state: 'example'
            }
          });
        }

        if (!aiClient) {
          aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        }

        // Action routing
        if (action === 'tutor') {
          const systemInstruction = [
            `You are 'Cosmo', the encouraging, expert Astro-Owl math tutor in Math Galaxy.`,
            `The student is studying Grade ${grade || '12'} Mathematics, focusing on: ${topic || 'Georgia Mathematics Standards'}.`,
            `Context & Active Learning Memory: "${context}"`,
            ``,
            `PEDAGOGICAL RULES:`,
            `1. Prioritize intuitive visual examples before introducing complex notation.`,
            `2. Format ALL mathematical equations cleanly using LaTeX (e.g. $x^2$, $\\frac{a}{b}$, $\\int_a^b f(x)\\,dx$).`,
            `3. Speak with warmth, enthusiasm, and age-appropriate game analogies (satellites, orbits, cosmic energy).`,
            `4. 'svg_code': Provide a rich, colorful textbook SVG diagram fitting strictly within viewBox="0 0 800 600". Use dark cosmic or clean educational styling with centered text.`,
            `5. Return strictly valid JSON.`
          ].join('\n');

          const contents = history.map(h => ({
            role: h.role,
            parts: [{ text: h.text }]
          }));

          contents.push({
            role: 'user',
            parts: [{ text: text || 'Hello Cosmo!' }]
          });

          const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  svg_code: { type: Type.STRING, nullable: true },
                  speech_response: { type: Type.STRING },
                  question: { type: Type.STRING, nullable: true },
                  scaffolding_state: { type: Type.STRING, enum: ['example', 'problem', 'fading'] }
                },
                required: ['speech_response', 'scaffolding_state']
              }
            }
          });

          const parsed = JSON.parse(response.text || '{}');
          return sendJson(res, 200, { success: true, data: parsed });
        }

        if (action === 'quiz') {
          const prompt = [
            `Create a 3-question multiple choice quiz for Grade ${grade || 12} Georgia Math on topic: "${topic || context}".`,
            `Format mathematical choices with clean LaTeX where applicable.`,
            `Return strictly valid JSON with topic, questions (question, options [4 items], correctAnswerIndex [0-3], explanation).`
          ].join('\n');

          const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  topic: { type: Type.STRING },
                  questions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswerIndex: { type: Type.INTEGER },
                        explanation: { type: Type.STRING }
                      },
                      required: ['question', 'options', 'correctAnswerIndex', 'explanation']
                    }
                  }
                },
                required: ['topic', 'questions']
              }
            }
          });

          const parsed = JSON.parse(response.text || '{}');
          return sendJson(res, 200, { success: true, data: parsed });
        }

        return sendJson(res, 400, { error: `Unsupported action: ${action}` });
      } catch (err) {
        console.error('Server AI Generation Error:', err);
        return sendJson(res, 500, {
          error: 'AI service temporarily unavailable. Falling back to local course curriculum.'
        });
      }
    });
    return;
  }

  sendJson(res, 404, { error: 'Not Found' });
});

server.listen(PORT, () => {
  console.log(`🌌 Math Galaxy Secure AI Backend listening on port ${PORT} (API Key loaded: ${Boolean(GEMINI_API_KEY)})`);
});

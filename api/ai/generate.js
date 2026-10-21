import { GoogleGenAI, Type } from '@google/genai';

/**
 * Vercel Serverless Function: /api/ai/generate
 * Allows GEMINI_API_KEY to be stored as a private/sensitive environment variable in Vercel
 * without requiring a VITE_ prefix.
 */
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.API_KEY ||
    ''
  ).trim();

  if (!apiKey) {
    return res.status(200).json({
      success: true,
      source: 'educational_fallback',
      data: null
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { action, text, history = [], context = '', grade, topic, isQuickMode } = payload;

    if (action === 'tutor') {
      const systemInstruction = [
        `You are 'Cosmo', the encouraging, expert Astro-Owl math tutor in Math Galaxy.`,
        `The student is studying Grade ${grade || 'K-12'} Mathematics, focusing on: ${topic || context || 'Georgia Mathematics Standards'}.`,
        `Context & Active Learning Memory: "${context}"`,
        ``,
        `PEDAGOGICAL RULES:`,
        `1. Prioritize intuitive visual examples before introducing complex notation.`,
        `2. Format ALL mathematical equations cleanly using LaTeX (e.g. $x^2$, $\\frac{a}{b}$, $\\int_a^b f(x)\\,dx$).`,
        `3. Speak with warmth, clarity, and structured step-by-step guidance.`,
        `4. 'svg_code': Provide a rich, colorful textbook SVG diagram fitting strictly within viewBox="0 0 800 600".`,
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

      const response = await ai.models.generateContent({
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
            required: isQuickMode ? ['speech_response'] : ['speech_response', 'scaffolding_state']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.status(200).json({ success: true, data: parsed });
    }

    if (action === 'quiz') {
      const prompt = [
        `Create a 3-question multiple choice quiz for Grade ${grade || 12} Georgia Math on topic: "${topic || context}".`,
        `Format mathematical choices with clean LaTeX where applicable.`,
        `Return strictly valid JSON with topic, questions (question, options [4 items], correctAnswerIndex [0-3], explanation).`
      ].join('\n');

      const response = await ai.models.generateContent({
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
      return res.status(200).json({ success: true, data: parsed });
    }

    return res.status(400).json({ error: `Unsupported action: ${action}` });
  } catch (err) {
    console.error('Vercel API Route Error:', err);
    return res.status(200).json({
      success: false,
      source: 'educational_fallback',
      data: null
    });
  }
}

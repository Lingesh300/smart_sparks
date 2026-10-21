import { GoogleGenAI, Type } from "@google/genai";
import { TutorResponse, QuizData } from '../types';

/**
 * Math Galaxy AI Tutor & Gemini Integration Service
 * 1. Tries /api/ai/generate backend/serverless proxy first.
 * 2. Tries client-side Gemini SDK using localStorage key, VITE_GEMINI_API_KEY, or GEMINI_API_KEY.
 * 3. Falls back across gemini-2.5-flash -> gemini-2.0-flash.
 * 4. If offline or key unavailable, uses the built-in Smart Mathematics Knowledge Engine
 *    so students always receive rich, topic-specific LaTeX explanations and custom SVG diagrams.
 */

export const LOCAL_API_KEY_STORAGE = 'mathgalaxy_gemini_api_key';

export const getStoredApiKey = (): string => {
  if (typeof window === 'undefined') return '';
  return (localStorage.getItem(LOCAL_API_KEY_STORAGE) || '').trim();
};

export const setStoredApiKey = (key: string): void => {
  if (typeof window === 'undefined') return;
  if (key.trim()) {
    localStorage.setItem(LOCAL_API_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(LOCAL_API_KEY_STORAGE);
  }
};

export const hasConfiguredApiKey = (): boolean => {
  const stored = getStoredApiKey();
  const viteKey = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const definedKey = typeof process !== 'undefined' && (process as any).env?.GEMINI_API_KEY;
  return Boolean((stored || viteKey || definedKey || '').trim());
};

const getClient = (): GoogleGenAI | null => {
  const stored = getStoredApiKey();
  const viteKey = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY;
  const definedKey = typeof process !== 'undefined' && (process as any).env?.GEMINI_API_KEY;
  const envKey = (stored || viteKey || definedKey || '').trim();
  if (!envKey) return null;
  return new GoogleGenAI({ apiKey: envKey });
};

const safeParseJSON = <T>(text: string): T => {
  const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleaned) as T;
};

const callBackendAiProxy = async (payload: any): Promise<any | null> => {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      if (result && result.source === 'educational_fallback') {
        return null;
      }
      if (result && result.data) {
        return result.data;
      }
    }
  } catch (err) {
    // Backend proxy offline or unreachable; proceed to client SDK
  }
  return null;
};

const generateWithFallback = async (
  ai: GoogleGenAI,
  modelName: string,
  params: any
) => {
  const candidateModels = [modelName, "gemini-2.0-flash"];
  let lastError: any = null;
  for (const model of candidateModels) {
    try {
      return await ai.models.generateContent({
        ...params,
        model
      });
    } catch (err: any) {
      lastError = err;
      console.warn(`Gemini attempt with ${model} failed:`, err?.message || err);
    }
  }
  throw lastError;
};

// ── BUILT-IN SMART MATHEMATICS KNOWLEDGE & SVG ENGINE ─────────────────────────
export const buildSmartMathResponse = (
  userMessage: string,
  activeTutorMemory?: string | null,
  contextMemory?: string,
  isQuickMode: boolean = false
): TutorResponse => {
  const query = `${userMessage} ${activeTutorMemory || ''} ${contextMemory || ''}`.toLowerCase();
  const userLower = userMessage.toLowerCase();

  // 1. Trigonometry / Sine / Cosine / Tangent / Unit Circle
  if (
    userLower.includes('trig') ||
    userLower.includes('sin') ||
    userLower.includes('cos') ||
    userLower.includes('tan') ||
    userLower.includes('soh') ||
    userLower.includes('radian') ||
    userLower.includes('unit circle') ||
    (!userLower.trim() && (query.includes('trig') || query.includes('unit circle')))
  ) {
    return {
      speech_response:
        `### Trigonometry & The Sine Function ($\\sin\\theta$)\n\n` +
        `In **Right Triangle Trigonometry** (Georgia Standard G.GSR.6 & PC.TR.1), the three primary ratios connect an angle $\\theta$ to the ratio of two sides (__SOH-CAH-TOA__):\n\n` +
        `$$\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}, \\qquad \\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}, \\qquad \\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}$$\n\n` +
        `- **Worked Example ($30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ$ Triangle)**: At $\\theta = 30^\\circ$ ($\\frac{\\pi}{6}$ radians), if the hypotenuse is $10$, the opposite side is $10 \\cdot \\sin(30^\\circ) = 10 \\cdot \\frac{1}{2} = 5$.\n` +
        `- **Unit Circle Wave**: On a circle of radius $r = 1$, $\\sin(\\theta)$ is the vertical **height ($y$-coordinate)** and $\\cos(\\theta)$ is the horizontal **width ($x$-coordinate)**, satisfying $\\sin^2\\theta + \\cos^2\\theta = 1$.`,
      svg_code: isQuickMode
        ? null
        : `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="500" fill="#0f172a" rx="18"/>
          <text x="400" y="38" text-anchor="middle" fill="#f8fafc" font-family="Inter, sans-serif" font-size="20" font-weight="bold">Trigonometry: Right Triangle Ratios (SOH-CAH-TOA) &amp; Sine Wave</text>
          <!-- Left Card: Right Triangle -->
          <rect x="30" y="65" width="355" height="400" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="207" y="98" text-anchor="middle" fill="#38bdf8" font-family="Inter, sans-serif" font-size="15" font-weight="bold">1. Right Triangle Model</text>
          <polygon points="75,360 315,360 315,150" fill="#1d4ed8" fill-opacity="0.22" stroke="#38bdf8" stroke-width="3"/>
          <polyline points="290,360 290,335 315,335" fill="none" stroke="#94a3b8" stroke-width="2"/>
          <path d="M 130 360 A 55 55 0 0 0 118 322" fill="none" stroke="#fbbf24" stroke-width="3"/>
          <text x="145" y="345" fill="#fbbf24" font-family="Inter, sans-serif" font-size="18" font-weight="bold">θ</text>
          <text x="195" y="388" text-anchor="middle" fill="#cbd5e1" font-family="Inter, sans-serif" font-size="14" font-weight="bold">Adjacent = cos(θ) · Hyp</text>
          <text x="345" y="255" text-anchor="middle" fill="#f472b6" font-family="Inter, sans-serif" font-size="14" font-weight="bold" transform="rotate(-90 345 255)">Opposite = sin(θ) · Hyp</text>
          <text x="175" y="238" text-anchor="middle" fill="#38bdf8" font-family="Inter, sans-serif" font-size="15" font-weight="bold">Hypotenuse (c)</text>
          <text x="207" y="432" text-anchor="middle" fill="#fbbf24" font-family="Inter, sans-serif" font-size="14" font-weight="bold">sin(θ) = Opp / Hyp   |   cos(θ) = Adj / Hyp</text>
          <!-- Right Card: Sine Wave y = sin(x) -->
          <rect x="415" y="65" width="355" height="400" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="592" y="98" text-anchor="middle" fill="#a78bfa" font-family="Inter, sans-serif" font-size="15" font-weight="bold">2. Continuous Sine Wave y = sin(θ)</text>
          <line x1="445" y1="260" x2="745" y2="260" stroke="#64748b" stroke-width="2"/>
          <line x1="455" y1="130" x2="455" y2="390" stroke="#64748b" stroke-width="2"/>
          <path d="M 455 260 Q 525 120 595 260 T 735 260" fill="none" stroke="#f472b6" stroke-width="4"/>
          <circle cx="525" cy="190" r="6" fill="#fbbf24"/>
          <line x1="525" y1="190" x2="525" y2="260" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="525" y="172" text-anchor="middle" fill="#fbbf24" font-family="Inter, sans-serif" font-size="12" font-weight="bold">Peak: sin(π/2) = 1</text>
          <text x="595" y="282" text-anchor="middle" fill="#94a3b8" font-family="Inter, sans-serif" font-size="12">π (180°)</text>
          <text x="730" y="282" text-anchor="middle" fill="#94a3b8" font-family="Inter, sans-serif" font-size="12">2π (360°)</text>
          <text x="592" y="432" text-anchor="middle" fill="#e2e8f0" font-family="Inter, sans-serif" font-size="13">Identity: sin²(θ) + cos²(θ) = 1</text>
        </svg>`,
      question: "Would you like to solve a right-triangle problem using $\\sin(\\theta)$ or explore special angles on the unit circle?",
      scaffolding_state: 'example'
    };
  }

  // 2. Differential Calculus / Derivatives / Tangent Lines
  if (
    userLower.includes('differen') ||
    userLower.includes('deriv') ||
    userLower.includes('tangent') ||
    userLower.includes('chain rule') ||
    userLower.includes('power rule') ||
    (!userLower.trim() && query.includes('deriv'))
  ) {
    return {
      speech_response:
        `### Differential Calculus: Derivatives & Instantaneous Rate of Change\n\n` +
        `In **Differential Calculus** (Georgia Standard C.DER.1), the **derivative** $f'(x)$ (or $\\frac{dy}{dx}$) measures the **instantaneous rate of change** of a function—geometrically equal to the **slope of the tangent line** at point $x$:\n\n` +
        `$$f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$\n\n` +
        `- **Power Rule Shortcut**: For any power $f(x) = x^n$, bring the exponent down and subtract $1$: $$\\frac{d}{dx}[x^n] = n x^{n-1}$$\n` +
        `- **Trig & Exponential Derivatives**: $\\frac{d}{dx}[\\sin x] = \\cos x$, $\\frac{d}{dx}[\\cos x] = -\\sin x$, and $\\frac{d}{dx}[e^x] = e^x$.\n` +
        `- **Worked Example**: For $f(x) = x^2$, the derivative is $f'(x) = 2x$. At $x = 3$, the height is $f(3) = 9$ and the instantaneous tangent slope is $f'(3) = 2(3) = 6$.`,
      svg_code: isQuickMode
        ? null
        : `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="500" fill="#0f172a" rx="18"/>
          <text x="400" y="40" text-anchor="middle" fill="#f8fafc" font-family="Inter, sans-serif" font-size="20" font-weight="bold">Differential Calculus: Secant Line vs. Tangent Line Slope f'(x)</text>
          <line x1="90" y1="420" x2="720" y2="420" stroke="#64748b" stroke-width="2.5"/>
          <line x1="90" y1="420" x2="90" y2="70" stroke="#64748b" stroke-width="2.5"/>
          <!-- Parabola f(x) = 0.5 x^2 -->
          <path d="M 90 420 Q 320 400 620 90" fill="none" stroke="#38bdf8" stroke-width="4.5"/>
          <!-- Tangent Line at x = a -->
          <line x1="210" y1="435" x2="590" y2="175" stroke="#fbbf24" stroke-width="3.5"/>
          <!-- Secant Line -->
          <line x1="250" y1="410" x2="600" y2="112" stroke="#f472b6" stroke-width="2" stroke-dasharray="6 4"/>
          <!-- Points -->
          <circle cx="380" cy="318" r="8" fill="#fbbf24"/>
          <circle cx="565" cy="142" r="7" fill="#f472b6"/>
          <text x="360" y="295" text-anchor="end" fill="#fbbf24" font-family="Inter, sans-serif" font-size="15" font-weight="bold">Point of Tangency (x, f(x))</text>
          <text x="580" y="198" fill="#fbbf24" font-family="Inter, sans-serif" font-size="15" font-weight="bold">Tangent Slope = f'(x) = dy/dx</text>
          <text x="540" y="120" text-anchor="end" fill="#f472b6" font-family="Inter, sans-serif" font-size="14">Secant Point (x + h, f(x + h))</text>
          <!-- Formula Box -->
          <rect x="125" y="85" width="320" height="105" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="285" y="115" text-anchor="middle" fill="#38bdf8" font-family="Inter, sans-serif" font-size="15" font-weight="bold">Derivative Rules</text>
          <text x="285" y="142" text-anchor="middle" fill="#f8fafc" font-family="Inter, sans-serif" font-size="14">Power Rule: d/dx [xⁿ] = n·xⁿ⁻¹</text>
          <text x="285" y="168" text-anchor="middle" fill="#a78bfa" font-family="Inter, sans-serif" font-size="14">Example: d/dx [x³] = 3x²</text>
        </svg>`,
      question: "Would you like to practice finding derivatives with the Power Rule or Chain Rule?",
      scaffolding_state: 'example'
    };
  }

  // 3. Integral Calculus / Riemann Sums / Accumulation
  if (
    query.includes('calculus') ||
    query.includes('integral') ||
    query.includes('riemann') ||
    query.includes('accumulation')
  ) {
    return {
      speech_response:
        `### Integral Calculus: Riemann Sums & Definite Integrals\n\n` +
        `In **Integral Calculus** (Georgia Standard C.INT.1), integration finds the **total accumulated change**—represented geometrically as the net **area under the rate curve** $f(x)$ from $x = a$ to $x = b$.\n\n` +
        `1. **Riemann Sum Approximation**: Slice $[a, b]$ into $n$ rectangles of width $\\Delta x = \\frac{b - a}{n}$:\n` +
        `$$\\text{Area} \\approx \\sum_{i=1}^n f(x_i^*)\\,\\Delta x$$\n` +
        `2. **Fundamental Theorem of Calculus (Exact Area)**: As $n \\to \\infty$, the rectangle sum converges to the exact definite integral evaluated via an antiderivative $F'(x) = f(x)$:\n` +
        `$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$\n` +
        `- **Worked Example**: For $f(x) = \\frac{1}{2}x^2$ on $[0, 4]$, $F(x) = \\frac{x^3}{6}$, so $\\int_0^4 \\frac{1}{2}x^2\\,dx = \\frac{4^3}{6} - 0 = \\frac{64}{6} \\approx 10.667$.`,
      svg_code: isQuickMode
        ? null
        : `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rectGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.75"/>
              <stop offset="100%" stop-color="#6366f1" stop-opacity="0.35"/>
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="#0f172a" rx="18"/>
          <text x="400" y="42" text-anchor="middle" fill="#f8fafc" font-family="Inter, sans-serif" font-size="20" font-weight="bold">Riemann Sum Partition &amp; Exact Definite Integral ∫ f(x) dx</text>
          <line x1="100" y1="420" x2="720" y2="420" stroke="#94a3b8" stroke-width="2.5"/>
          <line x1="100" y1="420" x2="100" y2="80" stroke="#94a3b8" stroke-width="2.5"/>
          <rect x="100" y="395" width="130" height="25" fill="url(#rectGrad)" stroke="#38bdf8" stroke-width="2" rx="3"/>
          <rect x="230" y="330" width="130" height="90" fill="url(#rectGrad)" stroke="#38bdf8" stroke-width="2" rx="3"/>
          <rect x="360" y="225" width="130" height="195" fill="url(#rectGrad)" stroke="#38bdf8" stroke-width="2" rx="3"/>
          <rect x="490" y="90" width="130" height="330" fill="url(#rectGrad)" stroke="#38bdf8" stroke-width="2" rx="3"/>
          <path d="M 100 420 Q 360 375, 620 90" fill="none" stroke="#f59e0b" stroke-width="4.5"/>
          <circle cx="620" cy="90" r="7" fill="#fbbf24"/>
          <text x="360" y="460" text-anchor="middle" fill="#38bdf8" font-family="Inter, sans-serif" font-size="15" font-weight="bold">Width Δx = (b - a) / n   →   As n → ∞, ∑ f(xᵢ)Δx = ∫ f(x) dx</text>
        </svg>`,
      question: "Try moving the partition slider in the Lesson Player from $n=4$ to $n=32$—what happens to the error percentage?",
      scaffolding_state: 'example'
    };
  }

  // 4. Quadratics / Parabolas / Factoring
  if (query.includes('quadratic') || query.includes('parabola') || query.includes('discriminant')) {
    return {
      speech_response:
        `### Quadratic Functions & The Quadratic Formula\n\n` +
        `A **quadratic function** (Georgia Standard A.PAR.6) has standard form $f(x) = ax^2 + bx + c$ ($a \\ne 0$) and graphs as a symmetric U-shaped **parabola**:\n\n` +
        `$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\qquad x_{\\text{vertex}} = -\\frac{b}{2a}$$\n\n` +
        `- **Roots (Zeros)**: Where the parabola crosses the $x$-axis ($f(x) = 0$).\n` +
        `- **Discriminant ($D = b^2 - 4ac$)**: Tells whether there are $2$ real roots ($D > 0$), $1$ double root ($D = 0$), or $0$ real roots ($D < 0$).`,
      svg_code: isQuickMode
        ? null
        : `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="500" fill="#0f172a" rx="18"/>
          <text x="400" y="42" text-anchor="middle" fill="#f8fafc" font-family="Inter, sans-serif" font-size="20" font-weight="bold">Quadratic Parabola: Vertex, Axis of Symmetry &amp; Roots</text>
          <line x1="100" y1="340" x2="700" y2="340" stroke="#64748b" stroke-width="2.5"/>
          <line x1="200" y1="70" x2="200" y2="450" stroke="#64748b" stroke-width="2.5"/>
          <line x1="420" y1="80" x2="420" y2="450" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4"/>
          <path d="M 240 110 Q 420 550 600 110" fill="none" stroke="#f59e0b" stroke-width="4.5"/>
          <circle cx="420" cy="430" r="8" fill="#38bdf8"/>
          <circle cx="293" cy="340" r="7" fill="#ec4899"/>
          <circle cx="547" cy="340" r="7" fill="#ec4899"/>
          <text x="420" y="462" text-anchor="middle" fill="#38bdf8" font-family="Inter, sans-serif" font-size="14" font-weight="bold">Vertex (-b/2a, f(-b/2a))</text>
          <text x="275" y="320" text-anchor="end" fill="#f472b6" font-family="Inter, sans-serif" font-size="14" font-weight="bold">Root r₁</text>
          <text x="565" y="320" fill="#f472b6" font-family="Inter, sans-serif" font-size="14" font-weight="bold">Root r₂</text>
        </svg>`,
      question: "Would you like to solve a quadratic equation together by factoring or using the Quadratic Formula?",
      scaffolding_state: 'example'
    };
  }

  // 5. Default Structured Visual Math Response (Adapts to active topic context)
  const topicLabel = activeTutorMemory || contextMemory || 'Georgia K–12 Mathematics';
  return {
    speech_response:
      `### Exploring ${topicLabel}\n\n` +
      `Here is the core mathematical structure for **${topicLabel}**:\n\n` +
      `- **1. Visual Intuition**: Represent the quantities geometrically so you can see how changing the input affects the output.\n` +
      `- **2. Algebraic Rule**: Connect the rate of change (or equivalence ratio) to the formal equation:\n` +
      `$$y = mx + b \\quad \\text{or} \\quad \\frac{a}{b} = \\frac{c}{d}$$\n` +
      `- **3. Quick Verification**: Always plug a simple test value (such as $x = 0$ or $x = 1$) into your formula to confirm it matches the visual diagram!`,
    svg_code: isQuickMode
      ? null
      : `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="500" fill="#0f172a" rx="18"/>
        <text x="400" y="42" text-anchor="middle" fill="#f8fafc" font-family="Inter, sans-serif" font-size="20" font-weight="bold">${topicLabel.replace(/[<>&"]/g, '')}</text>
        <line x1="100" y1="400" x2="700" y2="400" stroke="#64748b" stroke-width="2.5"/>
        <line x1="140" y1="80" x2="140" y2="430" stroke="#64748b" stroke-width="2.5"/>
        <line x1="140" y1="340" x2="620" y2="120" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="240" y1="294" x2="500" y2="294" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="6 4"/>
        <line x1="500" y1="294" x2="500" y2="175" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="6 4"/>
        <circle cx="240" cy="294" r="7" fill="#38bdf8"/>
        <circle cx="500" cy="175" r="7" fill="#f472b6"/>
        <text x="370" y="320" text-anchor="middle" fill="#fbbf24" font-family="Inter, sans-serif" font-size="14" font-weight="bold">Horizontal Change (Δx)</text>
        <text x="585" y="240" text-anchor="middle" fill="#f472b6" font-family="Inter, sans-serif" font-size="14" font-weight="bold">Vertical Change (Δy)</text>
        <text x="400" y="465" text-anchor="middle" fill="#94a3b8" font-family="Inter, sans-serif" font-size="14">Ask about any topic (e.g. "trigonometry", "derivatives", "integrals", "quadratics", "fractions")</text>
      </svg>`,
    question: "What specific formula, step, or example in this topic would you like me to break down?",
    scaffolding_state: 'example'
  };
};

export const generateDiarySummary = async (
  text: string,
  previousContext: string,
  imageBase64?: string | null,
  mimeType?: string | null
): Promise<{ summary: string; insight: string | null }> => {
  const ai = getClient();
  if (!ai) {
    return {
      summary: `### Mathematical Study Notes\n\n- **Focus Concept:** ${text.slice(0, 120)}\n- Ready to review with Cosmo in the Lesson Player or Quiz!`,
      insight: "Review this topic with the interactive visualization for deeper mastery."
    };
  }

  const primaryModel = "gemini-2.5-flash";
  const prompt = [
    "You are Cosmo's Assistant in Math Galaxy Study Mode.",
    "1. Organize the student's mathematical thoughts and notes into a clean, structured Markdown format.",
    "2. Use LaTeX for math symbols ($x^2$, $\\frac{a}{b}$).",
    "3. Keep bullet points clear and encouraging.",
    "",
    "Previous Context: \"" + previousContext + "\"",
    "Current Student Notes: \"" + text + "\""
  ].join("\n");

  const parts: any[] = [{ text: prompt }];
  if (imageBase64 && mimeType) {
    parts.push({
      inlineData: { mimeType, data: imageBase64 }
    });
  }

  try {
    const response = await generateWithFallback(ai, primaryModel, {
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            insight: { type: Type.STRING, nullable: true }
          }
        }
      },
    });

    const result = safeParseJSON<{ summary: string; insight: string | null }>(response.text || "{}");
    return {
      summary: result.summary || "Summary recorded in your flight log.",
      insight: result.insight || null
    };
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return { summary: text, insight: null };
  }
};

export const generateTutorResponse = async (
  userMessage: string,
  history: { role: string; text: string }[],
  contextMemory: string,
  contextImage?: string | null,
  contextImageMime?: string | null,
  activeTutorMemory?: string | null,
  isQuickMode: boolean = false,
  isWebSearchMode: boolean = false
): Promise<TutorResponse> => {
  // 1. Try secure backend / serverless proxy first
  const backendResult = await callBackendAiProxy({
    action: 'tutor',
    text: userMessage,
    history,
    context: activeTutorMemory || contextMemory,
    isQuickMode
  });

  if (backendResult && backendResult.speech_response) {
    return backendResult;
  }

  // 2. Client-side Gemini SDK
  const ai = getClient();
  if (!ai) {
    return buildSmartMathResponse(userMessage, activeTutorMemory, contextMemory, isQuickMode);
  }

  const primaryModel = "gemini-2.5-flash";
  const systemInstructionLines: string[] = [
    "You are 'Cosmo', the expert, encouraging Astro-Owl math tutor in Math Galaxy.",
    "Goal: Teach mathematics according to Georgia K-12 Standards using intuitive visuals and Sweller's Cognitive Load Theory.",
    "CRITICAL NOTATION RULE: Format all mathematical formulas using standard LaTeX notation ($...$ or $$...$$).",
    "Never use raw dollar symbols for currency without escaping, and never produce broken delimiters.",
    "",
    "Rules for VISUALS:",
    "1. 'svg_code': Create a rich, illustrative SVG diagram strictly contained in viewBox=\"0 0 800 600\".",
    "2. Keep coordinate bounds x: [20, 780] and y: [20, 580]. Center all text using text-anchor=\"middle\" and dominant-baseline=\"middle\".",
    "3. Return ONLY the <svg>...</svg> XML string without markdown backticks."
  ];

  if (activeTutorMemory) {
    systemInstructionLines.push(
      "ACTIVE CURRICULUM CONTEXT: \"" + activeTutorMemory + "\"",
      "Base your teaching and diagram directly on this topic and Georgia standard."
    );
  } else if (contextMemory) {
    systemInstructionLines.push("Context Memory: \"" + contextMemory + "\"");
  }

  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  const currentParts: any[] = [{ text: userMessage }];
  if (contextImage && contextImageMime) {
    currentParts.push({
      inlineData: { mimeType: contextImageMime, data: contextImage }
    });
  }

  contents.push({
    role: 'user',
    parts: currentParts
  });

  try {
    const response = await generateWithFallback(ai, primaryModel, {
      contents,
      config: {
        systemInstruction: systemInstructionLines.join("\n"),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            svg_code: { type: Type.STRING, nullable: true },
            speech_response: { type: Type.STRING },
            question: { type: Type.STRING, nullable: true },
            scaffolding_state: { type: Type.STRING, enum: ["example", "problem", "fading"] }
          },
          required: isQuickMode ? ["speech_response"] : ["speech_response", "scaffolding_state"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return safeParseJSON<TutorResponse>(text);
  } catch (error) {
    console.error("Gemini Tutor Error, using Smart Math Engine fallback:", error);
    return buildSmartMathResponse(userMessage, activeTutorMemory, contextMemory, isQuickMode);
  }
};

export const generateWebSearchResponse = async (
  userMessage: string,
  history: { role: string; text: string }[],
  contextMemory: string,
  activeTutorMemory?: string | null,
  isQuickMode: boolean = false
): Promise<TutorResponse> => {
  return generateTutorResponse(
    userMessage,
    history,
    contextMemory,
    null,
    null,
    activeTutorMemory,
    isQuickMode,
    true
  );
};

export const regenerateSVG = async (explanationText: string, userSuggestion?: string): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return buildSmartMathResponse(explanationText + ' ' + (userSuggestion || '')).svg_code || '';
  }

  const primaryModel = "gemini-2.5-flash";
  const promptLines = [
    "You are Cosmo's Master Scientific Illustrator in Math Galaxy.",
    "Create a clean, beautiful SVG diagram in viewBox=\"0 0 800 600\" for the concept below.",
    "Explanation: \"" + explanationText + "\"",
    userSuggestion ? `User customization: "${userSuggestion}"` : "",
    "Boundary rules: strictly within 0 0 800 600. Return raw XML <svg>...</svg> only."
  ];

  try {
    const response = await generateWithFallback(ai, primaryModel, {
      contents: promptLines.join("\n"),
      config: { responseMimeType: "text/plain" }
    });

    const text = response.text || "";
    const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/);
    return svgMatch ? svgMatch[0] : text;
  } catch (e) {
    return buildSmartMathResponse(explanationText).svg_code || '';
  }
};

export const generateAnimatedSVG = async (explanationText: string): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <style>
        @keyframes pulseOrbit { 0% { r: 65px; opacity: 0.4; } 50% { r: 95px; opacity: 0.85; } 100% { r: 65px; opacity: 0.4; } }
      </style>
      <rect width="800" height="500" fill="#0f172a" rx="18"/>
      <circle cx="400" cy="250" r="65" fill="#38bdf8" style="animation: pulseOrbit 2.2s infinite ease-in-out;"/>
      <text x="400" y="250" text-anchor="middle" dominant-baseline="middle" fill="#f8fafc" font-family="Inter, sans-serif" font-size="20" font-weight="bold">Dynamic Mathematical Visualization</text>
    </svg>`;
  }

  const primaryModel = "gemini-2.5-flash";
  const prompt = [
    "Create a DYNAMIC, ANIMATED SVG using CSS @keyframes inside a <style> tag for this math concept.",
    "Explanation: \"" + explanationText + "\"",
    "Rules: viewBox=\"0 0 800 600\", infinite looping animation, smooth transitions, return ONLY <svg>...</svg>."
  ].join("\n");

  try {
    const response = await generateWithFallback(ai, primaryModel, {
      contents: prompt,
      config: { responseMimeType: "text/plain" }
    });

    const text = response.text || "";
    const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/);
    return svgMatch ? svgMatch[0] : text;
  } catch (e) {
    return buildSmartMathResponse(explanationText).svg_code || '';
  }
};

export const generateMindmapOnly = async (
  contextText: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return "mindmap\n  root((Georgia Mathematics))\n    Core Intuition\n      Visual Models\n      Step-by-Step Patterns\n    Formulas and Rules\n      Equations\n      Identities\n    Mastery Practice\n      Worked Examples\n      Skill Quizzes";
  }

  const primaryModel = "gemini-2.5-flash";
  const prompt = [
    "Create a Mermaid.js 'mindmap' diagram code for:",
    "Context: \"" + contextText + "\"",
    "Return ONLY raw Mermaid code starting with 'mindmap'. No parentheses inside labels."
  ].join("\n");

  try {
    const response = await generateWithFallback(ai, primaryModel, {
      contents: prompt,
      config: { responseMimeType: "text/plain" }
    });
    const text = response.text || "";
    return text.replace(/```mermaid/g, '').replace(/```/g, '').trim();
  } catch (e) {
    return "mindmap\n  root((Georgia Mathematics))\n    Concepts\n      Visual Intuition\n      Algebraic Rules\n    Practice\n      Worked Examples\n      Quizzes";
  }
};

export const generateQuiz = async (
  contextMemory: string,
  history: { role: string; text: string }[]
): Promise<QuizData> => {
  const backendResult = await callBackendAiProxy({
    action: 'quiz',
    context: contextMemory
  });

  if (backendResult && backendResult.questions && backendResult.questions.length > 0) {
    return backendResult;
  }

  const ai = getClient();
  const combinedContext = `${contextMemory} ${history.map(h => h.text).join(' ')}`.toLowerCase();

  const buildFallbackQuiz = (): QuizData => {
    if (combinedContext.includes('trig') || combinedContext.includes('sin') || combinedContext.includes('cos')) {
      return {
        topic: 'Trigonometry & Unit Circle',
        questions: [
          {
            question: 'In a right triangle with acute angle $\\theta$, which ratio defines $\\sin(\\theta)$?',
            options: ['$\\frac{\\text{Opposite}}{\\text{Hypotenuse}}$', '$\\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$', '$\\frac{\\text{Opposite}}{\\text{Adjacent}}$', '$\\frac{\\text{Hypotenuse}}{\\text{Opposite}}$'],
            correctAnswerIndex: 0,
            explanation: 'By SOH-CAH-TOA, Sine equals Opposite divided by Hypotenuse.'
          },
          {
            question: 'What is the exact value of $\\sin(30^\\circ)$ (or $\\sin(\\frac{\\pi}{6})$)?',
            options: ['$\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$1$', '$0$'],
            correctAnswerIndex: 0,
            explanation: 'In a $30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ$ triangle, the side opposite $30^\\circ$ is half the hypotenuse.'
          },
          {
            question: 'Which Pythagorean identity holds for every angle $\\theta$?',
            options: ['$\\sin^2(\\theta) + \\cos^2(\\theta) = 1$', '$\\sin(\\theta) + \\cos(\\theta) = 1$', '$\\sin^2(\\theta) - \\cos^2(\\theta) = 1$', '$\\tan(\\theta) = \\sin(\\theta)\\cos(\\theta)$'],
            correctAnswerIndex: 0,
            explanation: 'On the unit circle, $x^2 + y^2 = 1$ gives $\\cos^2(\\theta) + \\sin^2(\\theta) = 1$.'
          }
        ]
      };
    }

    if (combinedContext.includes('deriv') || combinedContext.includes('differen') || combinedContext.includes('tangent')) {
      return {
        topic: 'Differential Calculus & Derivatives',
        questions: [
          {
            question: 'What is the derivative $f\'(x)$ of $f(x) = 4x^3 - 6x + 5$?',
            options: ['$12x^2 - 6$', '$12x^3 - 6$', '$4x^2 - 6$', '$12x^2 + 5$'],
            correctAnswerIndex: 0,
            explanation: 'By the Power Rule, $\\frac{d}{dx}[4x^3] = 12x^2$, $\\frac{d}{dx}[-6x] = -6$, and $\\frac{d}{dx}[5] = 0$.'
          },
          {
            question: 'Geometrically, what does the derivative $f\'(a)$ represent on the graph of $y = f(x)$?',
            options: ['The slope of the tangent line at $x = a$', 'The y-intercept of the function', 'The area under the curve from $0$ to $a$', 'The average value of $f(x)$'],
            correctAnswerIndex: 0,
            explanation: '$f\'(a)$ is the instantaneous rate of change, which equals the slope of the tangent line at $x = a$.'
          },
          {
            question: 'What is $\\frac{d}{dx}[\\sin(x)]$?',
            options: ['$\\cos(x)$', '$-\\cos(x)$', '$\\tan(x)$', '$-\\sin(x)$'],
            correctAnswerIndex: 0,
            explanation: 'The derivative of $\\sin(x)$ with respect to $x$ is $\\cos(x)$.'
          }
        ]
      };
    }

    if (combinedContext.includes('calculus') || combinedContext.includes('riemann') || combinedContext.includes('integral')) {
      return {
        topic: 'Riemann Sums & Definite Integrals',
        questions: [
          {
            question: 'What happens to a Riemann sum approximation as the number of rectangles $n$ approaches infinity?',
            options: [
              'It converges to the exact definite integral $\\int_a^b f(x)\\,dx$',
              'It grows infinitely large and unbounded',
              'It drops to zero',
              'It oscillates without settling'
            ],
            correctAnswerIndex: 0,
            explanation: 'As rectangle width $\\Delta x \\to 0$, the sum of rectangle areas converges to the exact continuous integral.'
          },
          {
            question: 'In $\\int_a^b f(x)\\,dx$, what does the elongated $\\int$ symbol stand for?',
            options: ['Summa (Latin for Sum)', 'Slope', 'Square Root', 'Secant'],
            correctAnswerIndex: 0,
            explanation: 'Leibniz introduced $\\int$ for "Summa" to represent continuous summation of infinitely thin slices.'
          },
          {
            question: 'Evaluate $\\int_0^3 2x\\,dx$ using the antiderivative $F(x) = x^2$.',
            options: ['9', '6', '12', '3'],
            correctAnswerIndex: 0,
            explanation: '$F(3) - F(0) = 3^2 - 0^2 = 9$.'
          }
        ]
      };
    }

    return {
      topic: 'Georgia Mathematics Mastery Check',
      questions: [
        {
          question: 'Which of the following describes a proportional relationship?',
          options: [
            'A linear graph passing through the origin $(0,0)$ with equation $y = kx$',
            'Any parabola that opens upwards',
            'A horizontal line at $y = 5$',
            'An exponential decay curve'
          ],
          correctAnswerIndex: 0,
          explanation: 'Proportional relationships graph as straight lines through $(0,0)$ with constant ratio $k = y/x$.'
        },
        {
          question: 'What is the value of $\\frac{3}{4} + \\frac{1}{2}$?',
          options: ['$\\frac{5}{4}$ ($1\\frac{1}{4}$)', '$\\frac{4}{6}$', '$\\frac{4}{4}$', '$\\frac{3}{8}$'],
          correctAnswerIndex: 0,
          explanation: 'Converting $\\frac{1}{2}$ to $\\frac{2}{4}$ gives $\\frac{3}{4} + \\frac{2}{4} = \\frac{5}{4}$.'
        },
        {
          question: 'What is the slope $m$ of a line passing through $(0, 2)$ and $(4, 10)$?',
          options: ['2', '4', '8', '1/2'],
          correctAnswerIndex: 0,
          explanation: '$m = \\frac{10 - 2}{4 - 0} = \\frac{8}{4} = 2$.'
        }
      ]
    };
  };

  if (!ai) {
    return buildFallbackQuiz();
  }

  const primaryModel = "gemini-2.5-flash";
  const prompt = [
    "Create a 3-question multiple choice math quiz for Georgia K-12 Mathematics.",
    "Context: \"" + contextMemory + "\"",
    "Rules: format equations with LaTeX ($x^2$, $\\frac{a}{b}$). Return valid JSON matching schema."
  ].join("\n");

  try {
    const response = await generateWithFallback(ai, primaryModel, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
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
                required: ["question", "options", "correctAnswerIndex", "explanation"]
              }
            }
          },
          required: ["topic", "questions"]
        }
      }
    });

    return safeParseJSON<QuizData>(response.text || "{}");
  } catch (error) {
    console.error("Quiz Generation Error, using fallback quiz:", error);
    return buildFallbackQuiz();
  }
};
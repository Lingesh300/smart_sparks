# 🪐 Math Galaxy — K-12 Game-Based Mathematics Learning Platform

Math Galaxy transforms mathematics education into an engaging, galactic adventure game for students in **Grades 1–12**, strictly aligned with the **Georgia Department of Education (GaDOE) Mathematics Standards**.

Built upon the core MindMeld architecture (React 19, TypeScript, Vite, KaTeX, and Google Gemini), Math Galaxy integrates animated concept lessons, interactive challenges, an AI tutor ("Cosmo"), multiple-choice quizzes, and real student progression.

---

## 🌟 Key Features

1. **Curriculum Alignment (Georgia K-12 Mathematics Standards)**:
   - **Elementary (Grades 1–5)**: Number sense, multi-digit operations, visual fraction equivalence, angles, and 3D volume.
   - **Middle School (Grades 6–8)**: Ratios & rates, proportional relationships ($y = kx$), linear functions ($y = mx + b$), and the Pythagorean Theorem.
   - **High School (Grades 9–12)**:
     - *Algebra (Concepts & Connections)*: Parabolic trajectories & quadratic formula ($ax^2 + bx + c = 0$).
     - *Geometry (Concepts & Connections)*: Right triangle trigonometry ($\text{SOH-CAH-TOA}$) and circle theorems.
     - *Advanced Algebra & Precalculus*: Radian measure, unit circle coordinates, and trigonometric functions.
     - *Calculus Pathway*: Accumulation of change, Riemann sum rectangle convergence, and the intuition of definite integrals ($\int_a^b f(x)\,dx$).

2. **Intuitive Animated Lesson Player**:
   - Dynamic step-by-step concept walkthroughs.
   - **Calculus Riemann Sum Animation**: Real-time slider adjusting partition count ($n = 2$ to $48$), showing the lower/upper Darboux sums converge onto the exact area under the curve ($64/3 \approx 21.33$).
   - Voice narration with Web Speech API TTS, captions/transcripts toggle, and key mission takeaways.

3. **Interactive Mathematics Challenge Games**:
   - **Asteroid Area Accumulator**: Partition asteroid hulls into slices to estimate continuous area within error tolerances.
   - **Fraction Galaxy Blaster**: Target and match equivalent visual fraction gauges to align planetary shields.
   - **Orbit Slope Launcher**: Adjust slope $m$ and y-intercept $b$ ($y = mx + b$) to fire communication probes through celestial coordinate gates.

4. **Cosmo the Astro-Owl AI Tutor**:
   - Socratic guidance grounded in Georgia standards.
   - Dynamic SVG diagrams & Mermaid.js concept maps.
   - Continuous voice conversation (Live Speech-to-Text & Text-to-Speech).
   - Fast Quick Mode and real-time Web Search Mode.

5. **Full KaTeX Mathematical Notation Pipeline**:
   - Complete rendering of inline ($x^2$, $\frac{a}{b}$) and display ($\int_a^b f(x)\,dx$) equations.
   - Safe parsing that avoids confusing currency signs ($5.00) with math delimiters.

6. **Secure Backend AI Proxy (Zero Student Credentials)**:
   - Student-facing API key modals and key icons are removed.
   - Server-side environment variable `GEMINI_API_KEY` protects credentials.
   - Built-in rate limiting and input validation.

7. **Real Progression & Honors System**:
   - Real XP accumulation (no fake hardcoded numbers).
   - Cosmic Level progression (Level 1: Space Cadet → Level 8: Calculus Commander).
   - Unlocked Star badges (First Orbit, Accumulation Master, Stellar Perfection, Galactic Champion).
   - Local persistence with parent platform cross-origin sync.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v20+ recommended)
- Google Gemini API Key

### Steps
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   Create a `.env` or `.env.local` file:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. (Optional) Run the standalone backend proxy:
   ```bash
   npm run server
   ```

---

## 🔗 Embedding in Parent Learning Platform

Math Galaxy is engineered to be embedded seamlessly into an external learning website using an `<iframe>` or direct module component.

### Iframe Embed URL Parameters
```html
<iframe
  src="https://your-math-galaxy-domain.com/?embed=true&grade=12&lesson=g12-l1-riemann-sums&studentId=stu-9821"
  width="100%"
  height="700px"
  frameborder="0"
  allow="microphone; speech-synthesis"
></iframe>
```

### Supported Parameters
- `embed=true`: Enters streamlined embedded mode (optimizes navigation headers).
- `grade`: Target grade level (1–12).
- `lesson`: Direct lesson ID to open (e.g. `g12-l1-riemann-sums`, `g4-l1-equiv-fractions`).
- `studentId`: Authenticated student ID passed from the parent platform.

### Bi-directional PostMessage Contract
The parent website can listen for real-time progress events:
```javascript
window.addEventListener('message', (event) => {
  if (event.data?.source === 'MATH_GALAXY') {
    const { type, payload } = event.data;
    console.log('Math Galaxy Event:', type, payload);
    // Types: 'LESSON_COMPLETED', 'QUIZ_COMPLETED', 'GAME_COMPLETED', 'PROGRESS_UPDATED'
  }
});
```

To instruct Math Galaxy to navigate from the parent platform:
```javascript
iframeElement.contentWindow.postMessage({
  type: 'NAVIGATE_LESSON',
  payload: { lessonId: 'g12-l1-riemann-sums' }
}, '*');
```

---

## ☁️ Deployment

### Render Deployment (1-Click)
Deploy using the included `render.yaml` blueprint:
1. Connect this repository to [Render](https://render.com).
2. Create a new **Blueprint Instance**.
3. Add your `GEMINI_API_KEY` under Environment Variables for the backend service.

### Docker & Cloud Run
Build and run the production image:
```bash
docker build -t math-galaxy .
docker run -p 8080:8080 -e GEMINI_API_KEY=your_key math-galaxy
```

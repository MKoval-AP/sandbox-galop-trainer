# CLAUDE.md — Galop Trainer

## Project Overview
Mobile-friendly quiz app for an 11-year-old girl (Polina) to practice French Galop horse riding certification exams (levels 1–4). Galop 1 has full content across 5 chapters (~55 questions). Galop 2–4 are placeholders.

## Key Context
- **User**: Polina, age 11, iPhone/iPad Safari
- **All UI and content in French** — zero English in the app
- **Tone**: Fun, encouraging, "championne du monde" energy. Never punishing.
- **Repo name**: `sandbox-galop-trainer`
- **This is a gift from her dad** — quality and care matter

## Tech Stack
- **HTML / CSS / JavaScript** — vanilla preferred, small CDN libs OK if justified
- **NO heavy frameworks** (no React, Vue, Svelte)
- **NO build tools** (no webpack, vite, bundlers)
- Hosted on **GitHub Pages** from repo root
- **PWA** with service worker for offline use
- **localStorage** for progress — no server, no database
- Must work on **iOS Safari** (iPhone + iPad)

## File Structure
```
sandbox-galop-trainer/
├── index.html
├── css/style.css
├── js/
│   ├── app.js              # Router, screen management, init
│   ├── quiz.js             # Quiz engine logic
│   ├── data.js             # JSON loader
│   ├── ui.js               # DOM helpers, animations, feedback
│   └── storage.js          # localStorage wrapper
├── data/questions/
│   ├── index.json           # Manifest of all question files
│   ├── galop1-ch1-connaissances.json
│   ├── galop1-ch2-connaissance-cheval.json
│   ├── galop1-ch3-soccuper-cheval.json
│   ├── galop1-ch4-pratique-pied.json
│   └── galop1-ch5-pratique-cheval.json
├── assets/images/galop1/
├── assets/icons/
├── manifest.json
├── sw.js
├── CLAUDE.md
├── PRD.md
└── README.md
```

## Question Types & Data Shapes

### 1. MCQ (single correct answer)
```json
{
  "id": "g1-ch1-002",
  "type": "mcq",
  "question": "Question text",
  "options": ["A", "B", "C"],
  "correct": 1,
  "explanation": "Why B is correct",
  "difficulty": 1
}
```
**UX**: Tap one option → instant green/red feedback + explanation.

### 2. Multi-select (multiple correct — THIS IS THE MOST COMMON TYPE)
```json
{
  "id": "g1-ch1-001",
  "type": "multi_select",
  "question": "Coche toutes les affirmations correctes :",
  "options": ["Statement A", "Statement B", "Statement C", "Statement D"],
  "correct": [0, 2],
  "explanation": "Explanation text",
  "difficulty": 1
}
```
**UX**: Checkbox-style options → "Valider ✓" button → feedback showing correct/incorrect/missed selections. Show partial credit: "3/4 bonnes réponses !"

### 3. Ordering (arrange in sequence)
```json
{
  "id": "g1-ch5-012",
  "type": "ordering",
  "question": "Mets les actions dans le bon ordre :",
  "items_in_order": ["First", "Second", "Third", "Fourth", "Fifth"],
  "explanation": "Explanation of correct order",
  "difficulty": 2
}
```
**UX**: Items displayed shuffled. User assigns numbers or drags to reorder. "Valider ✓" → feedback. `items_in_order` array IS the correct order — app must shuffle for display.

### 4. Image-identify (v2 — skipped if `needs_image: true`)
```json
{
  "id": "g1-ch3-006",
  "type": "img_id",
  "question": "Sur quelle photo le licol est-il bien ajusté ?",
  "options": ["Photo A", "Photo B", "Photo C"],
  "correct": 1,
  "needs_image": true,
  "image_description": "Description of needed images",
  "explanation": "Explanation",
  "difficulty": 1
}
```
**UX**: Skip these questions in quiz rotation when `needs_image === true`. When images are added later, display images as options.

## Design Specifications

### Colors (CSS custom properties)
```css
:root {
  --color-primary: #8B6914;
  --color-primary-light: #C4A35A;
  --color-accent: #2D7D46;
  --color-correct: #2D9D4E;
  --color-incorrect: #D4574E;
  --color-partial: #E8A735;
  --color-bg: #FFF8F0;
  --color-card: #FFFFFF;
  --color-text: #3D2E1C;
  --color-text-light: #8B7D6B;
  --color-border: #E8DDD0;
  --shadow-card: 0 2px 8px rgba(61, 46, 28, 0.1);
  --radius: 12px;
}
```

### Typography
- Font: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Question text: 20px, weight 600
- Options: 18px
- Body: 16px minimum
- Never < 14px

### Layout
- Max-width: 480px, centered
- Padding: 20px sides minimum
- Touch targets: 48px+ height
- One question per screen — no scrolling to see options
- Bottom-anchored action buttons
- CSS transitions for screen changes (200ms fade)

### Responsive
- iPhone SE (375px): minimum
- iPhone 14/15 (390px): primary target
- iPad (768px+): centered, same max-width

### iOS Safari Considerations
- Use `100dvh` not `100vh` (or JS fallback)
- Service worker registration quirks
- localStorage throws in private browsing — wrap in try/catch
- Use `click` events (not touch-specific)

## Encouragement Messages

### Correct
```javascript
const CORRECT_MESSAGES = [
  "Bravo, championne ! 🏆",
  "Tu gères ! 🐴",
  "Parfait ! 🌟",
  "Trop forte ! 💪",
  "Galop d'enfer ! 🔥",
  "Exactement ! 👏",
  "Tu assures ! ⭐",
  "Bien joué ! 🎯",
  "C'est ça ! ✨",
  "Incroyable ! 🦄"
];
```

### Partial (multi-select)
```javascript
const PARTIAL_MESSAGES = [
  "Presque ! Tu as trouvé {x} sur {y}. 👀",
  "Pas mal ! Mais regarde ce qui manque 👇",
  "Bien essayé ! Il en manquait quelques-unes 💡"
];
```

### Incorrect
```javascript
const INCORRECT_MESSAGES = [
  "Pas tout à fait… 🤔",
  "Presque ! Regarde l'explication 👇",
  "C'est pas grave, on apprend ! 📚",
  "Bonne tentative ! Retiens bien 💡",
  "Oups ! Mais maintenant tu sauras 😊"
];
```

## App Screens

### 1. Home
- Title: "Galop Trainer 🐴"
- Galop level cards (1 active, 2–4 with "Bientôt disponible !")
- Quick stats (total answered, % correct, streak)
- "C'est parti !" button for random quiz

### 2. Chapter Selection (after picking Galop 1)
- 5 chapter cards with emoji + title + progress %
- "Tout mélanger" option
- Tap chapter → start quiz

### 3. Quiz (one question at a time)
- Progress bar at top (X/Y)
- Question card (type-specific rendering)
- Skip button (small, secondary)
- After answer: feedback + explanation card + "Suivant →" button

### 4. Results
- Score: X/Y, percentage, star rating
- Missed questions summary
- "Rejouer 🔄", "Revoir les erreurs 📝", "Retour 🏠"

### 5. Review ("À revoir")
- List of incorrectly answered questions
- Can re-quiz from this list
- Questions leave review after 2 consecutive correct

## Quiz Engine Logic

1. Load questions from JSON for selected chapter(s)
2. Filter out `needs_image === true` questions
3. Optionally shuffle order
4. Prioritize: unseen > incorrect > correct (based on localStorage progress)
5. Serve one at a time, rendering UI by question type
6. On answer: save result to localStorage, show feedback
7. At end: show results screen

## State Shape (localStorage)
```javascript
// Key: "galop-trainer-state"
{
  currentGalop: 1,
  progress: {
    "g1-ch1-001": { attempts: 2, lastCorrect: true, correctStreak: 1, lastAttempt: "2026-04-02" }
  },
  reviewList: ["g1-ch1-003"],
  stats: {
    totalAnswered: 45,
    totalCorrect: 38,
    currentStreak: 7,
    bestStreak: 12,
    lastSession: "2026-04-02"
  }
}
```

## Development Workflow

### Build order:
1. Full file structure + index.html shell
2. Data loader — make sure all 5 JSON files load correctly
3. Home screen with chapter list
4. Quiz flow for MCQ type (simplest) — get the full loop working
5. Add multi-select type (most common!)
6. Add ordering type
7. Results screen
8. Progress tracking (localStorage)
9. Review mode
10. PWA (manifest + service worker)
11. Polish: animations, transitions, final styling

### Testing locally
```bash
python3 -m http.server 8000
# or
npx serve .
```

### Adding new content
1. Create JSON file matching the data model
2. Add filename to `data/questions/index.json`
3. Push to GitHub

## Important Rules
- **French only** — every string, label, button, message
- **Accessibility**: good contrast, focus states, aria-labels
- **Defensive coding**: validate question JSON before rendering — skip malformed questions
- **Error handling**: if a JSON file fails to load, skip gracefully
- **Mobile-first CSS**: write mobile styles as default
- **No console.log in production**

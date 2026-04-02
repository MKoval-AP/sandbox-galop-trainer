# Galop Trainer — Product Requirements Document
*Version: 2.0 — 2026-04-02*
*Author: Michael Koval (with Claude)*
*Refined from: Galop 1 Guide Fédéral FFE, Chapters 1–5*

---

## 1. Overview

**Galop Trainer** is a fun, mobile-friendly quiz app that helps Polina (age 11) prepare for her French horse riding certification exams (Galop 1–4). The app turns dry exam material into an engaging, encouraging game — think "championne du monde" energy, not boring flashcards.

### Why this matters
- Polina already uses the physical book a lot and re-take quizzes multiple times
- She wants to practice **repeatedly** — the book is a one-shot format
- No good free app exists for this specific French certification
- Future potential: other kids at her riding school, then broader market

---

## 2. Target User

| Attribute | Detail |
|---|---|
| Language | French (app UI and content entirely in French) |
| Devices | iPhone (primary), iPad, desktop browser |
| Context | Preparing for Galop exams at her riding school |
| Motivation | Wants to pass; responds well to encouragement and gamification |
| Anti-patterns | Gets bored with text walls; dislikes feeling "tested" in a school-like way |

---

## 3. Content Structure

### 3.1 Galop Levels

| Level | Status in v1 |
|---|---|
| **Galop 1** | Full content — all 5 chapters extracted from Guide Fédéral |
| **Galop 2** | Placeholder (chapters listed, no questions yet) |
| **Galop 3** | Placeholder |
| **Galop 4** | Placeholder |

### 3.2 Galop 1 Chapters (from the actual book)

| # | Chapter | Title | Questions |
|---|---|---|---|
| 1 | ch1 | Connaissances Générales | 11 |
| 2 | ch2 | Connaissance du Cheval | 12 |
| 3 | ch3 | S'occuper du Cheval | 10 |
| 4 | ch4 | Pratique Équestre à Pied | 8 |
| 5 | ch5 | Pratique Équestre à Cheval | 13 |

### 3.3 Question Types (from actual book analysis)

| Type | Code | Description | UX |
|---|---|---|---|
| **Multiple choice** | `mcq` | 3–4 options, ONE correct | Tap option → instant feedback |
| **Multi-select** | `multi_select` | 2–13 statements, check ALL correct | Checkboxes → "Valider" button → feedback |
| **Ordering** | `ordering` | Put steps in correct sequence | Number assignment or drag → validate |
| **Image — Identify** | `img_id` | Pick correct image(s) | Tap image → validate (v2, needs images) |
| **Image — Label** | `img_label` | Name parts of a diagram | MCQ per part with diagram (v2) |

**Key discovery:** The book's "Vrai ou faux ?" format is actually **multi-select** — you get 4–13 statements and must check ALL the true ones. This is the dominant question format.

### 3.4 Image Questions Strategy (v1)

Several questions require images. For v1:
1. **Labeling questions** (horse anatomy, saddle, bridle, halter): Converted to individual MCQ questions asking about specific parts.
2. **Photo-identification questions**: Included in JSON with `needs_image: true`. Skipped in quiz rotation unless images are provided later.
3. **SVG/illustration generation**: v2 target. Prompts for image generation tools provided separately.

### 3.5 Data Model

See JSON files in `/data/questions/` for complete examples. Summary of shapes:

```json
// MCQ — single correct answer
{
  "id": "g1-ch1-002",
  "type": "mcq",
  "question": "Question text in French",
  "options": ["Option A", "Option B", "Option C"],
  "correct": 1,
  "explanation": "Explanation in French",
  "difficulty": 1
}

// Multi-select — multiple correct answers (array of indices)
{
  "id": "g1-ch1-001",
  "type": "multi_select",
  "question": "Coche toutes les affirmations correctes :",
  "options": ["Statement A", "Statement B", "Statement C", "Statement D"],
  "correct": [0, 2],
  "explanation": "Explanation text",
  "difficulty": 1
}

// Ordering — items listed in CORRECT order, app shuffles for display
{
  "id": "g1-ch5-012",
  "type": "ordering",
  "question": "Mets les actions dans le bon ordre :",
  "items_in_order": ["First step", "Second step", "Third step"],
  "explanation": "Explanation of the order",
  "difficulty": 2
}

// Image-identify — skipped if needs_image is true and no images provided
{
  "id": "g1-ch3-006",
  "type": "img_id",
  "question": "Sur quelle photo le licol est-il bien ajusté ?",
  "options": ["Photo A", "Photo B", "Photo C"],
  "correct": 1,
  "needs_image": true,
  "image_description": "Description of what images are needed",
  "explanation": "Explanation",
  "difficulty": 1
}
```

---

## 4. Features (v1)

### 4.1 Home Screen
- App title: **Galop Trainer 🐴**
- Galop level selector — Galop 1 active, 2–4 show "Bientôt disponible !"
- Chapter list with progress indicators per chapter
- Quick stats: total answered, % correct, current streak
- "C'est parti ! 🐴" button for random quiz across all chapters

### 4.2 Chapter Selection
- 5 chapters with emoji + title + progress ring
- Tap → quiz for that chapter
- "Tout mélanger" to mix all chapters

### 4.3 Quiz Mode — One Question at a Time

**MCQ:** Tap one option → instant green/red + explanation

**Multi-select:**
- Checkbox options (can check multiple)
- "Valider ✓" button at bottom
- Feedback shows which were right/wrong/missed
- Partial credit: "3/4 bonnes réponses !"

**Ordering:**
- Numbered items to reorder (tap-to-assign or drag)
- "Valider ✓" button
- Green/red per item showing correct position

**All types:** Progress bar at top, skip button, explanation after every answer

### 4.4 Feedback & Encouragement

**Correct:** "Bravo, championne ! 🏆", "Tu gères ! 🐴", "Parfait ! 🌟", "Trop forte ! 💪", "Galop d'enfer ! 🔥", etc.

**Partial (multi-select):** "Presque ! Tu as trouvé X sur Y. 👀", "Pas mal ! Regarde ce qui manque 👇"

**Wrong:** "Pas tout à fait… 🤔", "C'est pas grave, on apprend ! 📚", "Oups ! Maintenant tu sauras 😊"

### 4.5 Results Screen
- X/Y correct, percentage, star rating (🌟🌟🌟 / 🌟🌟 / 🌟)
- List of missed questions
- "Rejouer 🔄", "Revoir les erreurs 📝", "Retour 🏠"

### 4.6 Progress & Review
- Per-chapter % attempted, % correct (stored in localStorage)
- "À revoir" list for wrong answers — removed after 2 consecutive correct
- Overall streak counter

---

## 5. UI & Design

### 5.1 Principles
- **Phone-first** — iPhone portrait is primary
- **One question at a time** — no scrolling for question + options
- **Big touch targets** — 48px+ height for buttons
- **Playful, not childish** — modern, clean, equestrian personality
- **French throughout**

### 5.2 Colors
```
Primary:    #8B6914 (saddle brown/gold)
Primary-lt: #C4A35A (light gold)
Accent:     #2D7D46 (field green)
Correct:    #2D9D4E
Incorrect:  #D4574E (soft coral)
Partial:    #E8A735 (amber)
Background: #FFF8F0 (warm cream)
Card:       #FFFFFF
Text:       #3D2E1C (dark brown)
Text-light: #8B7D6B
Border:     #E8DDD0
```

### 5.3 Responsive Targets
- iPhone SE (375px) — minimum
- iPhone 14/15 (390px) — primary
- iPad (768px+) — centered, same max-width 480px

---

## 6. Technical Spec

### 6.1 Stack
- HTML / CSS / JavaScript — vanilla preferred
- Lightweight libraries from CDN OK if needed (e.g., Sortable.js for drag-and-drop ordering)
- No heavy frameworks (React, Vue)
- No build tools
- GitHub Pages hosting

### 6.2 File Structure
```
sandbox-galop-trainer/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── quiz.js
│   ├── data.js
│   ├── ui.js
│   └── storage.js
├── data/questions/
│   ├── index.json
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

### 6.3 Quiz Engine
1. Load questions for selected chapter (or all)
2. Optionally shuffle order
3. Prioritize: unseen > incorrect > correct
4. Serve one at a time with type-specific UI
5. Record results in localStorage
6. Show results screen at end

### 6.4 PWA
- manifest.json for Add to Home Screen
- Service worker for offline caching
- All content is local JSON

### 6.5 Deployment
- **Repo:** `sandbox-galop-trainer`
- GitHub Pages from `main` branch root
- No build step needed

---

## 7. Adding Content

### New questions:
1. Photograph book pages
2. Claude extracts → JSON
3. Drop JSON in `/data/questions/`
4. Update `index.json`
5. Push → live

### New images:
- Drop in `/assets/images/galop{N}/`
- Update question JSON to remove `needs_image` flag and add `image` path

---

## 8. Image Questions Inventory (for v2)

| Chapter | Q# | Image needed |
|---|---|---|
| Ch2 | 12 | Horse body parts diagram (SVG) |
| Ch3 | 6 | 3 halter fit photos/illustrations |
| Ch3 | 7 | Halter parts diagram (SVG) |
| Ch3 | 8 | Bridle parts diagram (SVG) |
| Ch3 | 9 | Saddle parts diagram (SVG) |
| Ch3 | 10 | 3 attachment knot illustrations |
| Ch4 | 8 | 3 horse-leading position illustrations |
| Ch5 | 11 | 3 stirrup position illustrations |

---

## 9. Future (v2+)
- SVG diagrams for all image questions
- Galop 2–4 full content
- Timed exam simulation mode
- Spaced repetition
- Interactive parcours walkthrough
- Leaderboard for riding school friends

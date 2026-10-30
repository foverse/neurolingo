# NeuroLingo: Adaptive Language Mastery & Spaced Repetition Engine

A fast, responsive web application and spaced repetition engine designed for advanced French mastery (C1/C2 level) across grammar, phonetics, syntax, and nuanced usage.

- Live Web App: [https://foverse.github.io/NeuroLingo/](https://foverse.github.io/NeuroLingo/)
- Repository: [https://github.com/foverse/NeuroLingo](https://github.com/foverse/NeuroLingo)
- Author: [Fouad](https://growthmaker.fr) ([@foverse](https://github.com/foverse))
- Project Hub: [growthmaker.fr](https://growthmaker.fr)
- License: MIT

---

## Overview

NeuroLingo bridges research-backed memory systems with real-world language precision. While general language apps focus on introductory vocabulary, NeuroLingo targets high-frequency pitfalls, complex agreement rules, subjunctive triggers, and subtle spoken liaisons.

The application runs entirely client-side in any browser, utilizing the SuperMemo SM-2 algorithm to schedule card reviews, calculate retention intervals, and adapt to individual error patterns.

---

## Key Features

### 1. Adaptive SM-2 Spaced Repetition
- Standard SM-2 interval calculator adjusting Ease Factor (1.3 to 2.5) based on recall performance.
- 4-grade rating system: Again (reset to day 1), Hard, Good, and Easy.
- Automatic streak calculation, mastery tracking, and local persistence via browser `localStorage`.

### 2. Multi-Mode Practice
- Interactive Flashcards: 3D flip animation displaying prompt, rule context, and usage examples.
- Cloze Deletion Test: Sentence completion mode targeting agreement and verb form accuracy.
- Error Hunt: Detection drills identifying subtle grammatical and lexical errors in authentic texts.

### 3. Integrated Audio & Pronunciation
- Native French text-to-speech integration via the Web Speech API.
- Audio training for silent letters, required vs forbidden liaisons, and phonetic homophones.

### 4. 1,000 High-Yield French Cards Included
- Structured into 9 pedagogical categories:
  1. Orthographe grammaticale (200 cards)
  2. Conjugaison et modes verbaux (150 cards)
  3. Syntaxe et construction (120 cards)
  4. Homophones et pieges lexicaux (120 cards)
  5. Prononciation, liaisons et oral (100 cards)
  6. Registre de langue et fautes orales (100 cards)
  7. Orthographe lexicale et exceptions (80 cards)
  8. Faux-amis et anglicismes a eviter (70 cards)
  9. Ponctuation et typographie (60 cards)

### 5. Anki Compatibility & Export
- Native 5-field TSV dataset ready for immediate import into desktop Anki or mobile AnkiDroid.
- One-click TSV and JSON export tools directly from the web interface.

---

## Quick Start

### Option 1: Browser (Zero Setup)
Open [https://foverse.github.io/NeuroLingo/](https://foverse.github.io/NeuroLingo/) in any browser to begin practicing immediately.

### Option 2: Run Locally
Clone the repository and serve the files locally:

```bash
git clone https://github.com/foverse/NeuroLingo.git
cd NeuroLingo
npx serve .
```

Then visit `http://localhost:3000` in your browser.

---

## Keyboard Shortcuts

- `Space`: Flip card (reveal answer and rule explanation)
- `1`: Rate Again (reset card interval)
- `2`: Rate Hard
- `3`: Rate Good
- `4`: Rate Easy
- `Arrow Right`: Next card
- `Arrow Left`: Previous card

---

## Project Structure

```
NeuroLingo/
├── index.html              # Main single-page application layout
├── css/
│   └── app.css             # 3D flip card animations and dark mode styling
├── js/
│   ├── cards-data.js       # 1,000-card French mastery dataset
│   ├── srs-engine.js       # SuperMemo SM-2 algorithm and progress store
│   └── app.js              # State manager, Audio TTS, and event listeners
├── data/
│   ├── french_expert_1000_cards.tsv # Full 5-field Anki-ready TSV dataset
│   └── README_ANKI_GUIDE.md         # Field mapping and import instructions
├── builder/
│   ├── validate_deck.py    # Automated card syntax and cloze checker
│   └── export_tsv.py       # Custom deck compiler and exporter
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Pages deployment
└── package.json            # Scripts and metadata
```

---

## Python Deck Builder

NeuroLingo includes automated verification tools for deck builders:

```bash
# Validate dataset syntax and category integrity
python builder/validate_deck.py data/french_expert_1000_cards.tsv

# Export or reformat cards to TSV
python builder/export_tsv.py
```

---

## Author & Project Info

Built by [Fouad](https://growthmaker.fr) ([@foverse](https://github.com/foverse)).

Visit [growthmaker.fr](https://growthmaker.fr) for case studies on web engineering, product design, and growth analytics.

Licensed under the [MIT License](LICENSE).

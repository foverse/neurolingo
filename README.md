# NeuroLingo

NeuroLingo is a small, browser-based English practice app. Read a sentence, reveal the answer and explanation, then rate your recall. Your progress is stored locally in your browser.

The included starter deck has 20 exercises covering grammar, vocabulary and everyday English. Filter by topic, listen to a completed sentence using your browser's speech synthesis, or download the [English deck](data/english_starter_cards.tsv) as a five-field TSV. The original French dataset remains in the repository for reference but is not used by the app.

## Run locally

```sh
git clone https://github.com/foverse/neurolingo.git
cd neurolingo
npx serve .
```

Open the address printed by the server. No account or backend is required. English progress uses a separate local storage key from the former French deck.

## Keyboard shortcuts

- Space: show or hide the answer
- Left and right arrows: previous or next card
- 1–4: rate a revealed card from Again to Easy

The existing spaced-repetition engine records intervals and review history. The current practice screen lets you browse all cards; it does not yet filter or order them by due date.

## Project files

- `index.html`, `css/app.css`: practice interface
- `js/english-cards.js`: English starter deck
- `js/app.js`, `js/srs-engine.js`: interaction and progress storage
- `data/english_starter_cards.tsv`: downloadable English deck
- `data/french_expert_1000_cards.tsv`: original French deck

MIT licensed. Created by [Fouad](https://growthmaker.fr).

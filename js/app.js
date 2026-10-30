/**
 * NeuroLingo Main Application Controller
 * Author: Fouad (@foverse) - growthmaker.fr
 */

document.addEventListener('DOMContentLoaded', () => {
  const cards = window.NEUROLINGO_CARDS || [];
  const srs = new window.SRSEngine();

  let activeCategory = 'all';
  let activeMode = 'flashcard'; // 'flashcard', 'cloze', 'error'
  let currentIndex = 0;
  let isFlipped = false;
  let filteredCards = [...cards];

  // Category labels map
  const categoryLabels = {
    'all': 'All Categories',
    'Orthographe_grammaticale': 'Grammar & Accords',
    'Conjugaison_modes': 'Conjugation & Modes',
    'Syntaxe_construction': 'Syntax & Structure',
    'Homophones_lexicaux': 'Lexical Homophones',
    'Phonetique_liaisons_oral': 'Phonetics & Liaisons',
    'Registre_oral_fautes_courantes': 'Oral Register & Pitfalls',
    'Orthographe_lexicale': 'Lexical Spelling',
    'Faux_amis_anglicismes': 'False Friends & Anglicisms',
    'Ponctuation': 'Punctuation & Typography'
  };

  // DOM Elements
  const cardInner = document.getElementById('card-inner');
  const cardFront = document.getElementById('card-front');
  const cardBack = document.getElementById('card-back');
  const cardCategoryBadge = document.getElementById('card-category');
  const cardTypeBadge = document.getElementById('card-type');
  const cardCounter = document.getElementById('card-counter');
  const categorySelect = document.getElementById('category-select');
  const searchInput = document.getElementById('search-input');
  const btnFlip = document.getElementById('btn-flip');
  const btnSpeak = document.getElementById('btn-speak');
  const ratingControls = document.getElementById('rating-controls');
  const statsOverview = document.getElementById('stats-overview');

  // Modes
  const modeTabs = document.querySelectorAll('.mode-tab');

  // Initialize Category Dropdown
  function populateCategories() {
    categorySelect.innerHTML = '';
    const counts = {};
    cards.forEach(c => { counts[c.category] = (counts[c.category] || 0) + 1; });

    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = `All Categories (${cards.length})`;
    categorySelect.appendChild(allOpt);

    Object.keys(counts).forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = `${categoryLabels[cat] || cat} (${counts[cat]})`;
      categorySelect.appendChild(opt);
    });
  }

  // Filter Cards
  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    filteredCards = cards.filter(c => {
      const matchCat = activeCategory === 'all' || c.category === activeCategory;
      const matchQuery = !query || c.front.toLowerCase().includes(query) || c.back.toLowerCase().includes(query);
      let matchMode = true;
      if (activeMode === 'cloze') matchMode = c.type === 'Cloze';
      if (activeMode === 'error') matchMode = c.type === 'Chasse_erreur';
      return matchCat && matchQuery && matchMode;
    });

    currentIndex = 0;
    isFlipped = false;
    renderCurrentCard();
    renderStats();
  }

  // Parse Cloze text
  function formatFrontText(text, showCloze = false) {
    if (!text.includes('{{c1::')) return text;
    return text.replace(/\{\{c1::(.*?)\}\}/g, (match, p1) => {
      if (showCloze) {
        return `<span class="bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded border border-cyan-500/40">${p1}</span>`;
      }
      return `<span class="bg-slate-800 text-slate-400 px-3 py-0.5 rounded border border-slate-700 font-mono tracking-wider">[ ... ]</span>`;
    });
  }

  // Format Back text with breakdown
  function formatBackText(backText) {
    const parts = backText.split(' | ');
    if (parts.length === 1) {
      return `<div class="text-base text-slate-200 font-medium">${backText}</div>`;
    }

    const answer = parts[0] || '';
    const rule = parts[1] || '';
    const example = parts[2] || '';

    let html = `<div class="text-xl font-bold text-cyan-400 mb-3">${answer}</div>`;
    if (rule) {
      html += `<div class="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-sm text-slate-300 leading-relaxed mb-3">
        <strong class="text-slate-100">Règle :</strong> ${rule}
      </div>`;
    }
    if (example) {
      html += `<div class="p-3 bg-cyan-950/20 rounded-xl border border-cyan-800/30 text-xs text-cyan-200/90 font-mono">
        ${example}
      </div>`;
    }
    return html;
  }

  // Render Card
  function renderCurrentCard() {
    if (filteredCards.length === 0) {
      cardFront.innerHTML = `<div class="text-center text-slate-400 p-8">No cards match the active filter or search query.</div>`;
      cardBack.innerHTML = '';
      cardCounter.textContent = '0 / 0';
      ratingControls.classList.add('hidden');
      return;
    }

    const card = filteredCards[currentIndex];
    cardCounter.textContent = `${currentIndex + 1} / ${filteredCards.length}`;
    cardCategoryBadge.textContent = categoryLabels[card.category] || card.category;
    cardTypeBadge.textContent = card.type || 'Standard';

    // Front Content
    cardFront.innerHTML = `
      <div class="space-y-4">
        <div class="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed">
          ${formatFrontText(card.front, false)}
        </div>
        ${card.type === 'Cloze' ? '<p class="text-xs text-cyan-400/80">Cloze test: Identify the missing term or agreement</p>' : ''}
      </div>
    `;

    // Back Content
    cardBack.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Detailed Solution & Rule</div>
        ${formatBackText(card.back)}
      </div>
    `;

    setFlip(false);
  }

  function setFlip(flipped) {
    isFlipped = flipped;
    if (isFlipped) {
      cardInner.classList.add('is-flipped');
      ratingControls.classList.remove('hidden');
      btnFlip.textContent = 'Show Front';
    } else {
      cardInner.classList.remove('is-flipped');
      ratingControls.classList.add('hidden');
      btnFlip.textContent = 'Show Answer (Space)';
    }
  }

  // Text-To-Speech (Native French Voice)
  function speakCurrentCard() {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    if (filteredCards.length === 0) return;

    const card = filteredCards[currentIndex];
    const textToSpeak = card.audio || card.front.replace(/\{\{c1::(.*?)\}\}/g, '$1');

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.95;

    // Pick French voice if available
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang.startsWith('fr'));
    if (frVoice) utterance.voice = frVoice;

    window.speechSynthesis.speak(utterance);
  }

  // Handle Rating
  function handleRating(grade) {
    if (filteredCards.length === 0) return;
    const card = filteredCards[currentIndex];
    srs.rateCard(card.id, grade);

    // Advance to next card
    if (currentIndex < filteredCards.length - 1) {
      currentIndex += 1;
    } else {
      currentIndex = 0;
    }
    renderCurrentCard();
    renderStats();
  }

  // Render Stats
  function renderStats() {
    const stats = srs.getStats(cards.length);
    statsOverview.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Reviewed</div>
          <div class="text-xl font-bold text-white mt-1">${stats.reviewed}</div>
        </div>
        <div class="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Mastered</div>
          <div class="text-xl font-bold text-cyan-400 mt-1">${stats.mastered}</div>
        </div>
        <div class="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Study Streak</div>
          <div class="text-xl font-bold text-blue-400 mt-1">${stats.streak}d</div>
        </div>
        <div class="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Retention</div>
          <div class="text-xl font-bold text-emerald-400 mt-1">${stats.accuracy}%</div>
        </div>
      </div>
    `;
  }

  // Export Deck
  function exportDeck(format = 'tsv') {
    if (filteredCards.length === 0) return;
    let content = '';
    let mime = 'text/tab-separated-values';
    let filename = `neurolingo-deck-${activeCategory}.${format}`;

    if (format === 'tsv') {
      content = filteredCards.map(c => [c.front, c.back, c.category, c.type, c.audio || '-'].join('\t')).join('\n');
    } else if (format === 'json') {
      mime = 'application/json';
      content = JSON.stringify(filteredCards, null, 2);
    }

    const blob = new Blob([content], { type: `${mime};charset=utf-8;` });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  // Event Listeners
  btnFlip.addEventListener('click', () => setFlip(!isFlipped));
  btnSpeak.addEventListener('click', speakCurrentCard);

  document.getElementById('btn-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderCurrentCard();
    }
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    if (currentIndex < filteredCards.length - 1) {
      currentIndex += 1;
      renderCurrentCard();
    }
  });

  categorySelect.addEventListener('change', (e) => {
    activeCategory = e.target.value;
    applyFilters();
  });

  searchInput.addEventListener('input', applyFilters);

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40'));
      modeTabs.forEach(t => t.classList.add('bg-slate-900', 'text-slate-400', 'border-slate-800'));
      tab.classList.remove('bg-slate-900', 'text-slate-400', 'border-slate-800');
      tab.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
      activeMode = tab.dataset.mode;
      applyFilters();
    });
  });

  document.querySelectorAll('.btn-rate').forEach(btn => {
    btn.addEventListener('click', () => {
      const grade = parseInt(btn.dataset.grade, 10);
      handleRating(grade);
    });
  });

  document.getElementById('btn-export-tsv').addEventListener('click', () => exportDeck('tsv'));
  document.getElementById('btn-export-json').addEventListener('click', () => exportDeck('json'));

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      setFlip(!isFlipped);
    } else if (e.key === 'ArrowRight') {
      if (currentIndex < filteredCards.length - 1) {
        currentIndex += 1;
        renderCurrentCard();
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        currentIndex -= 1;
        renderCurrentCard();
      }
    } else if (isFlipped && ['1', '2', '3', '4'].includes(e.key)) {
      handleRating(parseInt(e.key, 10));
    }
  });

  // Init
  populateCategories();
  applyFilters();
});

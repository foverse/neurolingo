/**
 * NeuroLingo SM-2 Spaced Repetition Scheduling Engine
 * Author: Fouad (@foverse) - growthmaker.fr
 */

class SRSEngine {
  constructor(storageKey = 'neurolingo_srs_v1') {
    this.storageKey = storageKey;
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : { cards: {}, stats: { reviewed: 0, correct: 0, streak: 0, lastStudyDate: null } };
    } catch (e) {
      console.warn('Could not read localStorage:', e);
      return { cards: {}, stats: { reviewed: 0, correct: 0, streak: 0, lastStudyDate: null } };
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  getCardState(cardId) {
    if (!this.state.cards[cardId]) {
      this.state.cards[cardId] = {
        reps: 0,
        interval: 0,
        ease: 2.5,
        due: Date.now(),
        history: []
      };
    }
    return this.state.cards[cardId];
  }

  /**
   * Process SM-2 Grade
   * Grade: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
   */
  rateCard(cardId, grade) {
    const card = this.getCardState(cardId);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    let { reps, interval, ease } = card;

    if (grade >= 2) {
      if (reps === 0) {
        interval = grade === 4 ? 2 : 1;
      } else if (reps === 1) {
        interval = grade === 4 ? 4 : (grade === 3 ? 3 : 2);
      } else {
        const factor = grade === 4 ? ease * 1.3 : (grade === 2 ? 1.2 : ease);
        interval = Math.round(interval * factor);
      }
      reps += 1;
      this.state.stats.correct += 1;
    } else {
      reps = 0;
      interval = 1;
    }

    // Update Ease Factor (standard SM-2 formula)
    ease = ease + (0.1 - (4 - grade) * (0.08 + (4 - grade) * 0.02));
    if (ease < 1.3) ease = 1.3;

    card.reps = reps;
    card.interval = interval;
    card.ease = parseFloat(ease.toFixed(2));
    card.due = now + interval * oneDay;
    card.history.push({ date: now, grade, interval });

    this.state.stats.reviewed += 1;
    this.updateStreak();
    this.saveState();

    return card;
  }

  updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = this.state.stats.lastStudyDate;

    if (!lastDate) {
      this.state.stats.streak = 1;
      this.state.stats.lastStudyDate = today;
    } else if (lastDate !== today) {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      if (lastDate === yesterday) {
        this.state.stats.streak += 1;
      } else {
        this.state.stats.streak = 1;
      }
      this.state.stats.lastStudyDate = today;
    }
  }

  getStats(totalCards) {
    const cardKeys = Object.keys(this.state.cards);
    let mastered = 0;
    let learning = 0;

    cardKeys.forEach(id => {
      const item = this.state.cards[id];
      if (item.reps >= 3 && item.interval >= 7) {
        mastered += 1;
      } else if (item.reps > 0) {
        learning += 1;
      }
    });

    const accuracy = this.state.stats.reviewed > 0
      ? Math.round((this.state.stats.correct / this.state.stats.reviewed) * 100)
      : 100;

    return {
      reviewed: this.state.stats.reviewed,
      mastered,
      learning,
      newCards: Math.max(0, totalCards - (mastered + learning)),
      streak: this.state.stats.streak,
      accuracy
    };
  }

  resetProgress() {
    this.state = { cards: {}, stats: { reviewed: 0, correct: 0, streak: 0, lastStudyDate: null } };
    this.saveState();
  }
}

window.SRSEngine = SRSEngine;

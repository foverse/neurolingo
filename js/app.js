document.addEventListener('DOMContentLoaded', () => {
  const cards = window.NEUROLINGO_ENGLISH_CARDS;
  // Keep English progress separate from the earlier French deck.
  const srs = new window.SRSEngine('neurolingo_english_srs_v1');
  const $ = id => document.getElementById(id);
  let filtered = cards, index = 0, revealed = false;
  const select = $('category-select');
  ['All topics', ...new Set(cards.map(card => card.category))].forEach(topic => {
    const option = document.createElement('option'); option.value = topic; option.textContent = topic; select.appendChild(option);
  });
  function render() {
    const card = filtered[index];
    revealed = false; $('answer').hidden = true; $('rating-controls').hidden = true;
    $('btn-flip').textContent = 'Show answer';
    $('card-category').textContent = card.category;
    $('card-type').textContent = 'Fill in the blank';
    $('card-front').textContent = card.front;
    $('card-back').textContent = card.back;
    $('card-explanation').textContent = card.explanation;
    $('card-counter').textContent = `${index + 1} of ${filtered.length}`;
    $('progress-bar').style.width = `${(index + 1) / filtered.length * 100}%`;
    $('reviewed').textContent = srs.getStats(cards.length).reviewed;
    $('btn-prev').disabled = index === 0; $('btn-next').disabled = index === filtered.length - 1;
  }
  function flip() { revealed = !revealed; $('answer').hidden = !revealed; $('rating-controls').hidden = !revealed; $('btn-flip').textContent = revealed ? 'Hide answer' : 'Show answer'; }
  function move(delta) { index = Math.max(0, Math.min(filtered.length - 1, index + delta)); render(); }
  function rate(grade) { if (!revealed) return; srs.rateCard(filtered[index].id, grade); index = (index + 1) % filtered.length; render(); }
  select.addEventListener('change', () => { filtered = select.value === 'All topics' ? cards : cards.filter(card => card.category === select.value); index = 0; render(); });
  $('btn-flip').addEventListener('click', flip);
  $('btn-prev').addEventListener('click', () => move(-1)); $('btn-next').addEventListener('click', () => move(1));
  document.querySelectorAll('.btn-rate').forEach(button => button.addEventListener('click', () => rate(Number(button.dataset.grade))));
  $('btn-speak').addEventListener('click', () => {
    if (!('speechSynthesis' in window)) return;
    const card = filtered[index];
    const utterance = new SpeechSynthesisUtterance(card.front.replace('___', card.back).replace(/\s*\([^)]*\)/g, ''));
    utterance.lang = 'en-US'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance);
  });
  document.addEventListener('keydown', event => {
    if (/^(INPUT|SELECT|BUTTON|TEXTAREA)$/.test(event.target.tagName)) return;
    if (event.code === 'Space') { event.preventDefault(); flip(); }
    else if (event.key === 'ArrowRight') move(1);
    else if (event.key === 'ArrowLeft') move(-1);
    else if (revealed && /^[1-4]$/.test(event.key)) rate(Number(event.key));
  });
  render();
});

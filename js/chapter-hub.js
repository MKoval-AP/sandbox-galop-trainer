/* ============================================================
   chapter-hub.js — Galop 1 chapter hub with progress display
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const chapters = GALOP1_DATA.chapters;

  chapters.forEach(ch => {
    const scoreCard = document.getElementById(`ch${ch.id}-score`);
    if (!scoreCard) return;

    const raw = sessionStorage.getItem(`galop1_ch${ch.id}_score`);
    if (raw) {
      try {
        const { score, total } = JSON.parse(raw);
        scoreCard.textContent = `${score} / ${total}`;
        scoreCard.classList.remove('chapter-card__score--none');
      } catch (e) {
        scoreCard.textContent = 'Erreur';
      }
    } else {
      scoreCard.textContent = 'Non commencé';
      scoreCard.classList.add('chapter-card__score--none');
    }
  });

  // Check if all chapters complete
  const allScores = chapters.map(ch => {
    const raw = sessionStorage.getItem(`galop1_ch${ch.id}_score`);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  });

  const allDone = allScores.every(s => s !== null);
  const summaryEl = document.getElementById('overallSummary');

  if (allDone && summaryEl) {
    const totalScore = allScores.reduce((sum, s) => sum + s.score, 0);
    const totalMax   = allScores.reduce((sum, s) => sum + s.total, 0);
    const pct = Math.round((totalScore / totalMax) * 100);

    summaryEl.style.display = 'block';
    const scoreEl = summaryEl.querySelector('.big-score');
    const msgEl   = summaryEl.querySelector('.summary-msg');

    if (scoreEl) scoreEl.textContent = `${totalScore} / ${totalMax} (${pct}%)`;
    if (msgEl) {
      if (pct === 100)      msgEl.textContent = '🏆 Parfait ! Vous êtes prêt pour le Galop 1 !';
      else if (pct >= 80)   msgEl.textContent = '👍 Excellent travail ! Encore un peu de révision.';
      else if (pct >= 60)   msgEl.textContent = '📚 Bon début ! Continuez à pratiquer.';
      else                  msgEl.textContent = '💪 Courage ! Relisez les chapitres et recommencez.';
    }
  }
});

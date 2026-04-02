/* ============================================================
   quiz.js — Moteur de quiz Galop Trainer
   ============================================================ */

// ── Init ──────────────────────────────────────────────────────
const params      = new URLSearchParams(location.search);
const chapterNum  = parseInt(params.get('chapter'), 10);
const chapter     = GALOP1_DATA.chapters.find(c => c.id === chapterNum);

if (!chapter) {
  location.href = 'index.html';
  throw new Error('Chapter not found');
}

const state = {
  questions:  chapter.questions,
  current:    0,
  answers:    {},     // { questionId: answer }
  labelState: {}      // { questionId: { selectedWord, assignments } }
};

// DOM refs
const root         = document.getElementById('quizRoot');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const titleEl      = document.getElementById('quizTitle');

titleEl.textContent = `Chapitre ${chapter.id} — ${chapter.title}`;

// ── Progress ──────────────────────────────────────────────────
function updateProgress() {
  const pct = ((state.current) / state.questions.length) * 100;
  progressFill.style.width = pct + '%';
  progressText.textContent = `${state.current + 1} / ${state.questions.length}`;
}

// ── Main render dispatcher ────────────────────────────────────
function renderQuestion(index) {
  const q = state.questions[index];
  root.innerHTML = '';
  updateProgress();

  const card = document.createElement('div');
  card.className = 'question-card';

  // Badge
  const badge = document.createElement('div');
  badge.className = 'question-badge';
  badge.textContent = typeBadge(q.type);
  card.appendChild(badge);

  // Question text
  const qText = document.createElement('p');
  qText.className = 'question-text';
  qText.textContent = q.text;
  card.appendChild(qText);

  // Answer area
  let answerEl;
  switch (q.type) {
    case 'mcq-single':   answerEl = renderMcqSingle(q);   break;
    case 'mcq-multiple': answerEl = renderMcqMultiple(q); break;
    case 'true-false':   answerEl = renderTrueFalse(q);   break;
    case 'photo-choice': answerEl = renderPhotoChoice(q); break;
    case 'image-label':  answerEl = renderImageLabel(q);  break;
    default:             answerEl = document.createElement('div');
  }
  card.appendChild(answerEl);
  root.appendChild(card);

  // Restore answer
  restoreAnswer(q);

  // Navigation
  root.appendChild(renderNav(index));
}

function typeBadge(type) {
  const map = {
    'mcq-single':   'Choix unique',
    'mcq-multiple': 'Choix multiple',
    'true-false':   'Vrai ou Faux',
    'photo-choice': 'Photo',
    'image-label':  'Schéma à légender'
  };
  return map[type] || type;
}

// ── MCQ Single ────────────────────────────────────────────────
function renderMcqSingle(q) {
  const ul = document.createElement('ul');
  ul.className = 'options-list';
  q.options.forEach(opt => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    label.className = 'option-label';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = q.id;
    radio.value = opt.id;
    radio.addEventListener('change', () => { state.answers[q.id] = opt.id; });
    const span = document.createElement('span');
    span.textContent = opt.text;
    label.appendChild(radio);
    label.appendChild(span);
    li.appendChild(label);
    ul.appendChild(li);
  });
  return ul;
}

// ── MCQ Multiple ──────────────────────────────────────────────
function renderMcqMultiple(q) {
  const ul = document.createElement('ul');
  ul.className = 'options-list';
  q.options.forEach(opt => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    label.className = 'option-label';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = q.id;
    cb.value = opt.id;
    cb.addEventListener('change', () => {
      const checked = [...ul.querySelectorAll('input:checked')].map(i => i.value).sort();
      state.answers[q.id] = checked.length ? checked : undefined;
    });
    const span = document.createElement('span');
    span.textContent = opt.text;
    label.appendChild(cb);
    label.appendChild(span);
    li.appendChild(label);
    ul.appendChild(li);
  });
  return ul;
}

// ── True-False ────────────────────────────────────────────────
function renderTrueFalse(q) {
  const wrap = document.createElement('div');
  wrap.className = 'tf-group';

  ['Vrai', 'Faux'].forEach(label => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tf-btn tf-btn--${label.toLowerCase()}`;
    btn.textContent = label;
    btn.dataset.val = label === 'Vrai' ? 'true' : 'false';
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('tf-btn--selected'));
      btn.classList.add('tf-btn--selected');
      state.answers[q.id] = btn.dataset.val === 'true';
    });
    wrap.appendChild(btn);
  });
  return wrap;
}

// ── Photo Choice ──────────────────────────────────────────────
function renderPhotoChoice(q) {
  const grid = document.createElement('div');
  grid.className = 'photo-grid';

  q.photos.forEach(photo => {
    const wrap = document.createElement('div');
    wrap.className = 'photo-option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = q.id;
    radio.id = `${q.id}_${photo.id}`;
    radio.value = photo.id;
    radio.addEventListener('change', () => { state.answers[q.id] = photo.id; });

    const label = document.createElement('label');
    label.htmlFor = radio.id;

    // SVG image (using object tag for SVG, or img)
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = `Option ${photo.label}`;
    img.loading = 'lazy';

    const cap = document.createElement('div');
    cap.className = 'photo-caption';
    cap.textContent = photo.label;

    label.appendChild(img);
    label.appendChild(cap);
    wrap.appendChild(radio);
    wrap.appendChild(label);
    grid.appendChild(wrap);
  });
  return grid;
}

// ── Image Label ───────────────────────────────────────────────
function renderImageLabel(q) {
  const container = document.createElement('div');

  // Ensure labelState for this question
  if (!state.labelState[q.id]) {
    state.labelState[q.id] = { selectedWord: null, assignments: {} };
  }
  const ls = state.labelState[q.id];

  // Diagram wrap
  const diagramWrap = document.createElement('div');
  diagramWrap.className = 'label-diagram';
  diagramWrap.style.display = 'block';

  const img = document.createElement('img');
  img.src = q.diagramSrc;
  img.alt = 'Schéma';
  img.style.maxWidth = '480px';
  img.style.width = '100%';
  img.style.display = 'block';
  diagramWrap.appendChild(img);

  // Points overlay (positioned after image loads)
  const pointEls = {};
  q.points.forEach(pt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'label-point';
    btn.dataset.pointId = pt.id;
    btn.style.left = pt.x + '%';
    btn.style.top  = pt.y + '%';
    btn.textContent = pt.id;

    btn.addEventListener('click', () => {
      const lsNow = state.labelState[q.id];
      if (lsNow.selectedWord) {
        // Assign word to this point
        const word = lsNow.selectedWord;
        lsNow.assignments[pt.id] = word;
        lsNow.selectedWord = null;
        refreshWordBank(q, wordBankEl, pointEls);
        updateLabelPoints(q, pointEls);
        syncLabelAnswer(q);
      } else {
        // Clear this point's assignment
        if (lsNow.assignments[pt.id]) {
          delete lsNow.assignments[pt.id];
          refreshWordBank(q, wordBankEl, pointEls);
          updateLabelPoints(q, pointEls);
          syncLabelAnswer(q);
        }
      }
    });

    pointEls[pt.id] = btn;
    diagramWrap.appendChild(btn);
  });

  container.appendChild(diagramWrap);

  // Hint
  const hint = document.createElement('p');
  hint.className = 'label-hint';
  hint.textContent = '1. Cliquez sur un mot  →  2. Cliquez sur le point correspondant';
  container.appendChild(hint);

  // Word bank
  const wordBankEl = document.createElement('div');
  wordBankEl.className = 'word-bank';
  container.appendChild(wordBankEl);

  // Build word bank
  refreshWordBank(q, wordBankEl, pointEls);
  updateLabelPoints(q, pointEls);

  return container;
}

function refreshWordBank(q, bankEl, pointEls) {
  const ls = state.labelState[q.id];
  const usedWords = new Set(Object.values(ls.assignments));

  bankEl.innerHTML = '';
  q.words.forEach(word => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'word-chip';
    chip.textContent = word;

    if (usedWords.has(word)) chip.classList.add('word-chip--used');
    if (ls.selectedWord === word) chip.classList.add('word-chip--selected');

    chip.addEventListener('click', () => {
      const ls2 = state.labelState[q.id];
      if (ls2.selectedWord === word) {
        ls2.selectedWord = null;
      } else {
        ls2.selectedWord = word;
      }
      // Refresh point highlights
      updatePointTargetHighlight(pointEls, ls2.selectedWord !== null);
      refreshWordBank(q, bankEl, pointEls);
    });

    bankEl.appendChild(chip);
  });
}

function updateLabelPoints(q, pointEls) {
  const ls = state.labelState[q.id];
  q.points.forEach(pt => {
    const btn = pointEls[pt.id];
    if (!btn) return;
    const assigned = ls.assignments[pt.id];
    if (assigned) {
      btn.classList.add('label-point--assigned');
      // Show short label (first word or full if fits)
      const short = assigned.length > 6 ? assigned.slice(0, 5) + '…' : assigned;
      btn.title = assigned;
      btn.textContent = short;
    } else {
      btn.classList.remove('label-point--assigned');
      btn.title = '';
      btn.textContent = pt.id;
    }
  });
}

function updatePointTargetHighlight(pointEls, active) {
  Object.values(pointEls).forEach(btn => {
    if (active) btn.classList.add('label-point--target');
    else btn.classList.remove('label-point--target');
  });
}

function syncLabelAnswer(q) {
  const ls = state.labelState[q.id];
  const ans = {};
  q.points.forEach(pt => {
    if (ls.assignments[pt.id]) ans[pt.id] = ls.assignments[pt.id];
  });
  state.answers[q.id] = Object.keys(ans).length ? ans : undefined;
}

// ── Restore Saved Answer ──────────────────────────────────────
function restoreAnswer(q) {
  const saved = state.answers[q.id];
  if (saved === undefined || saved === null) return;

  switch (q.type) {
    case 'mcq-single': {
      const radio = root.querySelector(`input[value="${saved}"]`);
      if (radio) radio.checked = true;
      break;
    }
    case 'mcq-multiple': {
      if (!Array.isArray(saved)) break;
      saved.forEach(val => {
        const cb = root.querySelector(`input[value="${val}"]`);
        if (cb) cb.checked = true;
      });
      break;
    }
    case 'true-false': {
      const btnVal = saved === true ? 'true' : 'false';
      root.querySelectorAll('.tf-btn').forEach(btn => {
        if (btn.dataset.val === btnVal) btn.classList.add('tf-btn--selected');
      });
      break;
    }
    case 'photo-choice': {
      const radio = root.querySelector(`input[value="${saved}"]`);
      if (radio) radio.checked = true;
      break;
    }
    case 'image-label': {
      // labelState is already set; points re-render automatically during creation
      const ls = state.labelState[q.id];
      if (saved && typeof saved === 'object') {
        ls.assignments = { ...saved };
      }
      // Re-trigger visual update
      const pointEls = {};
      root.querySelectorAll('.label-point').forEach(btn => {
        pointEls[btn.dataset.pointId] = btn;
      });
      const bankEl = root.querySelector('.word-bank');
      if (bankEl) {
        updateLabelPoints(q, pointEls);
        refreshWordBank(q, bankEl, pointEls);
      }
      break;
    }
  }
}

// ── Navigation ────────────────────────────────────────────────
function renderNav(index) {
  const nav = document.createElement('div');
  nav.className = 'quiz-nav';

  const isFirst = index === 0;
  const isLast  = index === state.questions.length - 1;

  if (!isFirst) {
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'btn btn--secondary';
    prevBtn.textContent = '← Précédent';
    prevBtn.addEventListener('click', () => {
      state.current--;
      renderQuestion(state.current);
    });
    nav.appendChild(prevBtn);
  } else {
    // Spacer
    const spacer = document.createElement('div');
    nav.appendChild(spacer);
  }

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'btn btn--primary';
  nextBtn.textContent = isLast ? 'Terminer ✓' : 'Suivant →';
  nextBtn.addEventListener('click', () => {
    if (isLast) {
      showResults();
    } else {
      state.current++;
      renderQuestion(state.current);
    }
  });
  nav.appendChild(nextBtn);

  return nav;
}

// ── Scoring ───────────────────────────────────────────────────
function isCorrect(q, userAnswer) {
  if (userAnswer === undefined || userAnswer === null) return false;

  switch (q.type) {
    case 'mcq-single':
    case 'photo-choice':
      return userAnswer === q.correct;

    case 'true-false':
      return userAnswer === q.correct;

    case 'mcq-multiple':
      if (!Array.isArray(userAnswer)) return false;
      return [...userAnswer].sort().join(',') === [...q.correct].sort().join(',');

    case 'image-label':
      if (typeof userAnswer !== 'object') return false;
      return q.points.every(pt => userAnswer[pt.id] === pt.correct);

    default:
      return false;
  }
}

function formatAnswer(q, answer) {
  if (answer === undefined || answer === null) return '(sans réponse)';

  switch (q.type) {
    case 'mcq-single':
    case 'photo-choice': {
      const opt = (q.options || q.photos || []).find(o => o.id === answer);
      return opt ? (opt.text || opt.label) : answer;
    }
    case 'true-false':
      return answer === true ? 'Vrai' : 'Faux';
    case 'mcq-multiple': {
      if (!Array.isArray(answer)) return String(answer);
      return answer.map(id => {
        const opt = q.options.find(o => o.id === id);
        return opt ? opt.text : id;
      }).join(', ');
    }
    case 'image-label': {
      if (typeof answer !== 'object') return String(answer);
      return q.points.map(pt => `${pt.id}: ${answer[pt.id] || '?'}`).join(' | ');
    }
    default:
      return String(answer);
  }
}

function formatCorrect(q) {
  switch (q.type) {
    case 'mcq-single':
    case 'photo-choice': {
      const items = q.options || q.photos || [];
      const opt = items.find(o => o.id === q.correct);
      return opt ? (opt.text || opt.label) : q.correct;
    }
    case 'true-false':
      return q.correct === true ? 'Vrai' : 'Faux';
    case 'mcq-multiple': {
      return q.correct.map(id => {
        const opt = q.options.find(o => o.id === id);
        return opt ? opt.text : id;
      }).join(', ');
    }
    case 'image-label': {
      return q.points.map(pt => `${pt.id}: ${pt.correct}`).join(' | ');
    }
    default:
      return String(q.correct);
  }
}

// ── Results Screen ────────────────────────────────────────────
function showResults() {
  progressFill.style.width = '100%';
  progressText.textContent = `${state.questions.length} / ${state.questions.length}`;
  root.innerHTML = '';

  const correct = state.questions.filter(q => isCorrect(q, state.answers[q.id]));
  const score   = correct.length;
  const total   = state.questions.length;

  // Save to sessionStorage
  try {
    sessionStorage.setItem(`galop1_ch${chapter.id}_score`, JSON.stringify({ score, total }));
  } catch (e) { /* ignore */ }

  // Score card
  const card = document.createElement('div');
  card.className = 'results-card';

  const emoji = score === total ? '🏆' : score >= total * 0.7 ? '👍' : '📚';
  const emojiEl = document.createElement('div');
  emojiEl.className = 'results-emoji';
  emojiEl.textContent = emoji;

  const label = document.createElement('div');
  label.className = 'results-label';
  label.textContent = 'Votre score';

  const scoreEl = document.createElement('div');
  scoreEl.className = 'results-score';
  scoreEl.textContent = `${score} / ${total}`;

  const msg = document.createElement('p');
  msg.style.marginTop = '8px';
  msg.style.color = 'var(--text-light)';
  if (score === total)     msg.textContent = 'Parfait ! Toutes les réponses sont correctes !';
  else if (score >= total * 0.8) msg.textContent = 'Très bien ! Encore un peu de révision et ce sera parfait.';
  else if (score >= total * 0.5) msg.textContent = 'Pas mal ! Continuez à réviser pour progresser.';
  else msg.textContent = 'Courage ! Relisez le chapitre et recommencez.';

  const actions = document.createElement('div');
  actions.className = 'results-actions';

  const restartBtn = document.createElement('button');
  restartBtn.type = 'button';
  restartBtn.className = 'btn btn--secondary';
  restartBtn.textContent = '↺ Recommencer';
  restartBtn.addEventListener('click', () => location.reload());

  const hubBtn = document.createElement('a');
  hubBtn.href = 'index.html';
  hubBtn.className = 'btn btn--primary';
  hubBtn.textContent = '← Retour aux chapitres';

  actions.appendChild(restartBtn);
  actions.appendChild(hubBtn);

  card.appendChild(emojiEl);
  card.appendChild(label);
  card.appendChild(scoreEl);
  card.appendChild(msg);
  card.appendChild(actions);
  root.appendChild(card);

  // Wrong answers
  const wrong = state.questions.filter(q => !isCorrect(q, state.answers[q.id]));
  if (wrong.length > 0) {
    const section = document.createElement('div');
    const heading = document.createElement('h3');
    heading.className = 'section-heading';
    heading.textContent = `Questions à revoir (${wrong.length})`;
    section.appendChild(heading);

    const list = document.createElement('div');
    list.className = 'wrong-list';

    wrong.forEach(q => {
      const item = document.createElement('div');
      item.className = 'wrong-item';

      const qEl = document.createElement('p');
      qEl.className = 'wrong-item__q';
      qEl.textContent = q.text;

      const userLbl = document.createElement('p');
      userLbl.className = 'wrong-item__label';
      userLbl.textContent = 'Votre réponse :';

      const userAns = document.createElement('p');
      userAns.className = 'wrong-item__user';
      userAns.textContent = formatAnswer(q, state.answers[q.id]);

      const corrLbl = document.createElement('p');
      corrLbl.className = 'wrong-item__label';
      corrLbl.textContent = 'Réponse correcte :';

      const corrAns = document.createElement('p');
      corrAns.className = 'wrong-item__correct';
      corrAns.textContent = formatCorrect(q);

      item.appendChild(qEl);
      item.appendChild(userLbl);
      item.appendChild(userAns);
      item.appendChild(corrLbl);
      item.appendChild(corrAns);
      list.appendChild(item);
    });

    section.appendChild(list);
    root.appendChild(section);
  }
}

// ── Start ─────────────────────────────────────────────────────
renderQuestion(0);

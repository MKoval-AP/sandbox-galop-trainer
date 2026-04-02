/* app.js — Router, screen management, init */
var App = (function () {
  'use strict';

  var chapters = [];
  var currentGalop = 1;

  function init() {
    bindNavigation();
    loadHome();
  }

  function bindNavigation() {
    UI.el('btn-back-chapters').addEventListener('click', goHome);
    UI.el('btn-back-quiz').addEventListener('click', function () {
      showChapters();
    });
  }

  function loadHome() {
    Data.loadGalopChapters(1).then(function (chs) {
      chapters = chs;
      renderGalopLevels();
      refreshStats();
    });
  }

  function renderGalopLevels() {
    Data.getManifest().then(function (manifest) {
      var container = UI.el('galop-levels');
      container.innerHTML = '';

      var icons = ['🥇', '🥈', '🥉', '🏅'];

      manifest.galops.forEach(function (galop, idx) {
        var card = document.createElement('div');
        card.className = 'galop-card';

        if (galop.status === 'active') {
          card.classList.add('active-level');
          card.addEventListener('click', function () {
            currentGalop = galop.level;
            showChapters();
          });
        } else {
          card.classList.add('placeholder');
        }

        var icon = document.createElement('span');
        icon.className = 'galop-card-icon';
        icon.textContent = icons[idx] || '🏅';

        var info = document.createElement('div');
        info.className = 'galop-card-info';

        var title = document.createElement('div');
        title.className = 'galop-card-title';
        title.textContent = galop.title;

        var subtitle = document.createElement('div');
        subtitle.className = 'galop-card-subtitle';
        subtitle.textContent = galop.status === 'active'
          ? galop.files.length + ' chapitres'
          : 'Bientôt disponible !';

        info.appendChild(title);
        info.appendChild(subtitle);

        var arrow = document.createElement('span');
        arrow.className = 'galop-card-arrow';
        arrow.textContent = galop.status === 'active' ? '→' : '';

        card.appendChild(icon);
        card.appendChild(info);
        card.appendChild(arrow);
        container.appendChild(card);
      });
    });
  }

  function showChapters() {
    UI.el('chapters-title').textContent = 'Galop ' + currentGalop;
    renderChapterList();
    UI.showScreen('screen-chapters');
  }

  function renderChapterList() {
    var container = UI.el('chapter-list');
    container.innerHTML = '';

    chapters.forEach(function (ch, idx) {
      var playableQuestions = ch.questions.filter(function (q) { return !q.needs_image; });
      var progress = Storage.getChapterProgress(playableQuestions);

      var card = document.createElement('div');
      card.className = 'chapter-card';

      var emoji = document.createElement('span');
      emoji.className = 'chapter-card-emoji';
      emoji.textContent = ch.emoji;

      var info = document.createElement('div');
      info.className = 'chapter-card-info';

      var title = document.createElement('div');
      title.className = 'chapter-card-title';
      title.textContent = ch.title;

      var meta = document.createElement('div');
      meta.className = 'chapter-card-meta';
      meta.textContent = playableQuestions.length + ' questions · ' + progress.percent + '% fait';

      info.appendChild(title);
      info.appendChild(meta);

      var ring = UI.createProgressRing(progress.percent);

      card.appendChild(emoji);
      card.appendChild(info);
      card.appendChild(ring);

      card.addEventListener('click', function () {
        startQuiz(idx);
      });

      container.appendChild(card);
    });

    // "Tout mélanger" button
    var mixBtn = document.createElement('button');
    mixBtn.className = 'btn-mix-all';
    mixBtn.textContent = 'Tout mélanger 🎲';
    mixBtn.setAttribute('type', 'button');
    mixBtn.addEventListener('click', function () {
      startQuiz(-1);
    });
    container.appendChild(mixBtn);
  }

  function startQuiz(chapterIndex) {
    var questionList = Data.getQuizQuestions(chapters, chapterIndex);
    if (questionList.length === 0) return;
    Quiz.start(questionList);
  }

  function goHome() {
    refreshStats();
    renderChapterList();
    UI.showScreen('screen-home');
  }

  function replay() {
    showChapters();
  }

  function refreshStats() {
    var state = Storage.getState();
    UI.el('stat-answered').textContent = state.stats.totalAnswered;
    var pct = state.stats.totalAnswered > 0
      ? Math.round((state.stats.totalCorrect / state.stats.totalAnswered) * 100)
      : 0;
    UI.el('stat-percent').textContent = pct + '%';
    UI.el('stat-streak').textContent = state.stats.currentStreak;
  }

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', init);

  return {
    goHome: goHome,
    replay: replay,
    refreshStats: refreshStats
  };
})();

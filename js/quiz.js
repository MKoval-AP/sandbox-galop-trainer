/* quiz.js — Quiz engine logic */
var Quiz = (function () {
  'use strict';

  var questions = [];
  var currentIndex = 0;
  var results = [];
  var quizBody = null;

  function start(questionList) {
    questions = questionList;
    currentIndex = 0;
    results = [];
    quizBody = UI.el('quiz-body');
    UI.showScreen('screen-quiz');
    renderCurrent();
  }

  function renderCurrent() {
    if (currentIndex >= questions.length) {
      showResults();
      return;
    }

    updateProgress();
    var q = questions[currentIndex];

    switch (q.type) {
      case 'mcq':
        UI.renderMCQ(q, quizBody, handleAnswer);
        break;
      case 'multi_select':
        UI.renderMultiSelect(q, quizBody, handleAnswer);
        break;
      default:
        // Skip unsupported types
        currentIndex++;
        renderCurrent();
        return;
    }

    // Add skip button
    var skipBtn = document.createElement('button');
    skipBtn.className = 'btn-skip';
    skipBtn.textContent = 'Passer →';
    skipBtn.setAttribute('type', 'button');
    skipBtn.addEventListener('click', function () {
      results.push({ question: q, correct: false, skipped: true });
      currentIndex++;
      renderCurrent();
    });
    quizBody.querySelector('.question-card').appendChild(skipBtn);
  }

  function handleAnswer(isCorrect) {
    var q = questions[currentIndex];
    results.push({ question: q, correct: isCorrect, skipped: false });
    Storage.recordAnswer(q.id, isCorrect);
  }

  function next() {
    currentIndex++;
    renderCurrent();
  }

  function updateProgress() {
    var pct = ((currentIndex) / questions.length) * 100;
    UI.el('quiz-progress-bar').style.width = pct + '%';
    UI.el('quiz-progress-text').textContent = (currentIndex + 1) + '/' + questions.length;
  }

  function showResults() {
    var totalQ = results.length;
    var correctCount = 0;
    var missed = [];

    for (var i = 0; i < results.length; i++) {
      if (results[i].correct) {
        correctCount++;
      } else {
        missed.push(results[i]);
      }
    }

    var pct = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    var stars = pct >= 90 ? '🌟🌟🌟' : pct >= 70 ? '🌟🌟' : pct >= 40 ? '🌟' : '';

    var resultMsg = '';
    if (pct >= 90) resultMsg = 'Extraordinaire ! Tu es une vraie championne ! 🏆';
    else if (pct >= 70) resultMsg = 'Très bien ! Continue comme ça ! 💪';
    else if (pct >= 50) resultMsg = 'Pas mal ! Encore un peu d\'entraînement ! 📚';
    else resultMsg = 'Courage ! La pratique rend parfait ! 🐴';

    var container = UI.el('results-content');
    var html = '';

    html += '<div class="results-stars">' + stars + '</div>';
    html += '<div class="results-score">' + correctCount + '/' + totalQ + '</div>';
    html += '<div class="results-percent">' + pct + '% correct</div>';
    html += '<div class="results-message">' + resultMsg + '</div>';

    if (missed.length > 0) {
      html += '<div class="results-missed">';
      html += '<h3>Questions à revoir (' + missed.length + ')</h3>';
      for (var j = 0; j < missed.length; j++) {
        html += '<div class="missed-question">' + escapeHtml(missed[j].question.question) + '</div>';
      }
      html += '</div>';
    }

    html += '<div class="results-buttons">';
    html += '<button class="btn-result primary" onclick="App.replay()">Rejouer 🔄</button>';
    html += '<button class="btn-result secondary" onclick="App.goHome()">Retour 🏠</button>';
    html += '</div>';

    container.innerHTML = html;

    // Set progress bar to 100%
    UI.el('quiz-progress-bar').style.width = '100%';
    UI.showScreen('screen-results');

    // Update home stats on return
    App.refreshStats();
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getResults() {
    return results;
  }

  return {
    start: start,
    next: next,
    getResults: getResults
  };
})();

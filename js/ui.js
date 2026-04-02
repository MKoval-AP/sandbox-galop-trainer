/* ui.js — DOM helpers, animations, feedback messages */
var UI = (function () {
  'use strict';

  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

  var CORRECT_MESSAGES = [
    "Bravo, championne ! 🏆",
    "Tu gères ! 🐴",
    "Parfait ! 🌟",
    "Trop forte ! 💪",
    "Galop d'enfer ! 🔥",
    "Exactement ! 👏",
    "Tu assures ! ⭐",
    "Bien joué ! 🎯",
    "C'est ça ! ✨",
    "Incroyable ! 🦄"
  ];

  var PARTIAL_MESSAGES = [
    "Presque ! Tu as trouvé {x} sur {y}. 👀",
    "Pas mal ! Mais regarde ce qui manque 👇",
    "Bien essayé ! Il en manquait quelques-unes 💡"
  ];

  var INCORRECT_MESSAGES = [
    "Pas tout à fait… 🤔",
    "Presque ! Regarde l'explication 👇",
    "C'est pas grave, on apprend ! 📚",
    "Bonne tentative ! Retiens bien 💡",
    "Oups ! Mais maintenant tu sauras 😊"
  ];

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getCorrectMessage() {
    return randomFrom(CORRECT_MESSAGES);
  }

  function getIncorrectMessage() {
    return randomFrom(INCORRECT_MESSAGES);
  }

  function getPartialMessage(found, total) {
    var msg = randomFrom(PARTIAL_MESSAGES);
    return msg.replace('{x}', found).replace('{y}', total);
  }

  function el(id) {
    return document.getElementById(id);
  }

  function showScreen(screenId) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove('active');
    }
    el(screenId).classList.add('active');
    window.scrollTo(0, 0);
  }

  function createProgressRing(percent) {
    var r = 16;
    var circ = 2 * Math.PI * r;
    var offset = circ - (percent / 100) * circ;

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'chapter-progress-ring');
    svg.setAttribute('viewBox', '0 0 40 40');

    var bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bgCircle.setAttribute('class', 'ring-bg');
    bgCircle.setAttribute('cx', '20');
    bgCircle.setAttribute('cy', '20');
    bgCircle.setAttribute('r', String(r));
    svg.appendChild(bgCircle);

    var fillCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fillCircle.setAttribute('class', 'ring-fill');
    fillCircle.setAttribute('cx', '20');
    fillCircle.setAttribute('cy', '20');
    fillCircle.setAttribute('r', String(r));
    fillCircle.setAttribute('stroke-dasharray', String(circ));
    fillCircle.setAttribute('stroke-dashoffset', String(offset));
    fillCircle.setAttribute('transform', 'rotate(-90 20 20)');
    svg.appendChild(fillCircle);

    return svg;
  }

  /* ===== MCQ Rendering ===== */
  function renderMCQ(question, container, onAnswer) {
    var card = document.createElement('div');
    card.className = 'question-card';

    var qText = document.createElement('p');
    qText.className = 'question-text';
    qText.textContent = question.question;
    card.appendChild(qText);

    var optionsList = document.createElement('div');
    optionsList.className = 'options-list';

    var answered = false;

    question.options.forEach(function (opt, idx) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('type', 'button');

      var letter = document.createElement('span');
      letter.className = 'option-letter';
      letter.textContent = LETTERS[idx];

      var text = document.createElement('span');
      text.className = 'option-text';
      text.textContent = opt;

      btn.appendChild(letter);
      btn.appendChild(text);

      btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;

        // Disable all buttons
        var allBtns = optionsList.querySelectorAll('.option-btn');
        for (var i = 0; i < allBtns.length; i++) {
          allBtns[i].classList.add('disabled');
        }

        var isCorrect = idx === question.correct;

        // Mark selected
        if (isCorrect) {
          btn.classList.add('correct');
          var icon = document.createElement('span');
          icon.className = 'option-icon';
          icon.textContent = '✓';
          btn.appendChild(icon);
        } else {
          btn.classList.add('incorrect');
          var iconX = document.createElement('span');
          iconX.className = 'option-icon';
          iconX.textContent = '✗';
          btn.appendChild(iconX);

          // Show correct answer
          allBtns[question.correct].classList.add('correct');
          var iconC = document.createElement('span');
          iconC.className = 'option-icon';
          iconC.textContent = '✓';
          allBtns[question.correct].appendChild(iconC);
        }

        // Show feedback
        showFeedback(card, isCorrect, question.explanation, null, null);
        onAnswer(isCorrect);
      });

      optionsList.appendChild(btn);
    });

    card.appendChild(optionsList);
    container.innerHTML = '';
    container.appendChild(card);
  }

  /* ===== Multi-Select Rendering ===== */
  function renderMultiSelect(question, container, onAnswer) {
    var card = document.createElement('div');
    card.className = 'question-card';

    var qText = document.createElement('p');
    qText.className = 'question-text';
    qText.textContent = question.question;
    card.appendChild(qText);

    var optionsList = document.createElement('div');
    optionsList.className = 'options-list';

    var selected = new Set();
    var answered = false;

    question.options.forEach(function (opt, idx) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('type', 'button');

      var checkbox = document.createElement('span');
      checkbox.className = 'option-checkbox';
      checkbox.textContent = '✓';

      var text = document.createElement('span');
      text.className = 'option-text';
      text.textContent = opt;

      btn.appendChild(checkbox);
      btn.appendChild(text);

      btn.addEventListener('click', function () {
        if (answered) return;
        if (selected.has(idx)) {
          selected.delete(idx);
          btn.classList.remove('selected');
        } else {
          selected.add(idx);
          btn.classList.add('selected');
        }
        validateBtn.disabled = selected.size === 0;
      });

      optionsList.appendChild(btn);
    });

    card.appendChild(optionsList);

    // Validate button
    var validateBtn = document.createElement('button');
    validateBtn.className = 'btn-validate';
    validateBtn.textContent = 'Valider ✓';
    validateBtn.disabled = true;
    validateBtn.setAttribute('type', 'button');

    validateBtn.addEventListener('click', function () {
      if (answered) return;
      answered = true;
      validateBtn.classList.add('hidden');

      var allBtns = optionsList.querySelectorAll('.option-btn');
      for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.add('disabled');
      }

      var correctSet = new Set(question.correct);
      var correctCount = 0;

      question.options.forEach(function (opt, idx) {
        var btn = allBtns[idx];
        var wasSelected = selected.has(idx);
        var isCorrect = correctSet.has(idx);

        var icon = document.createElement('span');
        icon.className = 'option-icon';

        if (wasSelected && isCorrect) {
          btn.classList.remove('selected');
          btn.classList.add('correct');
          icon.textContent = '✓';
          correctCount++;
        } else if (wasSelected && !isCorrect) {
          btn.classList.remove('selected');
          btn.classList.add('incorrect');
          icon.textContent = '✗';
        } else if (!wasSelected && isCorrect) {
          btn.classList.add('missed');
          icon.textContent = '✓';
        }
        // else: not selected and not correct — leave as is

        if (icon.textContent) btn.appendChild(icon);
      });

      var totalCorrect = question.correct.length;
      var noWrongSelected = true;
      selected.forEach(function (idx) {
        if (!correctSet.has(idx)) noWrongSelected = false;
      });

      var isFullyCorrect = correctCount === totalCorrect && noWrongSelected;
      var isPartial = correctCount > 0 && !isFullyCorrect;

      showFeedback(
        card,
        isFullyCorrect,
        question.explanation,
        isPartial ? { found: correctCount, total: totalCorrect } : null,
        null
      );

      onAnswer(isFullyCorrect);
    });

    card.appendChild(validateBtn);
    container.innerHTML = '';
    container.appendChild(card);
  }

  /* ===== Feedback ===== */
  function showFeedback(parentEl, isCorrect, explanation, partialInfo, onNext) {
    var feedback = document.createElement('div');
    feedback.className = 'feedback-card';

    var msg = document.createElement('p');
    msg.className = 'feedback-message';

    if (isCorrect) {
      msg.classList.add('correct');
      msg.textContent = getCorrectMessage();
    } else if (partialInfo) {
      msg.classList.add('partial');
      msg.textContent = getPartialMessage(partialInfo.found, partialInfo.total);
    } else {
      msg.classList.add('incorrect');
      msg.textContent = getIncorrectMessage();
    }
    feedback.appendChild(msg);

    if (explanation) {
      var expl = document.createElement('p');
      expl.className = 'feedback-explanation';
      expl.textContent = explanation;
      feedback.appendChild(expl);
    }

    parentEl.appendChild(feedback);

    // "Suivant" button
    var nextBtn = document.createElement('button');
    nextBtn.className = 'btn-next';
    nextBtn.textContent = 'Suivant →';
    nextBtn.setAttribute('type', 'button');
    nextBtn.addEventListener('click', function () {
      if (typeof Quiz !== 'undefined') Quiz.next();
    });
    parentEl.appendChild(nextBtn);
  }

  return {
    el: el,
    showScreen: showScreen,
    createProgressRing: createProgressRing,
    renderMCQ: renderMCQ,
    renderMultiSelect: renderMultiSelect,
    getCorrectMessage: getCorrectMessage,
    getIncorrectMessage: getIncorrectMessage,
    getPartialMessage: getPartialMessage,
    LETTERS: LETTERS
  };
})();

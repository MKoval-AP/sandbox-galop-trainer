/* storage.js — localStorage wrapper with iOS Safari safety */
var Storage = (function () {
  'use strict';

  var STORAGE_KEY = 'galop-trainer-state';

  var defaultState = {
    currentGalop: 1,
    progress: {},
    reviewList: [],
    stats: {
      totalAnswered: 0,
      totalCorrect: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastSession: null
    }
  };

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        // Merge with defaults for any missing keys
        return {
          currentGalop: parsed.currentGalop || defaultState.currentGalop,
          progress: parsed.progress || {},
          reviewList: parsed.reviewList || [],
          stats: Object.assign({}, defaultState.stats, parsed.stats || {})
        };
      }
    } catch (e) {
      // localStorage unavailable (iOS private browsing)
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Silently fail
    }
  }

  function getState() {
    return load();
  }

  function recordAnswer(questionId, isCorrect) {
    var state = load();
    var prev = state.progress[questionId] || {
      attempts: 0,
      lastCorrect: false,
      correctStreak: 0,
      lastAttempt: null
    };

    prev.attempts++;
    prev.lastCorrect = isCorrect;
    prev.correctStreak = isCorrect ? prev.correctStreak + 1 : 0;
    prev.lastAttempt = new Date().toISOString().slice(0, 10);
    state.progress[questionId] = prev;

    // Update stats
    state.stats.totalAnswered++;
    if (isCorrect) {
      state.stats.totalCorrect++;
      state.stats.currentStreak++;
      if (state.stats.currentStreak > state.stats.bestStreak) {
        state.stats.bestStreak = state.stats.currentStreak;
      }
    } else {
      state.stats.currentStreak = 0;
    }
    state.stats.lastSession = new Date().toISOString().slice(0, 10);

    // Update review list
    if (!isCorrect) {
      if (state.reviewList.indexOf(questionId) === -1) {
        state.reviewList.push(questionId);
      }
    } else if (prev.correctStreak >= 2) {
      var idx = state.reviewList.indexOf(questionId);
      if (idx !== -1) {
        state.reviewList.splice(idx, 1);
      }
    }

    save(state);
    return state;
  }

  function getQuestionProgress(questionId) {
    var state = load();
    return state.progress[questionId] || null;
  }

  function getChapterProgress(questions) {
    var state = load();
    var attempted = 0;
    var correct = 0;
    for (var i = 0; i < questions.length; i++) {
      var p = state.progress[questions[i].id];
      if (p) {
        attempted++;
        if (p.lastCorrect) correct++;
      }
    }
    return {
      attempted: attempted,
      correct: correct,
      total: questions.length,
      percent: questions.length > 0 ? Math.round((attempted / questions.length) * 100) : 0
    };
  }

  return {
    getState: getState,
    recordAnswer: recordAnswer,
    getQuestionProgress: getQuestionProgress,
    getChapterProgress: getChapterProgress
  };
})();

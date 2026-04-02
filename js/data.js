/* data.js — JSON data loader */
var Data = (function () {
  'use strict';

  var BASE_PATH = 'data/questions/';
  var manifest = null;
  var chaptersCache = {};

  function loadManifest() {
    return fetch(BASE_PATH + 'index.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        manifest = data;
        return data;
      });
  }

  function getManifest() {
    if (manifest) return Promise.resolve(manifest);
    return loadManifest();
  }

  function loadChapter(filename) {
    if (chaptersCache[filename]) {
      return Promise.resolve(chaptersCache[filename]);
    }
    return fetch(BASE_PATH + filename)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        chaptersCache[filename] = data;
        return data;
      })
      .catch(function () {
        return null;
      });
  }

  function loadGalopChapters(level) {
    return getManifest().then(function (m) {
      var galop = null;
      for (var i = 0; i < m.galops.length; i++) {
        if (m.galops[i].level === level) {
          galop = m.galops[i];
          break;
        }
      }
      if (!galop || !galop.files.length) return [];

      var promises = galop.files.map(function (f) { return loadChapter(f); });
      return Promise.all(promises).then(function (results) {
        return results.filter(function (r) { return r !== null; });
      });
    });
  }

  function getQuizQuestions(chapters, chapterIndex) {
    var questions = [];
    if (chapterIndex === -1) {
      // All chapters mixed
      for (var i = 0; i < chapters.length; i++) {
        questions = questions.concat(filterPlayable(chapters[i].questions));
      }
    } else {
      questions = filterPlayable(chapters[chapterIndex].questions);
    }
    return prioritizeAndShuffle(questions);
  }

  function filterPlayable(questions) {
    return questions.filter(function (q) {
      return !q.needs_image;
    });
  }

  function prioritizeAndShuffle(questions) {
    var state = Storage.getState();
    var unseen = [];
    var incorrect = [];
    var correct = [];

    for (var i = 0; i < questions.length; i++) {
      var p = state.progress[questions[i].id];
      if (!p) {
        unseen.push(questions[i]);
      } else if (!p.lastCorrect) {
        incorrect.push(questions[i]);
      } else {
        correct.push(questions[i]);
      }
    }

    shuffle(unseen);
    shuffle(incorrect);
    shuffle(correct);

    return unseen.concat(incorrect, correct);
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  return {
    getManifest: getManifest,
    loadGalopChapters: loadGalopChapters,
    getQuizQuestions: getQuizQuestions,
    shuffle: shuffle
  };
})();

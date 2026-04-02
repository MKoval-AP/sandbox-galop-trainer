var CACHE_NAME = 'galop-trainer-v1';
var URLS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/quiz.js',
  './js/data.js',
  './js/ui.js',
  './js/storage.js',
  './data/questions/index.json',
  './data/questions/galop1-ch1-connaissances.json',
  './data/questions/galop1-ch2-connaissance-cheval.json',
  './data/questions/galop1-ch3-soccuper-cheval.json',
  './data/questions/galop1-ch4-pratique-pied.json',
  './data/questions/galop1-ch5-pratique-cheval.json'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) { return name !== CACHE_NAME; })
          .map(function (name) { return caches.delete(name); })
      );
    })
  );
});

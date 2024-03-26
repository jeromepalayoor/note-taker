const CACHE_NAME = 'note-taking-app-cache-v1';
const urlsToCache = [
  'index.html',
  'styles.css',
  'script.js',
  'icons/icon-72x72.png',
  'icons/icon-96x96.png',
  'icons/icon-144x144.png',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

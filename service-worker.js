const CACHE_NAME = 'disha-music-v3';

const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install the new version
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(SHELL_FILES);
    })
  );

  self.skipWaiting();
});

// Remove old versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// App shell: cache first
// Music, YouTube content and artwork: network
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const isLocalFile =
    url.origin === self.location.origin &&
    SHELL_FILES.some((file) => {
      return url.pathname.endsWith(file.replace('./', '/'));
    });

  if (isLocalFile) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request);
      })
    );
  }
});
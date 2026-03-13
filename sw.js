// Blue Lagune Service Worker v2
const CACHE = 'blue-lagune-v2';
const ASSETS = [
  '/blue-lagune-burano/',
  '/blue-lagune-burano/index.html',
  '/blue-lagune-burano/data.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // NIEMALS externe APIs abfangen
  if (url.includes('anthropic.com') || 
      url.includes('workers.dev') ||
      url.includes('googleapis.com') ||
      !url.startsWith(self.location.origin)) {
    return; // Browser direkt machen lassen
  }

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

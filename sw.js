// Service Worker der Vorlese-App: Offline-Start der Seite und Annahme von „Teilen“ aus WhatsApp
const APP = 'Vorlese_App_mit_Spracheingabe.html';
const CACHE = 'vorlese-app-v1';
const SHARE = 'vorlese-share';
const FILES = [APP, 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== SHARE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  // Geteilte Dateien (z. B. WhatsApp-Sprachnachrichten) zwischenspeichern und die App öffnen
  if (req.method === 'POST' && url.pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      try {
        const form = await req.formData();
        const c = await caches.open(SHARE);
        for (const old of await c.keys()) await c.delete(old);
        let i = 0;
        for (const f of form.getAll('audio')) {
          if (!(f instanceof File)) continue;
          const key = new URL('shared/' + (i++) + '/' + encodeURIComponent(f.name || 'nachricht.opus'), self.registration.scope);
          await c.put(key, new Response(f, {headers: {'Content-Type': f.type || 'audio/ogg'}}));
        }
      } catch (err) {}
      return Response.redirect(new URL(APP + '?share=1', self.registration.scope).href, 303);
    })());
    return;
  }
  // Nur Seiten- und Programmdateien aus dem eigenen Ordner: erst Netz (damit Updates ankommen), sonst Zwischenspeicher
  if (req.method === 'GET' && url.origin === location.origin && FILES.some(f => url.pathname.endsWith(f))) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch: true})));
  }
});

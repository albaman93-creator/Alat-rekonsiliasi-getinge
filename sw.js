const CACHE_NAME = 'steril-app-v6';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// --- INSTALL: simpan file ke cache ---
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// --- ACTIVATE: hapus cache lama ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('Hapus cache lama:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// --- FETCH: Cache First + background update (Stale-While-Revalidate) ---
// Ambil dari cache dulu (instan & offline-ready).
// Update cache di background supaya selalu fresh untuk request berikutnya.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Lewati request ke CDN eksternal (tesseract, pdf.js, fonts)
  // biarkan browser menangani dengan cache-nya sendiri
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Ada di cache -- kembalikan langsung (instan)
        // Perbarui cache di background untuk request berikutnya
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {}); // abaikan jika offline
        return cached;
      }
      // Belum ada di cache -- ambil dari network & simpan
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => caches.match('./index.html'));
    })
  );
});

const CACHE_NAME = 'steril-app-v5';

// Daftar file yang akan disimpan ke cache
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ─── INSTALL: simpan file ke cache ───────────────────────────
self.addEventListener('install', event => {
  // Langsung aktif tanpa menunggu tab lama ditutup
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ─── ACTIVATE: hapus cache lama otomatis ─────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('Hapus cache lama:', key);
            return caches.delete(key);
          })
      );
    }).then(() => {
      // Langsung ambil kontrol semua tab/halaman
      return self.clients.claim();
    })
  );
});

// ─── FETCH: Network First, fallback ke cache ─────────────────
// Selalu coba ambil dari internet dulu.
// Kalau gagal (offline), baru pakai cache.
self.addEventListener('fetch', event => {
  // Hanya handle request GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Dapat dari internet — update cache sekalian
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Gagal ambil dari internet (offline) — pakai cache
        return caches.match(event.request);
      })
  );
});

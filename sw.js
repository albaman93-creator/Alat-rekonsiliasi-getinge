const CACHE_NAME = 'steril-app-v1';

// Daftar file yang akan disimpan ke memori HP (Cache)
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Tahap Install: Simpan semua file ke dalam Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache berhasil dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Tahap Fetch: Mengambil data saat aplikasi dibuka
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di memori HP (offline), gunakan itu.
        if (response) {
          return response;
        }
        // Jika tidak ada, baru ambil dari internet.
        return fetch(event.request);
      })
  );
});

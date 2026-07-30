const CACHE_NAME = 'fardos-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições e retorna o que está no cache (Offline first)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrou no cache, retorna o arquivo em cache. Se não, busca na rede.
        return response || fetch(event.request);
      })
  );
});
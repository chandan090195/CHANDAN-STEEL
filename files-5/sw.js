var VERSION = 'cs-v3';
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e) {
  // Never cache - always fresh
  e.respondWith(
    fetch(e.request, {cache: 'no-store'}).catch(function() {
      return new Response('Offline - please connect to internet', {status: 503});
    })
  );
});

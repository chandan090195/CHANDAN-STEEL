// Force update every time - no caching
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Never cache - always fetch fresh from network
self.addEventListener('fetch', function(e) {
  if (e.request.mode === 'navigate') {
    // For page loads, always get fresh from network
    e.respondWith(
      fetch(e.request, {cache: 'no-store'}).catch(function() {
        return caches.match(e.request);
      })
    );
  }
  // All other requests go to network normally
});

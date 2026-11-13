/* IPSUR EDUCORE Progressive Web App (PWA) Service Worker */
const CACHE_NAME = 'ipsur-educore-pwa-v3';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/ipsur-logo.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png',
  '/apple-touch-icon.png',
  '/favicon.png'
];

// Install: Cache critical app shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[PWA ServiceWorker] Pre-cache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Smart caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Non-GET requests always bypass cache (real-time mutations)
  if (request.method !== 'GET') {
    return;
  }

  // 2. Real-time Firebase Database & P2P WebRTC signaling MUST NEVER be cached
  if (
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('googleapis.com') ||
    url.protocol === 'ws:' ||
    url.protocol === 'wss:' ||
    url.pathname.includes('/peerjs') ||
    url.pathname.includes('/trystero')
  ) {
    return;
  }

  // 3. For HTML navigation requests (app routes), try network first with offline fallback to index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedIndex = await cache.match('/index.html');
        return cachedIndex || fetch(request);
      })
    );
    return;
  }

  // 4. For static assets (CSS, JS, Fonts, Images), Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (url.origin === self.location.origin || url.hostname.includes('fonts.gstatic.com'))
          ) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If network fails and no cache, fallback gracefully
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// TakeAway Pro Service Worker
// Provides offline functionality and caching for better performance

const CACHE_NAME = 'takeaway-pro-v1.0.0';
const STATIC_CACHE_NAME = 'takeaway-pro-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'takeaway-pro-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/manifest.json',
  '/offline.html',
  // Add critical images here
  '/assets/images/icon-192x192.png',
  '/assets/images/icon-512x512.png'
];

// Files to cache dynamically
const DYNAMIC_FILES = [
  '/assets/images/',
  '/assets/fonts/'
];

// Network-first resources (always try network first)
const NETWORK_FIRST = [
  '/api/',
  '/_data/'
];

// Cache-first resources (serve from cache if available)
const CACHE_FIRST = [
  '/assets/css/',
  '/assets/js/',
  '/assets/images/',
  '/assets/fonts/'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests with different strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Handle different types of requests
  if (isNetworkFirst(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (isCacheFirst(request.url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Network-first strategy
function networkFirst(request) {
  return fetch(request)
    .then(response => {
      // Clone response for caching
      const responseClone = response.clone();
      
      // Cache successful responses
      if (response.status === 200) {
        caches.open(DYNAMIC_CACHE_NAME)
          .then(cache => cache.put(request, responseClone));
      }
      
      return response;
    })
    .catch(() => {
      // Fallback to cache
      return caches.match(request)
        .then(cachedResponse => {
          return cachedResponse || caches.match('/offline.html');
        });
    });
}

// Cache-first strategy
function cacheFirst(request) {
  return caches.match(request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Not in cache, fetch from network
      return fetch(request)
        .then(response => {
          // Clone response for caching
          const responseClone = response.clone();
          
          // Cache successful responses
          if (response.status === 200) {
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => cache.put(request, responseClone));
          }
          
          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
    });
}

// Stale-while-revalidate strategy
function staleWhileRevalidate(request) {
  return caches.match(request)
    .then(cachedResponse => {
      // Fetch from network in background
      const fetchPromise = fetch(request)
        .then(response => {
          // Clone response for caching
          const responseClone = response.clone();
          
          // Cache successful responses
          if (response.status === 200) {
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => cache.put(request, responseClone));
          }
          
          return response;
        });
      
      // Return cached version immediately, or wait for network
      return cachedResponse || fetchPromise;
    })
    .catch(() => {
      // Return offline page for navigation requests
      if (request.destination === 'document') {
        return caches.match('/offline.html');
      }
    });
}

// Helper functions
function isNetworkFirst(url) {
  return NETWORK_FIRST.some(pattern => url.includes(pattern));
}

function isCacheFirst(url) {
  return CACHE_FIRST.some(pattern => url.includes(pattern));
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline actions when connection is restored
  return Promise.resolve();
}

// Push notifications (if needed in future)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/images/icon-192x192.png',
      badge: '/assets/images/icon-96x96.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Visualizza',
          icon: '/assets/images/icon-96x96.png'
        },
        {
          action: 'close',
          title: 'Chiudi',
          icon: '/assets/images/icon-96x96.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle messages from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Loaded');


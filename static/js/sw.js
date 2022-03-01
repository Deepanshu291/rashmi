

const cacheName = 'GMC-v1';
const staticAssets = [
  './',
  './index.html',
  './main.js',
      './manifest.webmanifest',
      './mobile-style.css',
      './style.css',
      './sw.js',
      '../assets/favicon.png',
      '../assets/a1.jpg',
      '../assets/a2.jpg',
      '../assets/infra/main.jpg',
      '../assets/img.jpg',
      '../assets/img1.jpg',
      '../assets/img5.jpg',
      '../assets/img6.jpg',
      '../assets/img3.jpg',
      '../assets/img7.jpg',
      '../assets/infra/gmc4.jpg',
      '../assets/infra/gmc3.jpg',
      

];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
const CACHE_NAME = 'wallet-v6-cache';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  // 下一步我哋會將呢啲 Library 下載返嚟
  'chart.min.js',
  'tesseract.min.js'
];

// 安裝 Service Worker 並儲存檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 攔截請求：冇網就攞 Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

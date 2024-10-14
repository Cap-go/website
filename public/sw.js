self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request))
})

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('install', function (event) {
  console.log('on install...')
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      console.log('cache', cache)
      return cache.addAll([
        '/public/css/poole.css/'
      ])
    })
  );
})

self.addEventListener('activate', function (event) {
  console.log('on activate...')
})

self.addEventListener('fetch', function (event) {
  console.log('fetch...')
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})

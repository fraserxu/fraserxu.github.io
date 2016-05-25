var staticCacheName = 'static-v1'

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/public/css/lanyon.css',
        '/public/css/poole.css',
        '/public/css/syntax.css',
        'https://fonts.lug.ustc.edu.cn/css?family=PT+Serif:400,400italic,700%7CPT+Sans:400'
      ])
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('static-') &&
                 cacheName !== staticCacheName
        }).map(function (cacheName) {
          return caches.delete(cacheName)
        })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    console.log('skipWaiting...')
    self.skipWaiting()
  }
})

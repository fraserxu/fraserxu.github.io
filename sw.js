---

---

'use strict';

importScripts('public/js/serviceworker-cache-polyfill.js')

const CACHE_VERSION = '{{ site.time }}'
const staticCacheName = 'static-v' + CACHE_VERSION

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        {% for page in site.html_pages %}
          '{{ page.url }}',
        {% endfor %}
        '/public/css/lanyon.css',
        '/public/css/poole.css',
        '/public/css/syntax.css',
        '/public/js/index.js',
        '/public/js/serviceworker-cache-polyfill.js',
        {% for post in site.posts %}
          '{{ post.url }}',
        {% endfor %}
        '//fonts.lug.ustc.edu.cn/css?family=PT+Serif:400,400italic,700%7CPT+Sans:400',
      ])
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('static-v') &&
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

let CACHE_NAME = 'TESTCACHE'
let CACHE_LIST = [
  '/Archive/index.html',
  '/Archive/css/reset.css',
  '/Archive/css/style.css',
  '/Archive/js/index.js'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(CACHE_LIST)
      })
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        if (response) {
          return response
        }

        let _request = e.request.clone();

        return fetch(_request)
          .then(response => {
            if (!response || response.state !== 200) {
              return response;
            }
            let _response = response.clone()
            caches.open(CACHE_NAME)
              .then(cache => cache.put(e.request, _response))

            return response;
          })
      })
  )
})
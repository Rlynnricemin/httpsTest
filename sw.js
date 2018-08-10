let CACHE_NAME = 'TESTCACHE'
let pathname = '/httpsTest'
let CACHE_LIST = [
  '/index.html',
  '/css/reset.css',
  '/css/style.css',
  '/js/index.js'
]

CACHE_LIST = CACHE_LIST.map((item) => {
  return pathname + item
})

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
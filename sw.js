const CACHE_NAME = "ncsmini-v1";

const urlsToCache = [
    "/ncs-player/",
    "/ncs-player/index.html",
    "/ncs-player/style.css",
    "/ncs-player/script.js",
    "/ncs-player/manifest.json",
    "/ncs-player/assets/NCS.png",
    "/ncs-player/assets/NCS(white).jpg",
    "/ncs-player/assets/icon-192.png",
    "/ncs-player/assets/icon-512.png",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("Cache aberto!");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

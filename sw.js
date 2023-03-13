const version="v2023.03.13"

/**
 * service worker离线缓存配置
 */
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
    event.waitUntil(
        caches.open(version).then(function (cache) {
            return cache.addAll([
                '/h5-nav/',
                '/h5-nav/index.html',
                '/h5-nav/manifest.json',
                '/h5-nav/css/style.css',
                '/h5-nav/js/vue.min.js',
                '/h5-nav/js/data.js',
                '/h5-nav/img/navigation.png',
            ]);
        })
    );
});

/**
 * 缓存存储
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open(version).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function (e) {
                console.error('fetch error',e)
            });
        }
    }));
});
/**
 * 缓存更新
 */
self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([

            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== version) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
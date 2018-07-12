const files = require("./files");
const path = require('path');
let globDirectory, swDest, excludeFiles, globPattern, wapitisConfig;

const swbuilder = module.exports = {
    setOptions : (options) => {
        globDirectory = options.globDirectory;
        indexSrc = options.indexSrc;
        swDest = options.swDest;
        excludeFiles = options.excludeFiles;
        globPattern = options.globPattern;
        wapitisConfig = JSON.parse(files.readFileSync(globDirectory + "/wapitis.json", "utf8"));
    },

    registerServiceWorker : () => {
        return new Promise((resolve) => {
			const distFiles = files.getAllFiles(swDest, excludeFiles).allFiles;
            const targetFiles = distFiles.filter(function(file) {
                return path.extname(file).toLowerCase().match(globPattern);
            });
            let precacheFiles = ["./"];
            targetFiles.forEach((file) => precacheFiles.push(file.substring(swDest.length).split("\\").join("/")));
            let sw = `
    const PRECACHE = "precache-v" + $precache_version$;
    const RUNTIME = "runtime";
    // A list of local resources we always want to be cached.
    const PRECACHE_URLS = $precache_urls$;

    // The install handler takes care of precaching the resources we always need.
    self.addEventListener("install", event => {
        event.waitUntil(
            caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
        );
    });

    // The activate handler takes care of cleaning up old caches.
    self.addEventListener("activate", event => {
        const currentCaches = [PRECACHE, RUNTIME];
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
            }).then(cachesToDelete => {
                return Promise.all(cachesToDelete.map(cacheToDelete => {
                    console.log("Cache updated ! Refresh to see the new version.");
                    self.clients.matchAll().then((clients) => {
                        clients.forEach((client) => client.postMessage(JSON.parse(JSON.stringify({msg: "Cache updated"}))));
                    });
                    return caches.delete(cacheToDelete);
                }));
            }).then(() => self.clients.claim())
        );
    }); 

    // The fetch handler serves responses for same-origin resources from a cache.
    // If no response is found, it populates the runtime cache with the response
    // from the network before returning it to the page.
    self.addEventListener("fetch", event => {
        // Skip cross-origin requests, like those for Google Analytics.
        if (event.request.url.startsWith(self.location.origin)) {
            event.respondWith(
                caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
            
                    return caches.open(RUNTIME).then(cache => {
                        return fetch(event.request).then(response => {
                            // Put a copy of the response in the runtime cache.
                            return cache.put(event.request, response.clone()).then(() => {
                                return response;
                            });
                        });
                    });
                })
            );
        }
    });

    // Tester la présentation du bouton ...
    // https://developers.google.com/web/updates/2018/06/a2hs-updates : utiliser ça dans speedui
    // se servir de  https://github.com/wildhaber/offline-first-sw/blob/master/sw.js pour créer le service worker
    // window.addEventListener("beforeinstallprompt", (e) => {
    //     e.preventDefault();
    //     deferredPrompt = e;
    //     console.log
    //     // btnAdd.style.display = "block";
    // });`;
            sw = sw.replace("$precache_urls$", JSON.stringify(precacheFiles));
            wapitisConfig.cacheVersion = (wapitisConfig.cacheVersion || 0) + 1;
            sw = sw.replace("$precache_version$", wapitisConfig.cacheVersion );
            files.appendFile(globDirectory + "/wapitis.json", JSON.stringify(wapitisConfig, null, 2), true);
            files.appendFile(swDest + "/sw.js", sw, true);
            files.readFile(indexSrc + "/index.html", (err, html) => {
                if (err) throw err;
                html = html.replace("$headScripts$", '<link rel="manifest" href="manifest.json"/><script src="polyfills.js"></script>');
                html = html.replace("$bodyScript$", '<script>if ("serviceWorker" in navigator) {window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));}</script>');        
                files.appendFile(swDest + "/index.html", html, true).then(() => resolve());
            });
		});
    },

    unregisterServiceWorker : () => {
        return new Promise((resolve) => {
            const sw = `
    self.addEventListener("install", event => {
        event.waitUntil(
            caches.open("precache-v${wapitisConfig.cacheVersion}").then(self.skipWaiting())
        );
    });
    self.addEventListener("activate", event => {
        event.waitUntil(
            caches.keys().then(cachesToDelete => {
                return Promise.all(cachesToDelete.map(cacheToDelete => {
                    return caches.delete(cacheToDelete);
                }));
            }).then(() => self.clients.claim())
        );
    });`;
            files.appendFile(swDest + "/sw.js", sw, true);
            files.readFile(indexSrc + "/index.html", (err, html) => {
                if (err) throw err;
                html = html.replace("$headScripts$", "");
                html = html.replace("$bodyScript$", `<script>if ("serviceWorker" in navigator) {navigator.serviceWorker.getRegistrations().then((registration) => {if (registration.length) {window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").then((registration) => registration.unregister({immediate: true})));}});}</script>`);
                files.appendFile(swDest + "/index.html", html, true).then(() => resolve());                
                delete wapitisConfig["cacheVersion"];
                files.appendFile(globDirectory + "/wapitis.json", JSON.stringify(wapitisConfig, null, 2), true);
            });
        });
    }
};
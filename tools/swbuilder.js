const files = require("./files");
const path = require('path');
let globDirectory, swDest, excludeFiles, patterns, wapitisConfig;

const swbuilder = module.exports = {
    setOptions: (options) => {
        globDirectory = options.globDirectory;
        indexSrc = options.indexSrc;
        swDest = options.swDest;
        excludeFiles = options.excludeFiles;
        patterns = options.patterns;
        wapitisConfig = JSON.parse(files.readFileSync(globDirectory + "/wapitis.json", "utf8"));
    },

    registerServiceWorker: () => {
        return new Promise((resolve) => {
            // const distFiles = files.getAllFiles(swDest, excludeFiles).allFiles;

            // TODO peut etre un array d'array ??? cf plus bas
            const targetFiles = {}
            // let cacheCore = ["./"];
            // let cacheFonts = [];
            // let cacheAttachments = [];
            // let cacheImages = [];
            // let cacheVideos = [];
            Object.keys(patterns).forEach((name) => {
                const pattern = patterns[name]
                files.getAllFiles(swDest, excludeFiles).allFiles.forEach((file) => {
                    if (!targetFiles[name]) targetFiles[name] = name === 'core' ? ["./"] : []
                    // TODO en fait il faut juste garder targetFiles et il faut rendre automatique en fonction des caches déclarés puis
                    // TODO la mise à jour ou non va se faire sur l'étude des fichiers dans le swbuilder
                    // TODO avec fs.statSync .mtime je sais si la date du fichier je l'enregistre dans la config et si le fichier existe pas ou est changé je break et je sais que le cache doit etre mis à jour
                    targetFiles[name].push(path.extname(file).toLowerCase().match(pattern) && file.substring(swDest.length).split("\\").join("/"))
                })
            })
            // let cacheCore = ["./"];
            // let cacheFonts = [];
            // let cacheAttachments = [];
            // let cacheImages = [];
            // let cacheVideos = [];
            // targetFiles.forEach((file) => cacheCore.push(file.substring(swDest.length).split("\\").join("/")));
            let sw = `
const DEBUG = false;

const RUNTIME = 'runtime';
const VERSION = $cache_version$;
const CACHE_CORE = $cache_core_version$;
const CACHE_FONTS = $cache_fonts_version$;
const CACHE_ATTACHMENTS = $cache_attachments_version$;
const CACHE_IMAGES = $cache_images_version$;
const CACHE_VIDEOS = $cache_videos_version$;
const CURRENT_CACHES = [CACHE_CORE, CACHE_FONTS, CACHE_ATTACHMENTS, CACHE_IMAGES, CACHE_VIDEOS];

const CACHE_CORE_URLS = $cache_core_urls$;
const CACHE_FONTS_URLS = $cache_fonts_urls$;
const CACHE_ATTACHMENTS_URLS = $cache_attachments_urls$;
const CACHE_IMAGES_URLS = $cache_images_urls$;
const CACHE_VIDEOS_URLS = $cache_videos_urls$;
const CURRENT_CACHES_URLS = [CACHE_CORE_URLS, CACHE_FONTS_URLS, CACHE_ATTACHMENTS_URLS, CACHE_IMAGES_URLS, CACHE_VIDEOS_URLS];


/**
 * Installe le service worker, création de caches et enregistrement des fichiers
 */
self.addEventListener('install', (event) => event.waitUntil(installSW()));
async function installSW() {
    log('L\'installation du Service Worker a démarré');
    CURRENT_CACHES.forEach(async (cacheName, index) => {
        if (!cacheName.includes('no_cache')) {
            const cache = await caches.open(cacheName);
            await cache.addAll(CURRENT_CACHES_URLS[index]);
            return self.skipWaiting();
        }
    });
}


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
            sw = sw.replace("$precache_urls$", JSON.stringify(cacheCore));
            wapitisConfig.cacheVersion = (wapitisConfig.cacheVersion || 0) + 1;
            sw = sw.replace("$precache_version$", wapitisConfig.cacheVersion);
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

    unregisterServiceWorker: () => {
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
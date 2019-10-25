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
    },

    registerServiceWorker: () => {
        wapitisConfig = JSON.parse(files.readFileSync(globDirectory + "/wapitis.json", "utf8"));
        const cacheUrls = {}
        wapitisConfig.cacheVersion = wapitisConfig.cacheVersion || {}
        // TODO async ?
        return new Promise((resolve) => {
            Object.keys(patterns).forEach((name) => {
                const pattern = patterns[name]
                let isCacheVersionRegister = false
                files.getAllFiles(swDest, excludeFiles).allFiles.forEach((file) => {
                    if (!cacheUrls[name]) cacheUrls[name] = name === 'core' ? ["./"] : []
                    if (path.extname(file).toLowerCase().match(pattern)) {
                        cacheUrls[name].push(file.substring(swDest.length).split("\\").join("/"))
                        const fileName = path.basename(file).split('-')[1] || path.basename(file)
                        if ((wapitisConfig.filesInfos.update.includes(fileName) || name === 'core') && !isCacheVersionRegister) {
                            wapitisConfig.cacheVersion[name] = (wapitisConfig.cacheVersion[name] || 0) + 1
                            isCacheVersionRegister = true
                        }
                    }
                    // TODO une question se pose quand c fait en html - comment faire fonctionner ça dans ce cas et le prendre en compte
                })
            })
            let sw = `
const DEBUG = false;

const RUNTIME = 'runtime';
const DATE = '$date$';
const CACHES_VERSION = $caches_version$;
const CURRENT_CACHES_URLS = $current_caches_urls$;

/**
 * Installe le service worker, création de caches et enregistrement des fichiers
 */
self.addEventListener('install', (event) => event.waitUntil(installSW()));
async function installSW() {
    log('L\\'installation du Service Worker a démarré');
    Object.keys(CACHES_VERSION).forEach(async (cacheName) => {
        const cache = await caches.open(cacheName + '_' + CACHES_VERSION[cacheName]);
        await cache.addAll(CURRENT_CACHES_URLS[cacheName]);
        return self.skipWaiting();
    });
}

/**
 * Active le service worker. Lors de la mise à jour, ne supprime que les caches qui seront mis à jour
 */
self.addEventListener('activate', () => activateSW());
async function activateSW() {
    log('Service Worker activé');
    const currentCaches = [RUNTIME].concat(Object.keys(CACHES_VERSION).map((name) => name + '_' + CACHES_VERSION[name]));
    const cacheKeys = await caches.keys();
    cacheKeys.forEach((cacheKey) => {
        if (!currentCaches.includes(cacheKey)) {
            caches.delete(cacheKey);
        }
    });
    showNotification('Application activée et mise à jour', { body: 'L\\'application a été mise à jour! Veuillez rafraîchir la page.' });
    log('Le cache a été mis à jour! Veuillez rafraichir la page.');
}

/**
 * Renvoie les fichiers mis en cache. S'ils n'existent pas les met dans cache Runtime et les utilise
 */
self.addEventListener('fetch', (event) => event.respondWith(cacheThenNetwork(event)));
async function cacheThenNetwork(event) {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
        log('Cache : ' + event.request.url);
        return cachedResponse;
    }
    const runtimeCache = await caches.open(RUNTIME);
    const networkResponse = await fetch(event.request, { credentials: 'include', mode: 'no-cors' });
    await runtimeCache.put(event.request, networkResponse.clone())
    log('RUNTIME cache : ' + event.request.url);
    return networkResponse;
}

/**
 * Permet de faire des notifications via Push API (cf. https://developers.google.com/web/fundamentals/push-notifications/) -> use https://web-push-codelab.glitch.me/
 * Le message doit etre de la forme : {title: string, body?:string, data: {url?:string}}
 */
self.addEventListener('push', (event) => {
    const dataJSON = event.data.json();
    const notificationOptions = {
        body: dataJSON.body,
        data: {
            url: dataJSON.url,
        }
    };
    return showNotification(dataJSON.title, notificationOptions);
});
self.addEventListener('notificationclick', (event) => {
    const url =  event.notification.data && event.notification.data.url;
    if (url) {
        event.notification.close();
        event.waitUntil(clients.openWindow(url));
    }
});


/**
 * log si debug à true
 */
function log(message, ...data) {
    if (DEBUG) {
        if (data.length > 0) console.log(DATE, message, data);
        else console.log(DATE, message);
    }
}

/**
 * Affiche une notification locale simple
 */
function showNotification(title, datas = {}) {
    if (Notification.permission === "granted") {
        // datas.icon = $icon$;
        self.registration.showNotification(title, datas);
    }
}`;
            sw = sw.replace("$current_caches_urls$", JSON.stringify(cacheUrls))
            sw = sw.replace("$caches_version$", JSON.stringify(wapitisConfig.cacheVersion))
            sw = sw.replace("$date$", new Date().toLocaleString())
            files.appendFile(globDirectory + "/wapitis.json", JSON.stringify(wapitisConfig, null, 2), true);
            files.appendFile(swDest + "/sw.js", sw, true);
            // TODO ICI - reste à créer un bouton pour activer les notif + use node pour créer la key + icon dans sw notif
            files.readFile(indexSrc + "/index.html", (err, html) => {
                if (err) throw err;
                html = html.replace("$headScripts$", '<link rel="manifest" href="manifest.json"/><script src="polyfills.js"></script>');
                html = html.replace("$bodyScript$", `
<script>
const apiKey = null; // Clé à générer ? marche avec push
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function pushSubscribe(swRegistration) {
    if (apiKey && 'PushManager' in window) {
        const pushManager = swRegistration.pushManager;
        let subscription;
        try {
            subscription = await pushManager.subscribe({applicationServerKey: urlB64ToUint8Array(apiKey), userVisibleOnly: true});
            console.log("Clé de souscription :");
            console.log(JSON.stringify(subscription));
        } catch (error) {
            const oldSubscription = await pushManager.getSubscription();
            await oldSubscription.unsubscribe();
            pushSubscribe(swRegistration);
        }
    }
}

async function registerSW() {
    await navigator.serviceWorker.register("sw.js");
    const swRegistration = await navigator.serviceWorker.ready;
    pushSubscribe(swRegistration);
}

if ('serviceWorker' in navigator) {
    // Notification.requestPermission((permission) => {
    //     Notification.permission = permission;
    //     return permission;
    // });
    window.addEventListener("load", registerSW());
} else {
    console.warn('Le navigateur ne prend pas en charge les services workers ou les push manager');
}

// cf. https://developers.google.com/web/updates/2018/06/a2hs-updates
var installPromptEvent;
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    installPromptEvent = event;
    // Create button Install
    var buttonParent = document.querySelector(".installApp"),
        button;
    if (buttonParent) {
        button = buttonParent.querySelector("button");
    } else {
        // Add class to body
        document.body.classList.add('pwabutton_visible_true');
        buttonParent = document.createElement("div");
        document.createElement("div");
        buttonParent.className = "installApp";
        button = document.createElement("button");
        button.title = "Ajouter à l'écran d'accueil";
        button.innerHTML = "<span>Ajouter à l'écran d'accueil</span>";
        buttonParent.appendChild(button);
        document.body.insertBefore(buttonParent, document.body.firstChild);
    }
    button.addEventListener('click', () => {
        // Show the modal add to home screen dialog
        installPromptEvent.prompt();
        // Wait for the user to respond to the prompt
        installPromptEvent.userChoice.then((choice) => {
            if (choice.outcome === "accepted") {
                document.body.classList.remove('pwabutton_visible_true');
                button.parentElement.removeChild(button);
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            // Clear the saved prompt since it can't be used again
            installPromptEvent = null;
        });
    });
});
</script>
                `);
                files.appendFile(swDest + "/index.html", html, true).then(() => resolve());
            });
        });
    },

    unregisterServiceWorker: () => {
        wapitisConfig = JSON.parse(files.readFileSync(globDirectory + "/wapitis.json", "utf8"));
        return new Promise((resolve) => {
            const sw = `
const DEBUG = false;

/**
 * Désinstalle le service worker
 */
self.addEventListener('install', (event) => event.waitUntil(uninstallSW()));
async function uninstallSW() {
    log('La désinstallation du Service Worker a démarré');
    const cacheKeys = await caches.keys();
    cacheKeys.forEach(async (cacheName) => {
        await caches.open(cacheName);
        return self.skipWaiting();
    });
}
self.addEventListener('activate', () => desactivateSW());
async function desactivateSW() {
    log('Service Worker désactivé');
    const cacheKeys = await caches.keys();
    cacheKeys.map((cacheToDelete) => {
        caches.delete(cacheToDelete);
        return self.clients.claim()
    });
    showNotification('Application désactivée et désinstallée', { body: 'L\\'application a été désinstallée.' });
}

/**
 * log si debug à true
 */
function log(message, ...data) {
    if (DEBUG) {
        if (data.length > 0) console.log(DATE, message, data);
        else console.log(DATE, message);
    }
}

/**
 * Affiche une notification locale simple
 */
function showNotification(title, datas = {}) {
    if (Notification.permission === "granted") {
        // datas.icon = $icon$;
        self.registration.showNotification(title, datas);
    }
}`;
            files.appendFile(swDest + "/sw.js", sw, true);
            files.readFile(indexSrc + "/index.html", (err, html) => {
                if (err) throw err;
                html = html.replace("$headScripts$", "");
                html = html.replace("$bodyScript$", `
<script>
async function requireUnregister() {
    const registration = await navigator.serviceWorker.getRegistrations()
    if (registration.length) {
        window.addEventListener("load", unregisterSW())
    }
}

async function unregisterSW() {
    await navigator.serviceWorker.register("sw.js")
    const swRegistration = await navigator.serviceWorker.ready
    swRegistration.unregister({immediate: true})
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    // Notification.requestPermission((permission) => {
    //     Notification.permission = permission;
    //     return permission;
    // });
    requireUnregister()
} else {
    console.warn('Le navigateur ne prend pas en charge les services workers ou les push manager');
}
</script>`);
                files.appendFile(swDest + "/index.html", html, true).then(() => resolve());
                if (wapitisConfig.filesInfos) {
                    delete wapitisConfig.filesInfos.update;
                }
                files.appendFile(globDirectory + "/wapitis.json", JSON.stringify(wapitisConfig, null, 2), true);
            });
        });
    }
};
---
layout: default
title: Electron
nav_order: 4
parent: Développer
---

# Electron

Avec Wapitis, il est possible de créer une application electron

Pour lancer un test dans une app electron, il suffit d'appeler la ligne de commande

```bash
npx wapitis electron --dev
```

Une nouvelle fenetre s'ouvre alors contenant l'application electron vers le fichier index.html de la web app.

Par défaut certains éléments sont déclarés dans le fichier electronStart.ts, comme la déclaration des menus, l'appel du fichier index.html pour fonctionner en dev et en prod, la déclaration du splash et de la fenetre about et la liaison avec electron auto update pour permettre de proposer des mises à jour automatiques.

electronStart.ts contient toutes les déclarations nécessaires au bon fonctionnement de l'application electron et en est la porte d'entrée.

Tout peut évidemment être modifié en utilisant la documentation d'electron : [https://electronjs.org/docs](https://electronjs.org/docs)

Il est possible d'ajouter des fichiers dans le dossier electron (où l'on trouve le splash et le fichier about). Ces derniers seront alors automatiquement compiler dans l'application.

On trouve également un fichier index.js dans le dossier electron. Ce fichier permet d'ajouter des scripts dans l'index.html afin de modifier l'application et de faire la liaison avec les messages envoyés par elestronStart.ts

Exemple avec le menu a propos qui envoie le message suivant :

```typescript
win.webContents.send('show_about',
    {
        appVersion: app.getVersion(),
        chromeVersion: process.versions.chrome,
        electronVersion: process.versions.electron,
        nodeJsVersion: process.versions.node,
        v8Version: process.versions.v8
    }
)
```

Message récupéré dans l'index.js afin de créer la fenetre à propos permettant de voir les versions de l'application et des applications tiers
```javascript
ipcRenderer.on('show_about', (event, arg) => {
    const style = document.createElement('style')
    style.innerHTML = `.about {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.container {
    border-radius: 0.3125rem;
    box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.2), 0 0.0625rem 0.0625rem 0 rgba(0, 0, 0, 0.14), 0 0.125rem 0.0625rem -0.0625rem rgba(0, 0, 0, 0.12);
    width: 40rem;
    position: absolute;
    top: 10rem;
    left: 50%;
    margin-left: -20rem;
    text-align: center;
    background: #fff;
    padding: 0.5rem;
    font-family: monospace;
    font-weight: bold;
    user-select: none;
}

.background {
    background: #000;
    opacity: 0.6;
    width: 100%;
    height: 100%;
}

.credit {
    display: flex;
    justify-content: space-between;
}

.infos {
    padding: 0.5rem
}`
    document.head.appendChild(style)
    const about = document.createElement('div')
    about.classList.add('about')
    about.addEventListener("click", () => document.body.removeChild(about))
    const background = document.createElement('div')
    background.classList.add('background')
    about.appendChild(background)
    const container = document.createElement('div')
    container.classList.add('container')
    about.appendChild(container)
    container.innerHTML = `<img src="./about.png"/>
<div class="infos">
<div>Version : ${arg.appVersion}</div>
<div>Date : ${new Date().toLocaleDateString()}</div>
<div>Electron : ${arg.electronVersion}</div>
<div>Chrome : ${arg.chromeVersion}</div>
<div>Node.js : ${arg.nodeJsVersion}</div>
<div>V8 : ${arg.v8Version}</div>
</div>
<div class="credit">
<div>© 2019</div>
<div>Tous droits réservés.</div>
</div>`
    document.body.appendChild(about)
})
```

L'ensemble de la liaison entre electron et la web app peut être réalisé de cette façon ou en utilisant ce qui est proposé dans la documentation d'electron.

Lors de la modification des fichiers de la webapp il est inutile de relancer npx wapitis electron --dev, en revanche toutes modifications sur electronStart.ts nécessite de relancer la ligne de commande.

Le favicon.ico intégré dans le dossier www est utilisé comme icon pour l'application.
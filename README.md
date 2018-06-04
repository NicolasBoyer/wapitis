# WApiTis
**Attention** : En cours de création

> WebApp utiliTies pour typescript

## Features

- Générer une application web grâce à [FuseBox](https://fuse-box.org)
- Générer une application electron
- Fichiers d'entrée (main.tsx et electronStart.ts), tsconfig préconfigurés et structure www créés via l'initialisation
- Utilisation de jsx via l'import d'un fichier jsx.ts
- Divers fonctions disponibles grâce à l'import du fichier dom.ts
- Créer vos components via une ligne de commande (pour une bonne intégration dans tsconfig.json et faciliter les imports)
- Pré-intégration d'un service-worker, permettant à la web app de fontionner hors ligne (en cours d'amélioration)


## Install

    npm i wapitis -D

## Usages

- npm install
- Créer un dossier src
- npx wapitis init
- Utiliser wapitis **$ generate class path/du/fichier.ts(x)** pour générer vos fichiers
- Intégrer vos icons dans le fichiers icons.svg (exemple à intégrer en image)
- Intégrer vos css dans le fichier main.css
- Le point de départ est le dossier main.ts
- Modifier le fichier electronStart si besoin
- Coder avec [typescript](https://www.typescriptlang.org)
- Le dossier dist contient le résultat de la transpilation

<!-- - Préciser l'utilisation du dossier www
- Montrer exemple DOM + JSX
- Préciser que pas de babel et donc que chrome aujourd'hui
- ICON WAPITIS -->

### CLI

**$ npx wapitis** pour obtenir l'aide :

    $ npx wapitis init --> initialise la web app en créant les fichiers et les dossiers nécessaires

    $ npx wapitis dev --> lance la web app dans un serveur local

    $ npx wapitis prod --> web app pour la production

    $ npx wapitis electron --> lance la webApp dans electron avec un serveur local (--dev) ou pour la production(--prod)

    $ npx wapitis clear --> supprime le cache et le dossier dist

    $ wapitis generate class path/du/fichier.ts(x) --> génère un fichier relatif à src. tsConfig est mis à jour

### Typescript

```Typescript
import { DOM, JSX } from "wapitis";
```

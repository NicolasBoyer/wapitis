# WApiTis
**Attention** : En cours de création

> WebApp utiliTies pour typescript

## Features

- Générer une application web grâce à [FuseBox](https://fuse-box.org)
- Générer une application electron
- Fichiers d'entrée (main.tsx et electronStart.ts), tsconfig préconfigurés et structure www créés via l'initialisation

A venir :
- Utilisation de jsx via l'import d'un fichier jsx.ts
- Divers fonctions disponibles grâce à l'import du fichier dom.ts
- Créer vos components via une ligne de commande (pour une bonne intégration dans tsconfig.json et faciliter les imports)
- Pré-intégration d'un service-worker

## Install

    npm i wapitis -D

## Usages

- npm install
- Créer un dossier src
- npx wapitis init
- Coder avec [typescript](https://www.typescriptlang.org)
- Le dossier dist contient le résultat de la transpilation

### CLI

**$ npx wapitis** pour obtenir l'aide :

    $ npx wapitis init     --> initialise la web app en créant les fichiers et les dossiers nécessaires

    $ npx wapitis dev      --> lance la web app dans un serveur local

    $ npx wapitis prod     --> web app pour la production

    $ npx wapitis electron --> lance la web app dans electron avec un serveur local (--dev) ou pour la production(--prod)

    $ npx wapitis clear    --> supprime le cache et le dossier dist

### Typescript

```Typescript
import { DOM } from "dom";
import { JSX } from "jsx";
```

# WApiTis 2 - Documentation
![](ui/logo.png)

[Présentation de wapitis](https://github.com/NicolasBoyer/wapitis/blob/master/README.md)

## Install

    npm init
    npm i wapitis -D
    npx wapitis init

## CLI

**$ npx wapitis** pour obtenir l'aide :

    $ npx wapitis init --> initialise la web app en créant les fichiers et les dossiers nécessaires

    $ npx wapitis dev --> lance la web app dans un serveur local. --webapp pour générer service worker, manifest et polyfills

    $ npx wapitis prod --> web app pour la production

    $ npx wapitis electron --> lance la webApp dans electron avec un serveur local (--dev) ou pour la production(--prod)

    $ npx wapitis clear --> supprime le cache et le dossier dist

    $ wapitis generate class path/du/fichier.ts(x) --> génère une classe relatif à src. tsConfig est mis à jour

    $ wapitis generate component path/du/fichier.tsx --> génère un composant relatif à src. tsConfig est mis à jour

## Documentation

Pendant le développement, il est recommandé de lancer avant

```bash
npx wapitis dev
```

ou

```bash
npx wapitis electron --dev
```
permettant ainsi de mettre à jour ses modifications à la volée grâce au compileur et au watcher intégré

- [Pour commencer](./docs/pages/getstarted.md)
- [Développer - le component](./docs/pages/component.md)
- [Développer - les styles](./docs/pages/styles.md)
- [Développer - icons, images et font](./docs/pages/assets.md)
- [Développer - electron](./docs/pages/electron.md)
- [Développer - utilitaires](./docs/pages/utils.md)
- [Compiler](./docs/pages/compil.md)
- [API](./docs/api/index.html)

[a](./docs/api/modules/_component_.html)
[b](./docs/api/modules/_dom_.html)
[c](./docs/api/modules/_log_.html)
[d](./docs/api/modules/_shadowdom_.html)
[e](./docs/api/modules/_utils_.html)
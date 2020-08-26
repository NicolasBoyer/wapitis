---
layout: default
title: Changelog
nav_order: 6
---

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- ## [Unreleased] -->

## [2.1.40] - 2020-08-27
### Changed
- Update des différents package et passage en 2.1.32 beta.
- Update vers electron 10 et Typescript 4.
- Prise en compte eslint pour le composant généré lors de l'utilisation de la task `generate`.
- Prise en compte eslint pour `electronStart.ts` et migration associée.
- Correction orthographique sur le readme.

### Added
- Doc pour capacitor
- Ajout de [capacitor](https://capacitorjs.com/) en beta avec migration associée.
- Publication du package sur npm et gthub.

## [2.1.31] - 2020-08-07
### Todo
- Lancer `npx wapitis migr` afin de mettre à jour.

### Changed
- Ajout d'un fichier .eslintignore pour ignorer certains fichiers Javascript.

## [2.1.29] - 2020-08-05
### Todo
- Lancer `npx wapitis migr` afin de mettre à jour.

### Changed
- Remise en place style de doc suite aux changements de Just The Doc.
- Mise à jour des différentes dépendances npm.
- Prise en compte des changements de eslint dans le code et la doc : une migration est nécessaire - voir todo.

## [2.1.27] - 2020-07-27
### Changed
- Changement credit pour 2020 sur electron about.

## [2.1.26] - 2020-07-26
### Changed
- Précision sur l'utilisation des images dans l'aide avec la déclaration des modules dans `custom.d.ts`.

### Added
- Ajout de `forceUpdate`, permettant de forcer une mise à jour du composant.
- Ajout de `sulgify` et `generateIdFromString` dans `UTILS`.
- Suppression de la propriété resolve dans CopyPlugin lors de la création du bundle (cela créait un bug de path avec l'utilisation des fichiers externes).
- Mise à jour de l'aide.
- Update des différents packages utilisés.

## [2.1.25] - 2020-03-17
### Changed
- Correction d'un bug sur fromAttribute.

## [2.1.24] - 2020-03-17
### Added
- Ajout de fromAttribute dans la directiver @property, permettant de créer son propre convertisseur de l'attribut vers la propriété. Voir https://nicolasboyer.github.io/wapitis/docs/pages/component.html#la-directive-property.

## [2.1.23] - 2020-03-16
### Todo
- Lancer `npx wapitis migr` afin de mettre à jour.

### Changed
- Mise à jour de la doc.
- Amélioration eslint pour typescript et javascript.
- Fix et refactor eslint et migration.
- Readme : link to eslint + fix head.

### Added
- Ajout de `npx wapitis migr` permettant de lancer une migration des contenus si nécessaire.

## [2.1.9] - 2020-03-03
### Changed
- Amélioration règles eslint.
- Amélioration du fichier de création de component avec eslint.
- Migration et prise en compte eslint lors de l'init et ajout de typescript.

## [2.1.7] - 2020-02-28
### Added
- Ajout d'un CHANGELOG.md
- Gestion de readme via blueprint avec `@appnest/readme`.

### Changed
- Amélioration de l'extension [wapitis-plugin](https://marketplace.visualstudio.com/items?itemName=NicolasBoyer.wapitis-plugin) pour VSCode avec une complétion et des suggestions améliorées et une meilleure gestion des erreurs.
- La propriété `showInternalLog` de `component.tsx` a été passée en protected.
- Passage de tslint à eslint.
- Refactor du code suite au passage de tslint à eslint.
- Update electron, typescript et autres modules.
- Changement des scripts npm pour une meilleure intégration lors de `npm install` et `npm publish`.

## [2.1.6] - 2020-02-20
### Added
- Une nouvelle extension pour VSCode spécialisée pour Wapitis est conseillée : [wapitis-plugin](https://marketplace.visualstudio.com/items?itemName=NicolasBoyer.wapitis-plugin).

## [2.1.5] - 2020-02-05
### Removed
- Suppression de `reflectInAttribute`.

### Changed
- Transformation de `writeOnly` en `attribute` et **true** par défaut.

## [2.1.0] - 2020-01-27
### Changed
- Changement dans la création du composant. Il n'est plus utile d'appeler le composant avec une propriété générique !
La déclaration se fait maintenant de la manière suivante :

```typescript
...

@customElement('sui-box')
export class Box extends Component {

...
```

<!-- [Unreleased]: https://github.com/NicolasBoyer/wapitis/compare/2.1.31...HEAD -->
[2.1.40]: https://github.com/NicolasBoyer/wapitis/compare/2.1.31...2.1.40
[2.1.31]: https://github.com/NicolasBoyer/wapitis/compare/2.1.29...2.1.31
[2.1.29]: https://github.com/NicolasBoyer/wapitis/compare/2.1.27...2.1.29
[2.1.27]: https://github.com/NicolasBoyer/wapitis/compare/2.1.26...2.1.27
[2.1.26]: https://github.com/NicolasBoyer/wapitis/compare/2.1.25...2.1.26
[2.1.25]: https://github.com/NicolasBoyer/wapitis/compare/2.1.24...2.1.25
[2.1.24]: https://github.com/NicolasBoyer/wapitis/compare/2.1.23...2.1.24
[2.1.23]: https://github.com/NicolasBoyer/wapitis/compare/2.1.9...2.1.23
[2.1.9]: https://github.com/NicolasBoyer/wapitis/compare/2.1.7...2.1.9
[2.1.7]: https://github.com/NicolasBoyer/wapitis/compare/2.1.6...2.1.7
[2.1.6]: https://github.com/NicolasBoyer/wapitis/compare/2.1.5...2.1.6
[2.1.5]: https://github.com/NicolasBoyer/wapitis/compare/2.1.0...2.1.5
[2.1.0]: https://github.com/NicolasBoyer/wapitis/releases/tag/2.1.0
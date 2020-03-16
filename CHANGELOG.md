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

## [2.1.23] - 2020-03-16
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

<!-- [Unreleased]: https://github.com/NicolasBoyer/wapitis/compare/2.1.9...HEAD -->
[2.1.23]: https://github.com/NicolasBoyer/wapitis/compare/2.1.9...2.1.23
[2.1.9]: https://github.com/NicolasBoyer/wapitis/compare/2.1.7...2.1.9
[2.1.7]: https://github.com/NicolasBoyer/wapitis/compare/2.1.6...2.1.7
[2.1.6]: https://github.com/NicolasBoyer/wapitis/compare/2.1.5...2.1.6
[2.1.5]: https://github.com/NicolasBoyer/wapitis/compare/2.1.0...2.1.5
[2.1.0]: https://github.com/NicolasBoyer/wapitis/releases/tag/2.1.0
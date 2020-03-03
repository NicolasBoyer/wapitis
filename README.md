<p align="center">
  <img src="https://github.com/NicolasBoyer/wapitis/blob/master/ui/logo.png?raw=true" alt="Logo" width="auto" height="auto" />
</p>

<p align="center">
<a href="https://github.com/NicolasBoyer/wapitis/blob/master/CHANGELOG.md">CHANGELOG</a> / <a href="https://nicolasboyer.github.io/wapitis/">DOCUMENTATION</a>
</p>

> WebApp utiliTies est un set d'outils pour développer et compiler une application web avec ou sans client lourd. Il ne s'agit pas d'un framlework. Il ne contient pas de composants préexistants (cela sera l'objet d'un autre projet).
>
> L'idée est de faciliter la mise en oeuvre de composants grâce aux web components et à la surcouche qui y est apportée, et de rendre leur compilation plus simple.
>
> Afin de faciliter la compilation de cette application, des scripts en ligne de commanbde permettent très rapidement d'initialiser, de tester et de publier en production pour une sortie sur le Web ou dans une épplication packagée.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#technologies-utilises)

## 🠺 Technologies utilisées

Pour développer plus facilement et permettre une mise en place plus facile des composants, Wapitis utilise les [webcomponents](https://developer.mozilla.org/fr/docs/Web/Web_Components). Plus particulièrement une surcouche y est apportée ajoutant encore plus de simplicité.

Cette surcouche fonctionne un peu comme [LitElement](https://lit-element.polymer-project.org/). Au lieu d'étendre HTMLElement, le composant créé étend une classe de base appelé `Component` permettant:
- d'accéder simplement au cycle de vie du composant
- d'appliquer un style
- de créer des propriétés dynamiques ou non
- de mettre à jour le contenu

Le langage utilisé est [typescript](https://www.typescriptlang.org), permettant un contrôle plus poussée des types et des classes et une aide à la saisie facilitée.

Pour mettre à jour le contenu, Wapitis se base sur [lit-html](https://lit-html.polymer-project.org/) qui vous permet d'écrire des modèles HTML en JavaScript à l'aide de template et d'expressions JavaScript intégrées. lit-html identifie les parties statiques et dynamiques de vos modèles afin qu'il puisse mettre à jour efficacement uniquement les parties modifiées.

En utilisant lit-html, Wapitis met à jour le contenu dans des shadow DOM et ajoute une API pour gérer les propriétés et les attributs. Il est alors possible de décider quelles propriétés seront observées et les éléments sont alors mis à jour de façon asynchrone seulement à l'endroit où les propriétés changent ou interagissent avec le contenu.

Une librairie de fonctions est également disponible afin de permettre d'accéder rapidement aux différents éléments du DOM ou du shadow DOM.

Afin de faciliter la diffusion, Wapitis utilise [FuseBox](https://fuse-box.org) pour compiler rapidement des versions de dev ou de prod. Ajoutons à cela l'utilisation d'[electron](https://electronjs.org/) pour concevoir des applications sous forme de client lourd installable, le tout intégré de façon simple et facilement accessible.

L'utilisation des lignes de commandes permet ainsi d'accéder rapidement et facilement à toutes ces fonctions sans avoir besoin de configurer quoi que ce soit.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#disclaimer)

## 🠺 Disclaimer

Il existe d'autres librairies plus connues ou plus puissantes comme React ou LitElement, alors pourquoi Wapitis ?

Premièrement, de mon côté, cela me permet un contrôle sur tous les élements composants cet outil, qu'il s'agisse de ce que je veux intégrer et de comment cela est codé. D'autre part cela assure que ce qui est inclus est utile.

Enfin il s'agit d'un outil complet de création de WebApp, icluant tout ce qui est nécessaire, avec simplicité.

Afin de gérer correctement l'affichage de lit-html et typescript, j'utilise pour ma part [Visual Studio Code](https://code.visualstudio.com/) avec quelques plugins dont :
- [wapitis-plugin](https://marketplace.visualstudio.com/items?itemName=NicolasBoyer.wapitis-plugin)
- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

Lors de l'installation d'un executable via electron, windows a un avertissement lié à son application smart screen. Les seules solutions pour éviter cette avrtissement sont :
- signer l'application (ce qui coute de l'argent)
- ignorer cette alerte
- désactiver smart screen ;)

**TODO :**
- Intégration de [Capacitor](https://capacitor.ionicframework.com/)
- Gestion d'une liaison avec IndexedDB dans le Service Worker pour les données provenant d'une base de données

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#features)

## 🠺 Features

- Générer une application web grâce à [FuseBox](https://fuse-box.org)
- Générer une application [electron](https://electronjs.org/)
- Mise à jour asynchrone du DOM grâce à [lit-html](https://lit-html.polymer-project.org/)
- Utilisation possible de jsx via l'import d'un fichier jsx.ts
- Divers méthodes  disponibles grâce à l'import du fichier log.ts, dom.ts, shadowDom.ts et utils.ts
- Créer vos components et vos classes et générer votre application via des lignes de commande
- Surcouche des web components à travers une classe de base permettant de simplifier la mise à jour de contenus et l'accessibilité au cycle de vie et aux différentes méthodes
- Styler et surcharger les styles directement dans les composants
- Utilisation de SVG pour gérer les icons
- Pré-intégration d'un service-worker, permettant à la web app de fontionner hors ligne


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#license)

## 🠺 License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).

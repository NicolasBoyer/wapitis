---
layout: default
title: Compiler
nav_order: 4
---

# Compiler
{: .no_toc }

La compilation peut s'effectuer de différentes manières, en dev ou en prod, pour electron ou pour le web
{: .fs-6 .fw-300 }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Service Worker

Lors de la compilation en prod ou en dev avec --webapp pour le web, un service worker est généré. Ce dernier permet d'enregistrer dans le cache du navigateur les différents éléments composant la webapp, permettant ainsi de la consulter offline.

Comme vu lors de l'exemple TODO, il permet aussi d'accéder aux boutons donnant accès à l'installation en tant qu'application autonome et activant les notifications.

---

## Le manifest

Dans le dossier www, un fichier manifest.json est présent. Il est rempli par défaut, mais il est possible de le modifier :

```json
{
    "short_name": "NomDeLApp",
    "name": "NomDeLApp",
    "icons": [
        {
            "src": "/assets/icons/icons-192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "/assets/icons/icons-512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ],
    "start_url": "/",
    "background_color": "#FFFFFF",
    "display": "standalone",
    "scope": "/",
    "theme_color": "#317EFB"
}
```

Voir [https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/manifest.json](https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

Ce fichier est nécessaire pour permettre à la webapp de s'installer en tant qu'application autonome.

---

## Migrer les contenus
{: .d-inline-block }

New - 2.1.15
{: .label .label-purple }

```bash
npx wapitis migr
```

Cette ligne de commande permet de migrer les contenus lors du passage à une nouvelle version. Un message du type `Une migration est nécessaire, lancez npx wapitis migr` indique ce besoin lors du lancement d'une autre ligne de commande.

---

## Nettoyer

```bash
npx wapitis clear
```

Cette ligne de commande permet de supprimer le cache et de supprimer les éventuelles anciennes compilations.

---

## Générer des fichiers

Comme vu dans l'exemple TODO, pour générer les fichiers il est conseillé d'utiliser les lignes de commandes suivantes :

```bash
npx wapitis generate class path/du/fichier.ts(x)
```

et

```bash
npx wapitis generate component path/du/fichier.ts(x)
```

La première permet de créer une classe  contenant divers éléments par défaut.

La deuxième permet de créer un composant dérivant de component et contenant les divers éléments disponibles dans ce component. Il est vivement conseillé d'utiliser cette ligne de commande lors de la création d'un composant car des commentaires d'aide y sont apportés et la structure du component, ainsi que son cycle de vie, y sont disponibles par défaut.

---

## Compiler pour le WEB : dev et prod

En web, on peut compiler pour le dev :

```bash
npx wapitis dev
```

Cela permet d'accéder à un serveur en localhost à l'adresse suivante : http://localhost:4444/.

Toute modification est mise à jour automatiquement sans avoir à relancer la ligne de commande.

Si besoin de tester, on peut ajouter --webapp, qui permet de générer le service worker et les différents fichiers permettant le fonctionnement hors ligne de l'application. Attention toutefois, car dans ce cas la mise à jour automatique ne pourra plus être effective.

On peut également compiler pour la prod :

```bash
npx wapitis prod
```

Dans ce cas les fichiers sont alors rendus disponibles dans un dossier dist. Ces fichiers peuvent ensuite être envoyés sur un serveur.

Si les fichiers sont sur un git, il est également possible d'utiliser cette ligne de commande avec un service du type [netlify](https://www.netlify.com/)

---

## Compiler avec electron : dev, prod et publish

Comme vu précédemment, il est possible de générer et de tester une application dans electron avec :

```bash
npx wapitis electron --dev
```

Cela ouvre une fenêtre d'application electron contenant un lien vers la webapp.

Toute modification de la webapp met à jour automatiquement l'application.

Pour publier en prod une application de type electron, deux possibilités existent:

```bash
npx wapitis electron --prod
```

et

```bash
npx wapitis electron --publish
```

Dans le premier cas, on obtient un executable ou un fichier installable sous mac ou sous linux, qui peut ensuite être utilisé pour installer l'application.

Le deuxième est utile si les sources sont sur git. Cela permet alors d'obtenir des mises à jour automatique.

Pour ce faire, il est alors demandé de rentrer le provider et le personal access token permettant de donner accès aux sources (plus d'infos sur la procédure pour Github [ici](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line.)).

Une fois cela fait et le tout recompilé avec succès, il ne reste plus qu'à passer les sources en release sur votre git.
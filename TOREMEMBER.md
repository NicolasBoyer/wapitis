---
layout: default
title: NonUse
nav_exclude: true
---

# TOREMEMBER

- npm run transpile pour recompiler la librairie
- npm run doc pour recompiler la doc
- npm publish pour publier après avoir monter la version dans le package.json

- DOC :
  - on utilise https://pmarsceill.github.io/just-the-docs/docs/ -> https://github.com/pmarsceill/just-the-docs qui permet de  styler rapidement les .md pour gérer sa doc et la structure cf les .md dans docs/pages
  - l'api est générée avec typedoc npm run doc puis modifiée pour s'intégrer dans le style de la doc. Penser à récupérer les fichiers sauvegardés et à sauvegarder tout fichier modifié une fois recompilée l'api
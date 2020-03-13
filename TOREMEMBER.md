# TOREMEMBER

- npm run transpile pour recompiler la librairie
- npm run doc pour recompiler la doc
- npm publish pour publier après avoir monter la version dans le package.json

- DOC :
  - on utilise https://pmarsceill.github.io/just-the-docs/docs/ -> https://github.com/pmarsceill/just-the-docs qui permet de  styler rapidement les .md pour gérer sa doc et la structure cf les .md dans docs/pages
  - l'api est générée avec typedoc npm run doc puis modifiée pour s'intégrer dans le style de la doc. Penser à récupérer les fichiers sauvegardés et à sauvegarder tout fichier modifié une fois recompilée l'api
  - npx run doc pour générer la doc en s'assurant que la doc a bien été sauvegardé avant
  - Le theme cité plus haut est utilisé et juste déclaré dans _config.yml avec remote_theme. Il est customisé grâce au fichier _sass/custom/custom.scss (en létat couleur + code highlight).
  - La doc utilise github pages qui démarre sur index.md puis va chercher les éléments dans docs et est configuré directement sur github
  - ./docs contient la doc écrit à la main dans pages, l'api générée par typedoc et modifiée dans api et la copie de cette api pour éviter de la remplacer par inadvertance dans _apisave
  - La config se fait dans _config.yml et sur chaque fichier .md dans le bandeau du haut en utilisant les préconisations de https://jekyllrb.com/docs/configuration/ et la doc de https://pmarsceill.github.io/just-the-docs/docs/
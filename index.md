---
layout: default
title: Home
nav_order: 1
---

# WApiTis - Documentation
{: .fs-9 }

WebApp utiliTies est un set d'outils pour développer et compiler une application web avec ou sans client lourd.
{: .fs-6 .fw-300 }

[Commencer maintenant](./docs/pages/getstarted.md){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [Voir sur GitHub](https://github.com/NicolasBoyer/wapitis){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 } [Présentation](https://github.com/NicolasBoyer/wapitis/blob/master/README.md){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Install

    npm init
    npm i wapitis -D
    npx wapitis init

---

## CLI

**$ npx wapitis** pour obtenir l'aide :

    $ npx wapitis init --> initialise la web app en créant les fichiers et les dossiers nécessaires

    $ npx wapitis dev --> lance la web app dans un serveur local. --webapp pour générer service worker, manifest et polyfills

    $ npx wapitis prod --> web app pour la production

    $ npx wapitis electron --> lance la webApp dans electron avec un serveur local (--dev) ou pour la production(--prod)

    $ npx wapitis clear --> supprime le cache et le dossier dist

    $ wapitis generate class path/du/fichier.ts(x) --> génère une classe relatif à src. tsConfig est mis à jour

    $ wapitis generate component path/du/fichier.tsx --> génère un composant relatif à src. tsConfig est mis à jour

---

<form action="https://www.paypal.com/cgi-bin/webscr" style="text-align:center;" method="post" target="_top">
<input type="hidden" name="cmd" value="_donations" />
<input type="hidden" name="business" value="5CCGZ6XMY872Q" />
<input type="hidden" name="currency_code" value="EUR" />
<input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Bouton Faites un don avec PayPal" />
<img alt="" border="0" src="https://www.paypal.com/fr_FR/i/scr/pixel.gif" width="1" height="1" />
</form>
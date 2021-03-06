---
layout: default
title: Les styles
nav_order: 2
parent: Développer
---

# Style
{: .no_toc }

Dans wapitis, la gestion des CSS peut se faire de plusieurs façons.
{: .fs-6 .fw-300 }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Le fichier main.css

Le fichiers main.css permet de gérer les css du body et de tout ce qui n'est pas un composant.

---

## La propriété statique style

Chaque composant possède ses propres CSS.

Pour les créer, on utilise la propriété statique styles associée avec le tag CSS qui permet d'assurer un traitement sécurisé du texte passé en CSS.

```typescript
static get styles(): CSSResult {
    return css`
    :host {
        font-family: Arial, Helvetica, sans-serif;
        margin: auto;
        width: 25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    `
}
```

Dans cette propriété, toutes les balises du composant pourront être stylés directement et aucun style provenant d'un autre composant n'affectera ce composant.

Pour styler le composant lui même, le sélecteur ```:host()``` doit être utilisé. Pour styler des enfants à l'intérieur d'un slot on utilise ```::slotted(element)```

Il est également possible de surcharger des styles déclarés dans le composant parent en utilisant super.styles :

```typescript
static get styles(): CSSResult {
    const mainColor = css`red`
    return [
        super.styles,
        css`
        :host {
            display: block;
            text-align: center;
        }
        `
    ]
}
```

Ainsi on hérite des styles du composant parent. *Inutile dans le cas où on hérite direcement de Component*.

---

## Le chargement externe

Si on souhaite partager une css entre plusieurs composants, il est possible de le faire en déclarant directement dans la méthode render(), dans le tag html :

```typescript
render(): TemplateResult {
    return html`
        <link rel="stylesheet" href="styles/sharedCSS.css">

    ...
```

Dans ce cas, le fichier css devra être déclaré dans le dossier www/styles

Par ailleurs il faut également réaliser l'import de ce fichier en début de document :
```typescript
import '../www/styles/sharedCSS.css'
```

---

## Surcharge avec slot override

Si on veut surcharger les styles d'un composant existant que l'on est en train de déclarer, il est possible de le faire en utilisant les slots et en déclarant dans la méthode render le code suivant :

```typescript
render(): TemplateResult {
    return html`
    ...
        <style slot='override'>
            :host {
                background: pink;
            }
        </style>
    ...
```

---

## Utilisation des variables

Enfin pour s'approprier un composant graphiquement et si ces dernières ont bien été déclarées, il est possible d'utiliser les variables CSS.

L'utilisation est alors assez simple.

Lors de la création de l'élément, on écrira :

```typescript
static get styles(): CSSResult {
  return css`
    :host { color: var(--themeColor, black); }
  `;
}
```

Lors de l'appel de l'élément, pour surcharger la couleur noire, on écrira :

```html
<style>
  html {
    --themeColor: #123456;
  }
</style>
<my-element></my-element>
```

Voir [https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties)

Enfin toutes les directives proposées par lit-html sont disponibles dont : classMap et styleMap

cf [https://lit-html.polymer-project.org/guide/template-reference](https://lit-html.polymer-project.org/guide/template-reference)

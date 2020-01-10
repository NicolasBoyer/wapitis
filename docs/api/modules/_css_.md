---
layout: default
title: css
nav_order: 2
parent: API
has_children: true
---

## Index

### Functions

* [css](_css_.md#const-css)
* [unsafeCSS](_css_.md#const-unsafecss)

## Functions

### `Const` css

▸ **css**(`strings`: TemplateStringsArray, ...`values`: Array‹CSSResult | number›): *CSSResult‹›*

*Defined in [src/css.ts:106](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/css.ts#L106)*

Tag permettant d'insérer du CSS dans la propriété styles du composant. Exemple :
```typescript
static get styles() {
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
ou avec un array pour par exemple hériter des styles du parent :
```typescript
static get styles() {
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

**Parameters:**

| Name        | Type                           |
| ----------- | ------------------------------ |
| `strings`   | TemplateStringsArray           |
| `...values` | Array‹CSSResult &#124; number› |

**Returns:** *CSSResult‹›*

___

### `Const` unsafeCSS

▸ **unsafeCSS**(`value`: unknown): *CSSResult‹›*

*Defined in [src/css.ts:43](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/css.ts#L43)*

Permet d'insérer un champ de string qui n'est pas un CSSResult et n'a donc pas été traité par un tag CSS dans la string litteral inclus dans le tag CSS

A utiliser si nécessaire, mais passer de préférence par le tag css qui est plus sur

Exemple via le tag css :
```typescript
const mainColor = css`red`;
...
static get styles() {
   return css`
     div { color: ${mainColor} }
   `;
}
```
Exemple via le tag unsafeCSS :
```typescript
static get styles() {
   const mainColor = 'red';
   return css`
     div { color: ${unsafeCSS(mainColor)} }
   `;
 }
```

**Parameters:**

| Name    | Type    |
| ------- | ------- |
| `value` | unknown |

**Returns:** *CSSResult‹›*

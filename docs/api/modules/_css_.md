---
layout: default
title: css
nav_order: 2
parent: API
has_children: true
---

# css

## Index

<div style="width: 100%;max-width: 100%;margin-bottom: 1.5rem;border-radius: 4px;box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08);padding: .5rem .75rem;">
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Functions
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [css](_css_.md#const-css)
* [unsafeCSS](_css_.md#const-unsafecss)

</div>
</div>

---

## Functions

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Const` css
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **css**(`strings`: TemplateStringsArray, ...`values`: Array‹CSSResult | number›): *CSSResult‹›*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

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
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Const` unsafeCSS
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **unsafeCSS**(`value`: unknown): *CSSResult‹›*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

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
{: .mb-0 }

</td>
</tr>
</table>
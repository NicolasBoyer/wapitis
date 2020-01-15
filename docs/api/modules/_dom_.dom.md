---
layout: default
title: DOM
nav_order: 3
parent: API
---

# DOM

## Index

<div style="width: 100%;max-width: 100%;margin-bottom: 1.5rem;border-radius: 4px;box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08);padding: .5rem .75rem;">
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Functions
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [parseStyleToNumber](_dom_.dom.md#parsestyletonumber)
* [removeClassByPrefix](_dom_.dom.md#removeclassbyprefix)
* [setAttribute](_dom_.dom.md#setattribute)
* [setStyle](_dom_.dom.md#setstyle)

</div>
</div>

---

## Functions

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  parseStyleToNumber
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **parseStyleToNumber**(`style`: string \| null): *number*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/dom.ts:38](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/dom.ts#L38)*

Transforme un style en nombre

**Parameters:**

| Name    | Type               | Description            |
| ------- | ------------------ | ---------------------- |
| `style` | string &#124; null | Le style à transformer |

**Returns:** *number*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  removeClassByPrefix
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **removeClassByPrefix**(`element`: HTMLElement, `prefix`: string): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/dom.ts:48](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/dom.ts#L48)*

Supprime la classe contenant le préfix renseigné

**Parameters:**

| Name      | Type        | Description                                   |
| --------- | ----------- | --------------------------------------------- |
| `element` | HTMLElement | L'élément sur lequel la classe sera supprimée |
| `prefix`  | string      | Le préfix de la classe à supprimer            |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  setAttribute
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **setAttribute**(`element`: HTMLElement, `name`: string, `value`: any, `isStyle?`: boolean): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/dom.ts:13](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/dom.ts#L13)*

Assigne l'attribut spécifié et sa valeur à l'élément spécifié

**Parameters:**

| Name       | Type        | Description                                 |
| ---------- | ----------- | ------------------------------------------- |
| `element`  | HTMLElement | L'élément sur lequel l'attribut est affecté |
| `name`     | string      | Nom de l'attribut                           |
| `value`    | any         | Valeur de l'attribut                        |
| `isStyle?` | boolean     | Si true, ajoute en tant que que style       |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  setStyle
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **setStyle**(`element`: HTMLElement, `name`: string, `value`: string): *boolean*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/dom.ts:61](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/dom.ts#L61)*

Assigne la propriété renseignée dans le style si la valeur est différente

**Parameters:**

| Name      | Type        | Description                                |
| --------- | ----------- | ------------------------------------------ |
| `element` | HTMLElement | L'élément sur lequel le style est appliqué |
| `name`    | string      | Le nom du style à assigner                 |
| `value`   | string      | La valeur du style à assigner              |

**Returns:** *boolean*

Retourne true si le style est appliqué
{: .mb-0 }

</td>
</tr>
</table>
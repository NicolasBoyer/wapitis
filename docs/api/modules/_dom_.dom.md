---
layout: default
title: DOM
nav_order: 3
parent: API
---

# DOM

## Index

### Functions

* [parseStyleToNumber](_dom_.dom.md#parsestyletonumber)
* [removeClassByPrefix](_dom_.dom.md#removeclassbyprefix)
* [setAttribute](_dom_.dom.md#setattribute)
* [setStyle](_dom_.dom.md#setstyle)

## Functions

###  parseStyleToNumber

▸ **parseStyleToNumber**(`style`: string | null): *number*

*Defined in [src/dom.ts:38](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/dom.ts#L38)*

Transforme un style en nombre

**Parameters:**

| Name    | Type               | Description            |
| ------- | ------------------ | ---------------------- |
| `style` | string &#124; null | Le style à transformer |

**Returns:** *number*

___

###  removeClassByPrefix

▸ **removeClassByPrefix**(`element`: HTMLElement, `prefix`: string): *void*

*Defined in [src/dom.ts:48](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/dom.ts#L48)*

Supprime la classe contenant le préfix renseigné

**Parameters:**

| Name      | Type        | Description                                  |
| --------- | ----------- | -------------------------------------------- |
| `element` | HTMLElement | L'élément sur lequel la classe sera supprimé |
| `prefix`  | string      | Le préfix de la classe à supprimer           |

**Returns:** *void*

___

###  setAttribute

▸ **setAttribute**(`element`: HTMLElement, `name`: string, `value`: any, `isStyle?`: boolean): *void*

*Defined in [src/dom.ts:13](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/dom.ts#L13)*

Assigne l'attribut spécifié et sa valeur à l'élément spécifié

**Parameters:**

| Name       | Type        | Description                                 |
| ---------- | ----------- | ------------------------------------------- |
| `element`  | HTMLElement | L'élément sur lequel l'attribue est affecté |
| `name`     | string      | Nom de l'attribut                           |
| `value`    | any         | Valeur de l'attribut                        |
| `isStyle?` | boolean     | Si true, ajoute en tant que que style       |

**Returns:** *void*

___

###  setStyle

▸ **setStyle**(`element`: HTMLElement, `name`: string, `value`: string): *boolean*

*Defined in [src/dom.ts:61](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/dom.ts#L61)*

Assigne la propriété renseignée dans le style si la valeur est différente

**Parameters:**

| Name      | Type        | Description                             |
| --------- | ----------- | --------------------------------------- |
| `element` | HTMLElement | L'élément sur lequel appliquer le style |
| `name`    | string      | Le nom du style à assigner              |
| `value`   | string      | La valeur du style à assigner           |

**Returns:** *boolean*

Retourne true si le style est appliqué

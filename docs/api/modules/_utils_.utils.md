---
layout: default
title: UTILS
nav_order: 5
parent: API
---

# UTILS

## Index

<div style="width: 100%;max-width: 100%;margin-bottom: 1.5rem;border-radius: 4px;box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08);padding: .5rem .75rem;">
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Variables
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [propsToAttributes](_utils_.utils.md#propstoattributes)

</div>
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Functions
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [camelCaseToDashCase](_utils_.utils.md#camelcasetodashcase)
* [dashCaseToCamelCase](_utils_.utils.md#dashcasetocamelcase)
* [dispatchEvent](_utils_.utils.md#dispatchevent)
* [fromString](_utils_.utils.md#fromstring)
* [generateId](_utils_.utils.md#generateid)
* [getFile](_utils_.utils.md#getfile)
* [getWindowSize](_utils_.utils.md#getwindowsize)
* [load](_utils_.utils.md#load)
* [save](_utils_.utils.md#save)
* [toString](_utils_.utils.md#tostring)

</div>
</div>

---

## Variables

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  propsToAttributes
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

• **propsToAttributes**(`value`: unknown, `type?`: unknown): *(Anonymous function)*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:154](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L154)*

Directive transformant des propriétés de types objet `{ [key: string]: unknown }` en attribut compréhensible par lit-html et le tag html.

Cela est particulièrement utile dans le cas de données externes.

**@author** open-wc@ (open-wc). Adapdée à **Wapitis**

Comme toute directive, propsToAttributes est utilisé dans un tag html. Avec la syntaxe de lit-html, il est nécessaire de déclarer un attribut pour appliquer cette directive. Nous utilisons ici la convention `...=`, bien que n'importe quel nom d'attibut puisse être utilisé. Exemple :

```typescript
    html`
        <div ...="${propsToAttributes({ propertyA: 'a', propertyB: 'b' })}"></div>
    `
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`props` | { [key: string]: unknown } | Les propriétés à transformer |

**Returns:** *(Anonymous function)*
{: .mb-0 }

</td>
</tr>
</table>

---

## Functions

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  camelCaseToDashCase
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **camelCaseToDashCase**(`name`: any): *any*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:43](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L43)*

Transforme une chaîne du type camelCase en DashCase

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | any | Chaîne à transformer |

**Returns:** *any*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  dashCaseToCamelCase
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **dashCaseToCamelCase**(`name`: any): *any*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:53](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L53)*

Transforme une chaîne du type DashCase en camelCase

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | any | Chaîne à transformer |

**Returns:** *any*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  dispatchEvent
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **dispatchEvent**(`name`: string, `property`: object, `parent`: HTMLElement): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:73](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L73)*

Envoie un customEvent sur l'élément parent, avec les propriétés renseignées dans property

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`name` | string | - | Nom du custom Event |
`property` | object | - | Propriétés à envoyer |
`parent` | HTMLElement |  document.body | Elément sur lequel le custom event est envoyé, document.body par défaut  |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  fromString
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **fromString**(`value`: string \| null, `type?`: unknown): *any*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:13](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L13)*

Transforme une string dans le type renseigné

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string &#124; null | Chaîne à transformer |
`type?` | unknown | Type dans lequel transformer la chaîne : Boolean, Number, Object, Array, ... |

**Returns:** *any*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  generateId
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **generateId**(): *string*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:62](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L62)*

Retourne un id de type string

**Returns:** *string*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  getFile
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **getFile**(`url`: string): *Promise‹any›*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:103](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L103)*

Retourne le texte contenu dans le fichier spécifié de façon asynchrone

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`url` | string | Url du fichier à traiter |

**Returns:** *Promise‹any›*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  getWindowSize
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **getWindowSize**(): *object*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:83](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L83)*

Retourne la taille et la position de la fenêtre web courante

**Returns:** *object*

Retourne { width: number, height: number, top: number, left: number }
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  load
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **load**<**T**>(`key`: string): *T*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:132](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L132)*

Retourne les données spécifiées dans la clé en local storage

**Type parameters:**

▪ **T**

Le type des données à retourner

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | La clé à utiliser pour charger les données |

**Returns:** *T*

Retourne les données
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  save
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **save**<**T**>(`key`: string, `datas`: T): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:120](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L120)*

Enregistre les données dans la clé spécifiée en local storage

**Type parameters:**

▪ **T**

Le type des données à sauvegarder

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | La clé à utiliser pour sauvegarder les données |
`datas` | T | Les données à sauvegarder  |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  toString
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **toString**(`value`: unknown, `type?`: unknown): *unknown*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/utils.ts:33](https://github.com/NicolasBoyer/wapitis/blob/master/src/utils.ts#L33)*

Transforme une valeur du type renseigné en string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | unknown | La valeur à transformer en string |
`type?` | unknown | Type de la valeur à transformer : Boolean, Number, Object, Array, ... |

**Returns:** *unknown*
{: .mb-0 }

</td>
</tr>
</table>
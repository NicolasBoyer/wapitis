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

*Defined in [src/utils.ts:40](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L40)*

Transforme une chaine du type camelCase en DashCase

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

*Defined in [src/utils.ts:50](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L50)*

Transforme une chaine du type DashCase en camelCase

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

*Defined in [src/utils.ts:70](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L70)*

Envoie un customEvent sur l'élément parent, avec les propriétés renseignés dans property

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`name` | string | - | Nom du custom Event |
`property` | object | - | Propriétés à envoyer |
`parent` | HTMLElement |  document.body | Element sur lequel le custom event est envoyé, document.body par défaut  |

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

*Defined in [src/utils.ts:10](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L10)*

Transforme une string dans le type renseigné

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string &#124; null | Chaîne à transformer |
`type?` | unknown | Type dans lequel transformer la chaine : Boolean, Number, Object, Array, ... |

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

*Defined in [src/utils.ts:59](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L59)*

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

*Defined in [src/utils.ts:100](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L100)*

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

*Defined in [src/utils.ts:80](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L80)*

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

*Defined in [src/utils.ts:129](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L129)*

Retourne les données spécifié dans la clé en local storage

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

*Defined in [src/utils.ts:117](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L117)*

Enregistre les données dans la clé spécifié en local storage

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

*Defined in [src/utils.ts:30](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/utils.ts#L30)*

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
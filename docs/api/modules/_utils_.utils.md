[wapitis - v2.0.35](../README.md) › ["utils"](_utils_.md) › [UTILS](_utils_.utils.md)

# Module: UTILS

## Index

### Functions

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

## Functions

###  camelCaseToDashCase

▸ **camelCaseToDashCase**(`name`: any): *any*

*Defined in [src/utils.ts:40](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L40)*

Transforme une chaine du type camelCase en DashCase

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | any | Chaîne à transformer |

**Returns:** *any*

___

###  dashCaseToCamelCase

▸ **dashCaseToCamelCase**(`name`: any): *any*

*Defined in [src/utils.ts:50](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L50)*

Transforme une chaine du type DashCase en camelCase

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | any | Chaîne à transformer |

**Returns:** *any*

___

###  dispatchEvent

▸ **dispatchEvent**(`name`: string, `property`: object, `parent`: HTMLElement): *void*

*Defined in [src/utils.ts:70](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L70)*

Envoie un customEvent sur l'élément parent, avec les propriétés renseignés dans property

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`name` | string | - | Nom du custom Event |
`property` | object | - | Propriétés à envoyer |
`parent` | HTMLElement |  document.body | Element sur lequel le custom event est envoyé, document.body par défaut  |

**Returns:** *void*

___

###  fromString

▸ **fromString**(`value`: string | null, `type?`: unknown): *any*

*Defined in [src/utils.ts:10](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L10)*

Transforme une string dans le type renseigné

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string &#124; null | Chaîne à transformer |
`type?` | unknown | Type dans lequel transformer la chaine : Boolean, Number, Object, Array, ... |

**Returns:** *any*

___

###  generateId

▸ **generateId**(): *string*

*Defined in [src/utils.ts:59](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L59)*

Retourne un id de type string

**Returns:** *string*

___

###  getFile

▸ **getFile**(`url`: string): *Promise‹any›*

*Defined in [src/utils.ts:100](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L100)*

Retourne le texte contenu dans le fichier spécifié de façon asynchrone

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`url` | string | Url du fichier à traiter |

**Returns:** *Promise‹any›*

___

###  getWindowSize

▸ **getWindowSize**(): *object*

*Defined in [src/utils.ts:80](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L80)*

Retourne la taille et la position de la fenêtre web courante

**Returns:** *object*

Retourne { width: number, height: number, top: number, left: number }

___

###  load

▸ **load**<**T**>(`key`: string): *T*

*Defined in [src/utils.ts:129](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L129)*

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

___

###  save

▸ **save**<**T**>(`key`: string, `datas`: T): *void*

*Defined in [src/utils.ts:117](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L117)*

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

___

###  toString

▸ **toString**(`value`: unknown, `type?`: unknown): *unknown*

*Defined in [src/utils.ts:30](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/utils.ts#L30)*

Transforme une valeur du type renseigné en string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | unknown | La valeur à transformer en string |
`type?` | unknown | Type de la valeur à transformer : Boolean, Number, Object, Array, ... |

**Returns:** *unknown*

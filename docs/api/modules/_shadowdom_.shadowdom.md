[wapitis - v2.0.35](../README.md) › ["shadowDom"](_shadowdom_.md) › [SHADOWDOM](_shadowdom_.shadowdom.md)

# Module: SHADOWDOM

## Index

### Functions

* [deepClosestElement](_shadowdom_.shadowdom.md#deepclosestelement)
* [findAssignedElementBySlotName](_shadowdom_.shadowdom.md#findassignedelementbyslotname)
* [findAssignedElements](_shadowdom_.shadowdom.md#findassignedelements)
* [findDeepActiveElement](_shadowdom_.shadowdom.md#finddeepactiveelement)
* [findDocumentOrShadowRoot](_shadowdom_.shadowdom.md#finddocumentorshadowroot)
* [findHost](_shadowdom_.shadowdom.md#findhost)
* [querySelectorAllDeep](_shadowdom_.shadowdom.md#queryselectoralldeep)
* [querySelectorDeep](_shadowdom_.shadowdom.md#queryselectordeep)

## Functions

###  deepClosestElement

▸ **deepClosestElement**(`selector`: string, `base`: Element): *Element*

*Defined in [src/shadowDom.ts:33](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/shadowDom.ts#L33)*

Retourne le parent, incluant la balise <slot> dans la chaine

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | string | Le parent le plus proche à célectionner |
`base` | Element | L'élément sur lequel est effectuée la recherche |

**Returns:** *Element*

___

###  findAssignedElementBySlotName

▸ **findAssignedElementBySlotName**(`from`: Element, `slotName`: string): *Element | Element[]*

*Defined in [src/shadowDom.ts:80](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/shadowDom.ts#L80)*

Retrouve le ou les éléments assignés dans le slotName

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | Element | l'élément sur lequel la recherche est effectuée |
`slotName` | string | Le nom du slot recherché |

**Returns:** *Element | Element[]*

___

###  findAssignedElements

▸ **findAssignedElements**(`from`: Element): *Element[]*

*Defined in [src/shadowDom.ts:65](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/shadowDom.ts#L65)*

Retrouve tous les éléments assignés dans les slot de l'élément courant

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | Element | L'élément sur lequle est effectuée la recherche |

**Returns:** *Element[]*

Retourne un tableau avec les éléments retrouvés

___

###  findDeepActiveElement

▸ **findDeepActiveElement**(`from?`: DocumentOrShadowRoot): *Element*

*Defined in [src/shadowDom.ts:53](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/shadowDom.ts#L53)*

Retrouve l'activeElement en pénétrant tous les shadowDOM

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from?` | DocumentOrShadowRoot | Le shadowroot sur lequel la recherche est effectuée ou le document |

**Returns:** *Element*

___

###  findDocumentOrShadowRoot

▸ **findDocumentOrShadowRoot**(`from`: Node): *Document | ShadowRoot*

*Defined in [src/shadowDom.ts:21](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/shadowDom.ts#L21)*

Retrouve le premier DocumentOrShadowRoot ancêtre d'un noeud

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | Node | Noeud sur lequel la recherche est effectuée |

**Returns:** *Document | ShadowRoot*

Retourne le premier shadowroot ancêtre ou le Document

___

###  findHost

▸ **findHost**<**T**>(`from`: Node): *T*

*Defined in [src/shadowDom.ts:10](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/shadowDom.ts#L10)*

Retrouve le host du shadowTree de ce noeud

**Type parameters:**

▪ **T**: *Element*

Type générique de l'host recherché

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | Node | Noeud sur lequel on cherche le host |

**Returns:** *T*

Retourne le host de type T

___

###  querySelectorAllDeep

▸ **querySelectorAllDeep**(`selector`: string, `root`: Element | Document): *Element[]*

*Defined in [src/shadowDom.ts:93](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/shadowDom.ts#L93)*

Retrouve les éléments spécifiés dans le selector en fonction du root ou du document

**`author`** Georgegriff@ (George Griffiths). License Apache-2.0. Adapdée à Typescript

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`selector` | string | - | Le sélecteur de recherche |
`root` | Element &#124; Document |  document | L'élément sur lequel la recherche est effectuée ou le document |

**Returns:** *Element[]*

___

###  querySelectorDeep

▸ **querySelectorDeep**(`selector`: string, `root`: Element | Document): *Element*

*Defined in [src/shadowDom.ts:106](https://github.com/NicolasBoyer/wapitis/blob/4592d80/src/shadowDom.ts#L106)*

Retrouve l'élément spécifié dans le selector en fonction du root ou du document

**`author`** Georgegriff@ (George Griffiths). License Apache-2.0. Adapdée à Typescript

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`selector` | string | - | Le sélecteur de recherche |
`root` | Element &#124; Document |  document | L'élément sur lequel la recherche est effectuée ou le document |

**Returns:** *Element*

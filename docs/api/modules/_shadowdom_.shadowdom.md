---
layout: default
title: SHADOWDOM
nav_order: 5
parent: API
---

# SHADOWDOM

## Index

<div style="width: 100%;max-width: 100%;margin-bottom: 1.5rem;border-radius: 4px;box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08);padding: .5rem .75rem;">
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Functions
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [deepClosestElement](_shadowdom_.shadowdom.md#deepclosestelement)
* [findAssignedElementBySlotName](_shadowdom_.shadowdom.md#findassignedelementbyslotname)
* [findAssignedElements](_shadowdom_.shadowdom.md#findassignedelements)
* [findDeepActiveElement](_shadowdom_.shadowdom.md#finddeepactiveelement)
* [findDocumentOrShadowRoot](_shadowdom_.shadowdom.md#finddocumentorshadowroot)
* [findHost](_shadowdom_.shadowdom.md#findhost)
* [querySelectorAllDeep](_shadowdom_.shadowdom.md#queryselectoralldeep)
* [querySelectorDeep](_shadowdom_.shadowdom.md#queryselectordeep)

</div>
</div>

---

## Functions

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  deepClosestElement
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **deepClosestElement**(`selector`: string, `base`: Element): *Element*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/shadowDom.ts:33](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/shadowDom.ts#L33)*

Retourne le parent, incluant la balise <slot> dans la chaine

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | string | Le parent le plus proche à célectionner |
`base` | Element | L'élément sur lequel est effectuée la recherche |

**Returns:** *Element*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  findAssignedElementBySlotName
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **findAssignedElementBySlotName**(`from`: Element, `slotName`: string): *Element | Element[]*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/shadowDom.ts:80](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/shadowDom.ts#L80)*

Retrouve le ou les éléments assignés dans le slotName

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | Element | l'élément sur lequel la recherche est effectuée |
`slotName` | string | Le nom du slot recherché |

**Returns:** *Element | Element[]*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  findAssignedElements
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **findAssignedElements**(`from`: Element): *Element[]*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/shadowDom.ts:65](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/shadowDom.ts#L65)*

Retrouve tous les éléments assignés dans les slot de l'élément courant

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | Element | L'élément sur lequle est effectuée la recherche |

**Returns:** *Element[]*

Retourne un tableau avec les éléments retrouvés
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  findDeepActiveElement
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **findDeepActiveElement**(`from?`: DocumentOrShadowRoot): *Element*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/shadowDom.ts:53](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/shadowDom.ts#L53)*

Retrouve l'activeElement en pénétrant tous les shadowDOM

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from?` | DocumentOrShadowRoot | Le shadowroot sur lequel la recherche est effectuée ou le document |

**Returns:** *Element*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  findDocumentOrShadowRoot
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **findDocumentOrShadowRoot**(`from`: Node): *Document | ShadowRoot*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/shadowDom.ts:21](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/shadowDom.ts#L21)*

Retrouve le premier DocumentOrShadowRoot ancêtre d'un noeud

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | Node | Noeud sur lequel la recherche est effectuée |

**Returns:** *Document | ShadowRoot*

Retourne le premier shadowroot ancêtre ou le Document
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  findHost
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **findHost**<**T**>(`from`: Node): *T*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/shadowDom.ts:10](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/shadowDom.ts#L10)*

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
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  querySelectorAllDeep
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **querySelectorAllDeep**(`selector`: string, `root`: Element | Document): *Element[]*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/shadowDom.ts:93](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/shadowDom.ts#L93)*

Retrouve les éléments spécifiés dans le selector en fonction du root ou du document

**`author`** Georgegriff@ (George Griffiths). License Apache-2.0. Adapdée à Typescript

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`selector` | string | - | Le sélecteur de recherche |
`root` | Element &#124; Document |  document | L'élément sur lequel la recherche est effectuée ou le document |

**Returns:** *Element[]*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  querySelectorDeep
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **querySelectorDeep**(`selector`: string, `root`: Element | Document): *Element*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/shadowDom.ts:106](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/shadowDom.ts#L106)*

Retrouve l'élément spécifié dans le selector en fonction du root ou du document

**`author`** Georgegriff@ (George Griffiths). License Apache-2.0. Adapdée à Typescript

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`selector` | string | - | Le sélecteur de recherche |
`root` | Element &#124; Document |  document | L'élément sur lequel la recherche est effectuée ou le document |

**Returns:** *Element*

{: .mb-0 }

</td>
</tr>
</table>
---
layout: default
title: Component
nav_order: 1
grand_parent: API
parent: component
---

# Component

Classe qui étend HTMLElement et qui associée à la directive @customElement permet la création d'un customElement

___

## Hierarchy

HTMLElement
↳ **Component**

___

## Index

<div style="width: 100%;max-width: 100%;margin-bottom: 1.5rem;border-radius: 4px;box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08);padding: .5rem .75rem;">
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Constructors
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [constructor](_component_.component.md#constructor)

</div>
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Properties
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [\_props](_component_.component.md#protected-props)
* [showInternalLog](_component_.component.md#protected-showinternallog)
* [styles](_component_.component.md#static-optional-styles)

</div>
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Accessors
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [observedAttributes](_component_.component.md#static-observedattributes)

</div>
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Methods
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [attributeChangedCallback](_component_.component.md#attributechangedcallback)
* [beforeRender](_component_.component.md#protected-beforerender)
* [connectedCallback](_component_.component.md#connectedcallback)
* [disconnectedCallback](_component_.component.md#disconnectedcallback)
* [forceUpdate](_component_.component.md#forceupdate)
* [firstUpdated](_component_.component.md#protected-firstupdated)
* [render](_component_.component.md#protected-render)
* [shouldUpdate](_component_.component.md#protected-shouldupdate)
* [updated](_component_.component.md#protected-updated)
* [createProperty](_component_.component.md#static-createproperty)

</div>
</div>

___

## Constructors

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  constructor
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

\+ **new Component**(`options?`: Record<string, unknown>): *[Component](_component_.component.md)*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:218](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L218)*

Crée une instance de Component

**Parameters:**

| Name       | Type                    | Description                                                                                                                             |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `options?` | Record<string, unknown> | Paramètre de type `{{ [x: string]: unknown }}`, utile aux éditeurs pour la création de la classe sous la forme new Component({options}) |

**Returns:** *[Component](_component_.component.md)*

Retourne le composant avec le nom définit par la directive customElement.
{: .mb-0 }

</td>
</tr>
</table>

___

## Properties

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Protected` _props
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

• **_props**: *any*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:200](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L200)*

Propriété qui permet de définir les attributs lors de l'utilisation de cette classe avec [[JSX]]
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Protected` showInternalLog
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

• **showInternalLog**: *boolean* = false
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:92](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L92)*

Si true, les logs spécifiés dans le composant Component sont publiés. False par défaut
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` `Optional` styles
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▪ **styles**? : *CSSResult \| CSSResultArray*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:135](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L135)*

Permet de déclarer les styles en utilisant le tag css, exemple :
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
{: .mb-0 }

</td>
</tr>
</table>

___

## Accessors

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` observedAttributes
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

• **get observedAttributes**(): *string[]*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:100](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L100)*

Spécifique au web component. Permet de déclarer les propriétés qui seront observées et provoqueront un nouveau rendu via [render](_component_.component.md#protected-render) et le rappel de [attributeChangedCallback](_component_.component.md#attributechangedcallback)

Inutile d'utiliser cette méthode. Elle est appelé automatiquement grâce à la directive @property

**Returns:** *string[]*

Retourne un tableau contenant les noms des attributs que vous voulez observer
{: .mb-0 }

</td>
</tr>
</table>

___

## Methods

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  attributeChangedCallback
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **attributeChangedCallback**(`attrName`: string, `oldVal`: unknown, `newVal`: unknown): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:259](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L259)*

Spécifique au web component. Si la nouvelle valeur de l'attribut observé est différente de l'ancienne, l'attribut est alors affecté comme propriété. La méthode [render](_component_.component.md#protected-render) est par conséquent relancée

**Parameters:**

| Name       | Type    | Description                   |
| ---------- | ------- | ----------------------------- |
| `attrName` | string  | Nom de l'attribut             |
| `oldVal`   | unknown | Ancienne valeur de l'attribut |
| `newVal`   | unknown | Nouvelle valeur de l'attribut |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Protected` beforeRender
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **beforeRender**(`_changedProperties`: [PropertyValues](../modules/_component_.md#propertyvalues)): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:294](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L294)*

Appelé avant le rendu du composant. Permet d'interagir avec les éléments à chaque appel du composant avant sa création dans le dom

**Parameters:**

| Name                 | Type                                                       |
| -------------------- | ---------------------------------------------------------- |
| `_changedProperties` | [PropertyValues](../modules/_component_.md#propertyvalues) |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  connectedCallback
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **connectedCallback**(): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:234](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L234)*

Spécifique au web component. Appelé lorsque l'élément personnalisé est connecté pour la première fois au DOM du document

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  disconnectedCallback
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **disconnectedCallback**(): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:248](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L248)*

Spécifique au web component. Appelé lorsque l'élément personnalisé est déconnecté du DOM du document

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

###  forceUpdate
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **forceUpdate**(): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:271](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L271)*

Force le composant à relancer la methode [render](_component_.component.md#protected-render) et donc une mise à jour du template html. Utile si on souhaite mettre à jour le composant sans modifier une propriété observable

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Protected` firstUpdated
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **firstUpdated**(`_changedProperties`: [PropertyValues](../modules/_component_.md#propertyvalues)): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:331](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L331)*

Appelé lors de la première mise à jour du composant

Utile pour réaliser des actions qui ne doivent avoir lieu qu'une fois, comme la récupération des différents éléments rendus dans la méthode [render](_component_.component.md#protected-render), en utilisant les méthodes existantes dans les librairies [DOM](../modules/_dom_.dom.md) et [SHADOWDOM](../modules/_shadowdom_.shadowdom.md) de WAPITIS ou l'API DOM. Par exemple avec querySelector et la propriété shadowRoot :
``` typescript
  this._input = this.shadowRoot!.querySelector('input')
```

**Parameters:**

| Name                 | Type                                                       |
| -------------------- | ---------------------------------------------------------- |
| `_changedProperties` | [PropertyValues](../modules/_component_.md#propertyvalues) |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Protected` render
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **render**(): *TemplateResult \| void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:306](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L306)*

Permet de créer le composant dans le DOM grâce au tag html de lit-html

**Returns:** *TemplateResult \| void*

Retourne un TemplateResult qui est ensuite interprété et permet la mise à jour du DOM
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Protected` shouldUpdate
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **shouldUpdate**(`_changedProperties`: [PropertyValues](../modules/_component_.md#propertyvalues)): *boolean*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:282](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L282)*

Permet de conditionner le rendu du composant

[render](_component_.component.md#protected-render) est appelé si la fonction retourne true. Ce qui est le comportement par défaut

**Parameters:**

| Name                 | Type                                                       |
| -------------------- | ---------------------------------------------------------- |
| `_changedProperties` | [PropertyValues](../modules/_component_.md#propertyvalues) |

**Returns:** *boolean*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Protected` updated
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **updated**(`_changedProperties`: [PropertyValues](../modules/_component_.md#propertyvalues)): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:315](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L315)*

Appelé lors de chaque mise à jour du composant

Permet de réaliser des tâches après le rendu du composant à chaque appel en utilisant l'API DOM ou les librairies [DOM](../modules/_dom_.dom.md) et [SHADOWDOM](../modules/_shadowdom_.shadowdom.md), par exemple pour le focus d'un élément

**Parameters:**

| Name                 | Type                                                       |
| -------------------- | ---------------------------------------------------------- |
| `_changedProperties` | [PropertyValues](../modules/_component_.md#propertyvalues) |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` createProperty
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **createProperty**(`name`: PropertyKey, `options?`: [IPropertyOptions](../interfaces/_component_.ipropertyoptions.md)): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:146](https://github.com/NicolasBoyer/wapitis/blob/master/src/component.tsx#L146)*

Crée une propriété avec son setter et son getter et définit, grâce aux options, si elle est observable et l'ajoute en tant qu'attribut, le cas échéant

Lors de la création, demande une update et la lance si aucune autre demande n'est en cours. Ce qui amène ensuite à relancer la méthode [render](_component_.component.md#protected-render)

Il n'est ni necessaire ni recommandé d'utiliser cette méthode qui est appelée via la directive @property

**Parameters:**

| Name       | Type                                                              | Description         |
| ---------- | ----------------------------------------------------------------- | ------------------- |
| `name`     | PropertyKey                                                       | Nom de la propriété |
| `options?` | [IPropertyOptions](../interfaces/_component_.ipropertyoptions.md) | -                   |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>
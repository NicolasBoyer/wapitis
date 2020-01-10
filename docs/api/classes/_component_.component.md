---
layout: default
title: Component
nav_order: 1
grand_parent: API
parent: component
---

# Component

Classe qui étend HTMLElement et qui associée à la directive @customElement permet la création d'un customElement

## Type parameters

▪ **T**

Type générique de la classe définit grâce à la directive customElement

## Hierarchy

* HTMLElement

  ↳ **Component**

## Index

### Constructors

* [constructor](_component_.component.md#constructor)

### Properties

* [_props](_component_.component.md#protected-_props)
* [HTMLElement](_component_.component.md#static-htmlelement)
* [styles](_component_.component.md#static-optional-styles)

### Accessors

* [observedAttributes](_component_.component.md#static-observedattributes)

### Methods

* [attributeChangedCallback](_component_.component.md#attributechangedcallback)
* [beforeRender](_component_.component.md#protected-beforerender)
* [connectedCallback](_component_.component.md#connectedcallback)
* [disconnectedCallback](_component_.component.md#disconnectedcallback)
* [firstUpdated](_component_.component.md#protected-firstupdated)
* [render](_component_.component.md#protected-render)
* [shouldUpdate](_component_.component.md#protected-shouldupdate)
* [updated](_component_.component.md#protected-updated)
* [createProperty](_component_.component.md#static-createproperty)

## Constructors

###  constructor

\+ **new Component**(`options?`: T): *[Component](_component_.component.md)*

*Defined in [src/component.tsx:182](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L182)*

Crée une instance de Component

**Parameters:**

| Name       | Type | Description                                                                                                                                                                                                                           |
| ---------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options?` | T    | Paramètre de type {{ [x: string]: any }}, nécessaire pour la création de la classe sous la forme new({options})  Une fois appelées, les propriétés sont automatiquement prises en compte, si elles ont été déclarées sur le composant |

**Returns:** *[Component](_component_.component.md)*

Retourne le composant avec le nom définit par la directive customElement.

## Properties

### `Protected` _props

• **_props**: *T*

*Defined in [src/component.tsx:174](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L174)*

Propriété qui permet de définir les attributs lors de l'utilisation de cette classe avec [[JSX]]

___

### `Static` HTMLElement

▪ **HTMLElement**: *object*

Defined in node_modules/typescript/lib/lib.dom.d.ts:6717

#### Type declaration:

___

### `Static` `Optional` styles

▪ **styles**? : *CSSResult | CSSResultArray*

*Defined in [src/component.tsx:117](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L117)*

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

## Accessors

### `Static` observedAttributes

• **get observedAttributes**(): *string[]*

*Defined in [src/component.tsx:96](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L96)*

Spécifique au web component. Permet de déclarer les propriétés qui seront observés et provoqueront un nouveau rendu via [render](_component_.component.md#protected-render) et le rappel de [attributeChangedCallback](_component_.component.md#attributechangedcallback)

Inutile d'utiliser cette méthode. Elle est appelé automatiquement grâce à la directive @property

**Returns:** *string[]*

Retourne un tableau contenant les noms des attributs que vous voulez observer

## Methods

###  attributeChangedCallback

▸ **attributeChangedCallback**(`attrName`: string, `oldVal`: any, `newVal`: any): *void*

*Defined in [src/component.tsx:231](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L231)*

Spécifique au web component. Si la nouvelle valeur de l'attribut observé est différent de l'ancienne, l'attribut est alords affecté comme propriété. La méthode [render](_component_.component.md#protected-render) est par conséquent relancée

**Parameters:**

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| `attrName` | string | Nom de l'attribut             |
| `oldVal`   | any    | Ancienne valeur de l'attribut |
| `newVal`   | any    | Nouvelle valeur de l'attribut |

**Returns:** *void*

___

### `Protected` beforeRender

▸ **beforeRender**(`_changedProperties`: [PropertyValues](../modules/_component_.md#propertyvalues)): *void*

*Defined in [src/component.tsx:258](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L258)*

Appelé avant le rendu du composant. Permet d'interagir avec les éléments à chaque appel du composant avant sa création dans le dom.

**Parameters:**

| | | | Name                                                                 | Type                                                                                                                                                                                                                         | Description |
| -----| -----| -----| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| | | | `_changedProperties` | [PropertyValues](../modules/_component_.md#propertyvalues) |                                           |

**Returns:** *void*

___

###  connectedCallback

▸ **connectedCallback**(): *void*

*Defined in [src/component.tsx:208](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L208)*

Spécifique au web component. Appelé lorsque l'élément personnalisé est connecté pour la première fois au DOM du document

**Returns:** *void*

___

###  disconnectedCallback

▸ **disconnectedCallback**(): *void*

*Defined in [src/component.tsx:220](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L220)*

Spécifique au web component. Appelé lorsque l'élément personnalisé est déconnecté du DOM du document

**Returns:** *void*

___

### `Protected` firstUpdated

▸ **firstUpdated**(`_changedProperties`: [PropertyValues](../modules/_component_.md#propertyvalues)): *void*

*Defined in [src/component.tsx:293](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L293)*

Appelé lors de la première mise à jour du composant

Utile pour réaliser des actions qui ne doivent avoir lieu qu'une fois, comme la récupération des différents éléments rendu dans la méthode [render](_component_.component.md#protected-render)

En utilisant les methodes existantes dans les librairies [DOM](../modules/_dom_.dom.md) et [SHADOWDOM](../modules/_shadowdom_.shadowdom.md) de WAPITIS ou l'API DOM, par exemple avec querySelector et la propriété shadowRoot :
``` typescript
  this._input = this.shadowRoot!.querySelector('input')
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_changedProperties` | [PropertyValues](../modules/_component_.md#propertyvalues) |   |

**Returns:** *void*

___

### `Protected` render

▸ **render**(): *TemplateResult | void*

*Defined in [src/component.tsx:268](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L268)*

Permet de créer le composant dans le DOM grâce au tag html de lit-html.

**Returns:** *TemplateResult | void*

Retourne un TemplateResult qui est ensuite interprété et permet la mise à jour du DOM

___

### `Protected` shouldUpdate

▸ **shouldUpdate**(`_changedProperties`: [PropertyValues](../modules/_component_.md#propertyvalues)): *boolean*

*Defined in [src/component.tsx:248](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L248)*

Permet de conditionner le rendu du composant.

[render](_component_.component.md#protected-render) est appelé si la fonction retourne true. Ce qui est le comportement par défaut.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_changedProperties` | [PropertyValues](../modules/_component_.md#propertyvalues) |   |

**Returns:** *boolean*

___

### `Protected` updated

▸ **updated**(`_changedProperties`: [PropertyValues](../modules/_component_.md#propertyvalues)): *void*

*Defined in [src/component.tsx:277](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L277)*

Appelé lors de chaque mise à jour du composant

Permet de réaliser des tâches après le rendu du composant à chaque appel en utilisant l'API DOM ou les librairies [DOM](../modules/_dom_.dom.md) et [SHADOWDOM](../modules/_shadowdom_.shadowdom.md), par exemple pour le focus d'un élément

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_changedProperties` | [PropertyValues](../modules/_component_.md#propertyvalues) |   |

**Returns:** *void*

___

### `Static` createProperty

▸ **createProperty**(`name`: PropertyKey, `options?`: [IPropertyOptions](../interfaces/_component_.ipropertyoptions.md)): *void*

*Defined in [src/component.tsx:128](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L128)*

Crée une propriété avec son setter et son getter et définit grâce aux options, si elle est observable et l'ajoute en tant qu'attribut, le cas échéant

Lors de la création, demande une update et la lance si aucune autre demande n'est en cours. Ce qui amène ensuite à relancer la méthode [render](_component_.component.md#protected-render)

Il n'est ni necessaire ni recommandé d'utiliser cette méthode qui est appelé via la directive @property

**Parameters:**

| Name       | Type                                                              | Description         |
| ---------- | ----------------------------------------------------------------- | ------------------- |
| `name`     | PropertyKey                                                       | Nom de la propriété |
| `options?` | [IPropertyOptions](../interfaces/_component_.ipropertyoptions.md) | -                   |

**Returns:** *void*

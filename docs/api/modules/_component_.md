---
layout: default
title: component
nav_order: 1
parent: API
has_children: true
---

# component

## Index

| Classes                                                           |
| [Component](../classes/_component_.component.md)                  |
| Interfaces                                                        |
| [IPropertyOptions](../interfaces/_component_.ipropertyoptions.md) |
| Type aliases                                                      |
| [PropertyValues](_component_.md#propertyvalues)                   |
| Directive Functions                                               |
| [customElement](_component_.md#customelement) [property](_component_.md#property) |

## Type aliases

###  PropertyValues

Ƭ **PropertyValues**: *Map‹PropertyKey, object›*

*Defined in [src/component.tsx:80](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L80)*

Définit les paramètres des methodes du cycle de vie de Component

Il s'agit d'une map définit avec l'entrée PropertyKey et la valeur { oldVal: unknown, newVal: unknown } :
- oldVal Ancienne valeur de la propriété
- newVal Nouvelle valeur de la propriété

Map<PropertyKey, { oldVal: unknown, newVal: unknown }>

## Directive Functions

###  customElement

▸ **customElement**(`tagName?`: string): *(Anonymous function)*

*Defined in [src/component.tsx:18](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L18)*

La directive @customElement permet de créer le nom du composant et de le déclarer comme WebComponent.

Elle se place au dessus du nom de la classe. Exemple :
```typescript
@customElement('w-todo')
export default class Todo extends Component<IProps> {
```

**Parameters:**

| Name       | Type   | Description                                                                                                      |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| `tagName?` | string | Nom du custom element. Si aucun tagName n'est spécifié, il prend alors le nom ```x-${type.name.toLowerCase()}``` |

**Returns:** *(Anonymous function)*

Retourne le custom element T avec le nom tagName

___

###  property

▸ **property**(`options?`: [IPropertyOptions](../interfaces/_component_.ipropertyoptions.md)): *(Anonymous function)*

*Defined in [src/component.tsx:62](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L62)*

La directive @property rend la propriété observable et dynamique. La propriété est aussi accessible lors de la création de la classe via new Class() et intégrée à l'interface : IProps

Elle se place à gauche du nom de la propriété. Exemple :
```typescript
@property({ type: Boolean }) checked: boolean = false
```

**Parameters:**

| Name       | Type                                                              |
| ---------- | ----------------------------------------------------------------- |
| `options?` | [IPropertyOptions](../interfaces/_component_.ipropertyoptions.md) |

**Returns:** *(Anonymous function)*

Retourne la propriété observable

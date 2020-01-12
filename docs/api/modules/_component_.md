---
layout: default
title: component
nav_order: 1
parent: API
has_children: true
---

# component

## Index


<div style="width: 100%;max-width: 100%;margin-bottom: 1.5rem;border-radius: 4px;box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08);padding: .5rem .75rem;">
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Classes
</div>
<div style="margin-top: 0.5rem;">
<a href="../classes/_component_.component.html">Component</a>
</div>
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Classes
</div>
<div style="margin-top: 0.5rem;">
<a href="../interfaces/_component_.ipropertyoptions.html">IPropertyOptions</a>
</div>
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Type aliases
</div>
<div style="margin-top: 0.5rem;">
<a href="_component_.html#propertyvalues">PropertyValues</a>
</div>
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Directive Functions
</div>
<div style="margin-top: 0.5rem;">
<a href="_component_.html#customelement">@customElement</a> | <a href="_component_.html#property">@property</a>
</div>
</div>

## Type aliases

<table style="padding: 0.5rem;">
<tr>
<td>
<h3 style="margin:0;">PropertyValues</h3>
</td>
</tr>
<tr>
<td>Ƭ <strong>PropertyValues</strong>: <em>Map‹PropertyKey, object›</em></td>
</tr>
<tr>
<td>
<div style="font-style:italic;margin-bottom:0.5em;">Defined in <a href="https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L80">src/component.tsx:80</a></div>
<div style="margin-bottom:0.5em;">Définit les paramètres des methodes du cycle de vie de Component</div>
<div style="margin-bottom:0.5em;">Il s'agit d'une map définit avec l'entrée PropertyKey et la valeur { oldVal: unknown, newVal: unknown } :
<ul>
<li>oldVal Ancienne valeur de la propriété</li>
<li>newVal Nouvelle valeur de la propriété</li>
</ul>
<div>Map<PropertyKey, { oldVal: unknown, newVal: unknown }></div></div>
</td>
</tr>
</table>

| PropertyValues|
|:-------------|
| Ƭ **PropertyValues**: *Map‹PropertyKey, object›*|
| *Defined in [src/component.tsx:80](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L80)*<br><br>Définit les paramètres des methodes du cycle de vie de Component<br><br>Il s'agit d'une map définit avec l'entrée PropertyKey et la valeur { oldVal: unknown, newVal: unknown } :<br>&bull; oldVal Ancienne valeur de la propriété<br>&bull; newVal Nouvelle valeur de la propriété<br><br>Map<PropertyKey, { oldVal: unknown, newVal: unknown }>|

| PropertyValues|
|:-------------|
| Ƭ **PropertyValues**: *Map‹PropertyKey, object›*|
| *Defined in [src/component.tsx:80](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L80)*<br><br>Définit les paramètres des methodes du cycle de vie de Component<br><br>Il s'agit d'une map définit avec l'entrée PropertyKey et la valeur { oldVal: unknown, newVal: unknown } :<ul><li>oldVal Ancienne valeur de la propriété</li><li>newVal Nouvelle valeur de la propriété</li></ul>Map<PropertyKey, { oldVal: unknown, newVal: unknown }>|

<!-- ###  PropertyValues

Ƭ **PropertyValues**: *Map‹PropertyKey, object›*

*Defined in [src/component.tsx:80](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L80)*

Définit les paramètres des methodes du cycle de vie de Component

Il s'agit d'une map définit avec l'entrée PropertyKey et la valeur { oldVal: unknown, newVal: unknown } :
- oldVal Ancienne valeur de la propriété
- newVal Nouvelle valeur de la propriété

Map<PropertyKey, { oldVal: unknown, newVal: unknown }> -->

## Directive Functions

###  @customElement

▸ **@customElement**(`tagName?`: string): *(Anonymous function)*

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

###  @property

▸ **@property**(`options?`: [IPropertyOptions](../interfaces/_component_.ipropertyoptions.md)): *(Anonymous function)*

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

---
layout: default
title: IPropertyOptions
nav_order: 2
grand_parent: API
parent: component
---

# IPropertyOptions

Paramètres de la directive @property. Trois options possibles :
- type : indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (string par défaut)
- reflectInAttribute : la propriété est transformée en attribut, de camelCase vers dashCase (true par défaut) et est observable
- writeOnly : propriété observable non visible dans l'html rendu mais possible de la créer en html ou en javascript (false par défaut)

## Hierarchy

* **IPropertyOptions**

## Index

### Properties

* [reflectInAttribute](_component_.ipropertyoptions.md#optional-reflectinattribute)
* [type](_component_.ipropertyoptions.md#optional-type)
* [writeOnly](_component_.ipropertyoptions.md#optional-writeonly)

## Properties

### `Optional` reflectInAttribute

• **reflectInAttribute**? : *boolean*

*Defined in [src/component.tsx:44](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L44)*

La propriété est transformée en attribut, de camelCase vers dashCase (true par défaut) et est observable

___

### `Optional` type

• **type**? : *object | string | number | boolean | unknown*

*Defined in [src/component.tsx:40](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L40)*

Indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (string par défaut)

___

### `Optional` writeOnly

• **writeOnly**? : *boolean*

*Defined in [src/component.tsx:48](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L48)*

Propriété observable non visible dans l'html rendu mais possible de la créer en html ou en javascript (false par défaut)

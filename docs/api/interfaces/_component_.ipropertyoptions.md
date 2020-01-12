---
layout: default
title: IPropertyOptions
nav_order: 2
grand_parent: API
parent: component
---

# IPropertyOptions

Paramètres de la directive @property

## Index


<div style="width: 100%;max-width: 100%;margin-bottom: 1.5rem;border-radius: 4px;box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08);padding: .5rem .75rem;">
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Properties
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [reflectInAttribute](_component_.ipropertyoptions.md#optional-reflectinattribute)
* [type](_component_.ipropertyoptions.md#optional-type)
* [writeOnly](_component_.ipropertyoptions.md#optional-writeonly)

</div>
</div>

___

## Properties

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Optional` reflectInAttribute
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

• **reflectInAttribute**? : *boolean*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:44](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L44)*

La propriété est transformée en attribut, de camelCase vers dashCase (true par défaut) et est observable
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Optional` type
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

• **type**? : *object \| string \| number \| boolean \| unknown*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:40](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L40)*

Indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (string par défaut)
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Optional` writeOnly
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

• **writeOnly**? : *boolean*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/component.tsx:48](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/component.tsx#L48)*

Propriété observable non visible dans l'html rendu mais possible de la créer en html ou en javascript (false par défaut)
{: .mb-0 }

</td>
</tr>
</table>

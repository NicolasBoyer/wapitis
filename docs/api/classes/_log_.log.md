---
layout: default
title: Log
nav_order: 4
parent: API
---

# Log

## Index
<div style="width: 100%;max-width: 100%;margin-bottom: 1.5rem;border-radius: 4px;box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08);padding: .5rem .75rem;">
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Properties
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [showDebugLog](_log_.log.md#static-showdebuglog)
* [showInfoLog](_log_.log.md#static-showinfolog)
* [showLog](_log_.log.md#static-showlog)
* [showWarnLog](_log_.log.md#static-showwarnlog)

</div>
<div style="font-weight:bold;padding: 1rem 0 .5rem;border-bottom: 1px solid rgba(238,235,238,0.5);">
Methods
</div>
<div style="margin-top: 0.5rem;" markdown="1">

* [debug](_log_.log.md#static-debug)
* [error](_log_.log.md#static-error)
* [info](_log_.log.md#static-info)
* [warn](_log_.log.md#static-warn)

</div>
</div>

---

## Properties

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` showDebugLog
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▪ **showDebugLog**: *boolean* = true
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/log.ts:16](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L16)*

Si false, les logs de type debug ne sont pas publiés. True par défaut

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` showInfoLog
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▪ **showInfoLog**: *boolean* = true
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/log.ts:11](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L11)*

Si false, les logs de type info ne sont pas publiés. True par défaut

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` showLog
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▪ **showLog**: *boolean* = true
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/log.ts:6](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L6)*

Si false, aucun log n'est publié à l'exception du log error. True par défaut

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` showWarnLog
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▪ **showWarnLog**: *boolean* = true
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/log.ts:21](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L21)*

Si false, les logs de type warning ne sont pas publiés. True par défaut

</td>
</tr>
</table>

___

## Methods

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` debug
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **debug**(`message`: string, ...`datas`: any[]): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/log.ts:41](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L41)*

Log de type debug avec le message renseigné et les données datas si elles existent

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Le message à afficher |
`...datas` | any[] | Les données envoyées et affichées  |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` error
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **error**(`message`: string, ...`datas`: any[]): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/log.ts:65](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L65)*

Log de type error (rouge sur fond rose) avec le message renseigné et les données datas si elles existent

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Le message à afficher |
`...datas` | any[] | Les données envoyées et affichées  |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` info
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **info**(`message`: string, ...`datas`: any[]): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/log.ts:29](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L29)*

Log classique avec le message renseigné et les données datas si elles existent

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Le message à afficher |
`...datas` | any[] | Les données envoyées et affichées  |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>

___

<table style="padding: 0.5rem;">
<tr>
<td markdown="1">

### `Static` warn
{: .m-0 }

</td>
</tr>
<tr>
<td markdown="1">

▸ **warn**(`message`: string, ...`datas`: any[]): *void*
{: .mb-0 }

</td>
</tr>
<tr>
<td markdown="1">

*Defined in [src/log.ts:53](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L53)*

Log de type warn (marron sur fond jaune) avec le message renseigné et les données datas si elles existent

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Le message à afficher |
`...datas` | any[] | Les données envoyées et affichées  |

**Returns:** *void*
{: .mb-0 }

</td>
</tr>
</table>
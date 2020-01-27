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

*Defined in [src/log.ts:19](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L19)*

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

*Defined in [src/log.ts:41](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L41)*

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

*Defined in [src/log.ts:9](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L9)*

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

*Defined in [src/log.ts:31](https://github.com/NicolasBoyer/wapitis/blob/master/src/log.ts#L31)*

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
---
layout: default
title: Log
nav_order: 4
parent: API
---

# Log

## Hierarchy

* **Log**

## Index

### Methods

* [debug](_log_.log.md#static-debug)
* [error](_log_.log.md#static-error)
* [info](_log_.log.md#static-info)
* [warn](_log_.log.md#static-warn)

## Methods

### `Static` debug

▸ **debug**(`message`: string, ...`datas`: any[]): *void*

*Defined in [src/log.ts:19](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/log.ts#L19)*

Log de type debug avec le message renseigné et les données datas si elles existent

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Le message à afficher |
`...datas` | any[] | Les données envoyées et affichées  |

**Returns:** *void*

___

### `Static` error

▸ **error**(`message`: string, ...`datas`: any[]): *void*

*Defined in [src/log.ts:41](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/log.ts#L41)*

Log de type error (rouge sur fond rose) avec le message renseigné et les données datas si elles existent

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Le message à afficher |
`...datas` | any[] | Les données envoyées et affichées  |

**Returns:** *void*

___

### `Static` info

▸ **info**(`message`: string, ...`datas`: any[]): *void*

*Defined in [src/log.ts:9](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/log.ts#L9)*

Log classique avec le message renseigné et les données datas si elles existent

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Le message à afficher |
`...datas` | any[] | Les données envoyées et affichées  |

**Returns:** *void*

___

### `Static` warn

▸ **warn**(`message`: string, ...`datas`: any[]): *void*

*Defined in [src/log.ts:31](https://github.com/NicolasBoyer/wapitis/blob/d619f93/src/log.ts#L31)*

Log de type warn (marron sur fond jaune) avec le message renseigné et les données datas si elles existent

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | string | Le message à afficher |
`...datas` | any[] | Les données envoyées et affichées  |

**Returns:** *void*

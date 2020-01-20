---
layout: default
title: Utilitaires
nav_order: 4
parent: Développer
---

# Utilitaires
{: .no_toc }

Afin de permettre d'accéder à certaines méthodes utiles, quatre modules ont été créés.
{: .fs-6 .fw-300 }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## UTILS

Contient différentes méthodes permettant de simplifier certaines actions, comme la génération d'id, la transformation entre différents types, l'envoie de customEvent, la sauvegarde en local storage ...

```typescript
    /** Transforme une string dans le type renseigné */
    function fromString(value: string | null, type?: unknown): any
    /** Transforme une valeur du type renseigné en string */
    function toString(value: unknown, type?: unknown): any
    /** Transforme une chaîne du type camelCase en DashCase */
    function camelCaseToDashCase(name): any
    /** Transforme une chaîne du type DashCase en camelCase */
    function dashCaseToCamelCase(name): any
    /** Retourne un id de type string */
    function generateId(): string
    /** Envoie un customEvent sur l'élément parent, avec les propriétés renseignées dans property */
    function dispatchEvent(name: string, property: object, parent: HTMLElement = document.body): void
    /** Retourne la taille et la position de la fenêtre web courante */
    function getWindowSize() : { width: number, height: number, top: number, left: number }
    /** Retourne le texte contenu dans le fichier spécifié de façon asynchrone */
    async function getFile(url: string): string
    /** Enregistre les données dans la clé spécifiée en local storage */
    function save<T>(key: string, datas: T): void
    /** Retourne les données spécifiées dans la clé en local storage */
    function load<T>(key: string): T
    /** Directive transformant des propriétés de types objet `{ [key: string]: unknown }` en attribut compréhensible par lit-html et le tag html */
    propsToAttributes(...props: { [key: string]: unknown }): void
```
---

## DOM

Contient des méthodes permettant de manipuler le dom

```typescript
    /** Assigne l'attribut spécifié et sa valeur à l'élément spécifié. Si isStyle, l'ajoute en tant que que style */
    function setAttribute(element: HTMLElement, name: string, value: any, isStyle?: boolean): void
    /** Transforme un style en nombre */
    function parseStyleToNumber(style: string): number
    /** Supprime la classe contenant le préfix renseigné */
    function removeClassByPrefix(element: HTMLElement, prefix: string): void
    /** Assigne la propriété renseignée dans le style si la valeur est différente. Retourne true dans ce cas */
    function setStyle(element: HTMLElement, name: string, value: string): boolean
    /** Crée un composant `tag` contenant les attributs et l'enfant passés en paramètres */
    function createComponent(tag: string, attributes?: { [key: string]: unknown }, children?: TemplateResult): TemplateResult
```

---

## SHADOWDOM

Contient des méthodes permettant de manipuler et de retrouver les shadowdom entre eux

```typescript
    /** Retrouve le host du shadowTree de ce noeud. */
    function findHost<T extends Element = Element>(from: Node): T
    /** Retrouve le 1er DocumentOrShadowRoot ancêtre d'un noeud. */
    function findDocumentOrShadowRoot(from: Node): Document | ShadowRoot
    /** Retourne le parent, incluant la balise <slot> dans la chaîne. */
    function deepClosestElement(selector: string, base: Element): Element
    /** Retrouve l'activeElement en pénétrant tous les shadowDOM. */
    function findDeepActiveElement(from?: DocumentOrShadowRoot): Element
    /** Retrouve tous les éléments assignés dans les slot de l'élément courant. */
    function findAssignedElements(from: Element): Element[]
    /** Retrouve le ou les éléments assignés dans le slotName. */
    function findAssignedElementBySlotName(from: Element, slotName: string): Element | Element[]
    /** Retrouve les éléments spécifiés dans le selector en fonction du root ou du document. */
    function querySelectorAllDeep(selector: string, root?: Element | Document): Element[]
    /** Retrouve l'élément spécifié dans le selector en fonction du root ou du document. */
    function querySelectorDeep(selector: string, root?: Element | Document): Element
```

---

## LOG

Permet de faire différents type de log dans la console JS

```typescript
    /** log classique avec le message renseigné et les données datas si elles existent. */
    function info(message: string, ...datas: any[]): void
    /** log de type debug avec le message renseigné et les données datas si elles existent. */
    function debug(message: string, ...datas: any[]): void
    /** log de type warn (marron sur fond jaune) avec le message renseigné et les données datas si elles existent. */
    function warn(message: string, ...datas: any[]): void
    /** log de type error (rouge sur fond rose) avec le message renseigné et les données datas si elles existent. */
    function error(message: string, ...datas: any[]): void
```

---

Il est également possible d'utiliser JSX en important le module JSX. Exemple :
```typescript
    import { JSX } from 'wapitis'
    ...
    document.body.appendChild(<div>Contenu</div>)
```
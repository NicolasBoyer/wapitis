---
layout: default
title: Le component
nav_order: 1
parent: Développer
---

# Le component
{: .no_toc }

Le composant intégré est comme nous l'avons vu la pierre angulaire du développement avec wapitis. Il permet de poser rapidement un web component en utilisant un langage simplifié, comme les directives intégrés ou son cycle de vie.
{: .fs-6 .fw-300 }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## La directive custom element

```typescript
@customElement('x-custom')
export default class Custom extends Component<IProps> {
```

permet de créer le nom du composant et de le déclarer comme WebComponent en deux lignes claires en début de fichier.

Il est obligatoire lors de la déclaration dans la directive d'avoir un nom sou la forme `prefixe-component`, en effet cela permet de le différencier des composants web intégrés et de le signaler comme custom element. Par convention le npm donné à la classe reprend en général le nom `Component` avec une majuscule mais cela n'est pas obligatoire.

La proprété générique IPROPS permet la déclaration des propriétés publiques, utilisées ensuite dans le constructeur et permettant la création du composant avec l'écriture `new Component(IPROPS)`

Pour pouvoir fonctionner, les propriétés doivent être déclarées dans l'interface IPROPS du composant :

```typescript
interface IProps {
    maVariable: string
}
```

Comme nous l'avons vu dans le composant TodoList, si on ne veux pas de propriétés il est possible de déclarer `{}`

Dans ce cas si on a besoin du constructeur, il prend la forme :

```typescript
constructor() {
    super()
}
```

---

## La directive property

En typescript, les propriétés peuvent être publiques, protected ou private. Avec Wapitis, pour rendre des propriétés observables, il faut utiliser la directive `@property`.

Par défaut, cela permet de rendre une propriété observable et de définir par la même occasion un attribut du composant que nous sommes en train de créer.

```typescript
@property() text: string
```

Le prefixe _ devant le nom permet de rendre la propriété protected tout en restant observable. Elle n'est alors plus déclarée en tant qu'attribut.

Il est possible de passer un objet en paramètre. Cet object peut contenir 3 paramètres:

- type : indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (string par défaut). Important pour préciser comment la conversion doit se faire entre la propriété et l'attribut (qui est obligatoirement un texte). Inutile dans le cas d'une propriété protected mais observable car aucune conversion n'est nécessaire.
- writeOnly : propriété observable non visible dans l'html 'rendu', mais il est possible de la créer en html ou en javascript (false par défaut)
- reflectInAttribute : la propriété est transformée en attribut, de camelCase vers dashCase (true par défaut) et est observable. Passer ce paramètre à false revient à créer une propriété publique mais non observable.

---

## Les custom event et les attributs @event

Pour passer des fonctions dans les attributs d'un composant avec Wapitis et permettre à deux composants de communiquer entre eux, on utilisera les customEvents, comme nous l'avons vu avec le composant Todo.

On crée ainsi un customEvent en utilisant la méthode dispatchEvent de la librairie [UTILS](./utils.md) :

```typescript
UTILS.dispatchEvent('remove', { index: this.index }, this)
```

Grâce à lit-html, pour ajouter un addEventListener sur le composant, on pourra créer un attribut avec @NomDeLevent sur le composant.

```typescript
${this._todos.map((todo, index) => html`<w-todo ?checked=${todo.checked} text=${todo.text} .index=${index} @remove=${this._removeTodo} @completed=${this._toggleTodo}></w-todo>`)}
```

---

## Méthodes et utilisation du cycle de vies

Le component a quelques méthodes intégrées qui définissent son cycle de vie.

### constructor
{: .no_toc }

```typescript
constructor(options: IProps) {
    super(options)
}
```
Appelé lors de la création du composant seulement. Intéressant pour déclarer les variables et propriétés. Possible d'accéder aux propriétés déclarées (props) lors de la création du composant avec new Composant(props).

### connectedCallback
{: .no_toc }

```typescript
connectedCallback() {
    super.connectedCallback()
}
```
Appelé lorsque l'élément est connecté pour la première fois au DOM du document.

### attributeChangedCallback
{: .no_toc }

```typescript
attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    super.attributeChangedCallback(attrName, oldVal, newVal)
}
```
Appelé lorsque l'un des attributs de l'élément personnalisé est ajouté, supprimé ou modifié.

### shouldUpdate
{: .no_toc }

```typescript
shouldUpdate(_changedProperties: PropertyValues): boolean {
    return true
}
```
Permet de conditionner le rendu du composant. render() est appelé si la fonction retourne true. Ce qui est le comportement par défaut.
**_changedProperties** permet d'accéder aux propriétés en cours de changement avec leurs anciennes et leurs nouvelles valeurs grâce à la map ```PropertyValues = new Map<PropertyKey, { oldVal: unknown, newVal: unknown }>```

### beforeRender
{: .no_toc }

```typescript
beforeRender(_changedProperties: PropertyValues) {
    //
}
```
Appelé avant le rendu du composant. Permet d'interagir avec les éléments à chaque appel du composant avant sa création dans le dom.
**_changedProperties** permet d'accéder aux propriétés en cours de changement avec leurs anciennes et leurs nouvelles valeurs grâce à la map ```PropertyValues = new Map<PropertyKey, { oldVal: unknown, newVal: unknown }>```

### render
{: .no_toc }

```typescript
render() {
    return html`
        <!--  -->
    `
}
```
La méthode permet de créer le composant dans le dom grâce au tag html de lit-html. Il retourne un TemplateResult qui est ensuite interprété et permet la mise à jour du DOM.

### firstUpdated
{: .no_toc }

```typescript
firstUpdated(_changedProperties: PropertyValues) {
    //
}
```
Appelé lors de la première mise à jour du composant. Utile pour réaliser des actions qui ne doivent avoir lieu qu'une fois, comme la récupération des différents éléments rendus dans la méthode render(), en utilisant les méthodes existantes dans les librairies [DOM](../api/modules/_dom_.dom.md) et [SHADOWDOM](../api/modules/_shadowdom_.shadowdom.md) de WAPITIS ou l'API DOM. Par exemple avec querySelector et la propriété shadowRoot :
``` typescript
this._input = this.shadowRoot!.querySelector('input')
```
**_changedProperties** permet d'accéder aux propriétés en cours de changement avec leurs anciennes et leurs nouvelles valeurs grâce à la map ```PropertyValues = new Map<PropertyKey, { oldVal: unknown, newVal: unknown }>```

### updated
{: .no_toc }

```typescript
updated(_changedProperties: PropertyValues) {
    //
}
```
Appelé lors de chaque mise à jour du composant. Permet de réaliser des tâches après le rendu du composant à chaque appel en utilisant les méthodes existantes dans les librairies [DOM](../api/modules/_dom_.dom.md) et [SHADOWDOM](../api/modules/_shadowdom_.shadowdom.md) de WAPITIS ou l'API DOM, par exemple pour le focus d'un élément.
**_changedProperties** permet d'accéder aux propriétés en cours de changement avec leurs anciennes et leurs nouvelles valeurs grâce à la map ```PropertyValues = new Map<PropertyKey, { oldVal: unknown, newVal: unknown }>```

### disconnectedCallback
{: .no_toc }

```typescript
disconnectedCallback() {
    super.disconnectedCallback()
}
```
Appelé lorsque le custom element est déconnecté du DOM du document.

---

## Slot

Lors de la création d'un custom element si on veut permettre l'ajout d'enfant à notre composant, on peut utiliser le principe de slot.

Ainsi, on définit dans la méthode render une balise slot qui appellera tout enfant déclaré dans le composant. Imaginons un composant w-info possédant la méthode render suivante :

```typescript
render() {
    html`
        <div class='title'>Informations</div>
        <slot></slot>
    `
}
```

Lors de l'appel du composant info on pourra écrire n'importe quel enfant dans le composant qui sera alors appelé à la place du slot dans le DOM.

```typescript
render() {
    html`
        <w-info>
            <p>Les slot c'est super !</p>
        </w-info>
    `
}
```

Il est également possible d'être plus précis en donnant un nom au slot.

```typescript
render() {
    html`
        <slot name='title'></slot>
        <slot name='content'></slot>
    `
}
```

Dans ce cas lors de l'appel du composant et de la création des enfants, il sera nécessaire de préciser à quel slot l'enfant sera affecté :

```typescript
render() {
    html`
        <w-info>
            <h1 slot='title'>Informations</h1>
            <p slot='content'>Les slot c'est super !</p>
        </w-info>
    `
}
```

Dans ce cas tout autre enfant ne sera pas affecté car le composant w-infos ne contient que deux slots title et content. Il serait possible d'ajouter une balise slot sans nom :

```typescript
render() {
    html`
        <slot name='title'></slot>
        <slot name='content'></slot>
        <slot>
            <p>Contenu par défaut</p>
        </slot>
    `
}
```

Dans ce cas tout autre enfant nom nommé serait affecté à la balise slot. Si aucun autre enfant n'est ajouté, c'est le contenu par défaut qui est utilisé.

Pour sélectionner un élément en slot en CSS, on doit utiliser le sélecteur ```::slotted()```.

---

## Possibilité de lit-html

Tout ce qui est possible avec lit-html est possible dans wapitis comme :

- le conditionnal rendering. Par exemple :

```typescript
${this.checked ? html`<svg class="icon"><use href=${icons}#icon-check-circle></use></svg>` : html`<svg class="icon"><use href=${icons}#icon-circle></use></svg>`}
```

- des template de boucles. Par exemple :

```typescript
${this._todos.map((todo, index) => html`<w-todo ?checked=${todo.checked} text=${todo.text} .index=${index} @remove=${this._removeTodo} @completed=${this._toggleTodo}></w-todo>`)}
```

- Tout ce que l'on trouvera sur : [https://lit-html.polymer-project.org/guide/template-reference](https://lit-html.polymer-project.org/guide/template-reference) dont la directive repeat, until, ... L'import se fera en revanche via wapitis. Exemple :

```typescript
import { repeat, until } from wapitis
```

---

## Etendre un component

Dans certains cas, il peut être nécessaire d'étendre un composant avec un autre composant Wapitis, pour hériter des ses méthodes et propriétés.

Dans ce cas le composant qui servira à étendre voit sa déclaration changer légèrement. Il faut en effet alors ajouter une propriété générique à la classe et ajouter cette propriété au constructeur :

```typescript
...

export class Box<T> extends Component<IProps> {

...

constructor(options?: T) {
    super(options as unknown as IProps)
}

...
```

Dans la classe étendu, au lieu de Component, on appelle la classe que l'on veut utiliser. Si on veut hériter des styles de cette classe il faut également utiliser un array dans la propriété styles et appeler `super.styles` :

```typescript
...

export default class Footer extends Box<IProps> {

    static get styles() {
        return [
            super.styles,
            css`

...
```

D'une manière générale, toute méthode que l'on voudra surcharger devra commencer par `super.`. Exemple :
```typescript
updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
}
```

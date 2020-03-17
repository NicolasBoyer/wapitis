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
export default class Custom extends Component {
```

permet de créer le nom du composant et de le déclarer comme WebComponent en deux lignes claires en début de fichier.

Il est obligatoire lors de la déclaration dans la directive d'avoir un nom sou la forme `prefixe-component`, en effet cela permet de le différencier des composants web intégrés et de le signaler comme custom element. Par convention le nom donné à la classe reprend en général le nom `Component` avec une majuscule mais cela n'est pas obligatoire.

---

## La directive property
{: .d-inline-block }

New - 2.1.5
{: .label .label-purple }

En typescript, les propriétés peuvent être publiques, protected ou private. Avec Wapitis, pour rendre des propriétés observables, il faut utiliser la directive `@property`.

Par défaut, cela permet de rendre une propriété observable et de définir par la même occasion un attribut du composant que nous sommes en train de créer.

```typescript
@property() text: string
```

Le prefixe _ devant le nom permet de rendre la propriété protected tout en restant observable. Elle n'est alors plus déclarée en tant qu'attribut.

Il est possible de passer un objet en paramètre. Cet object peut contenir 3 paramètres:

- type : indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (`String` par défaut) - `Boolean`, `String`, `Number`, `Object`, `Array`. Important pour préciser comment la conversion doit se faire entre la propriété et l'attribut (qui est obligatoirement un texte). Inutile dans le cas d'une propriété protected mais observable car aucune conversion n'est nécessaire.
- attribute : Si true, la propriété est alors répliquée en tant qu'attribut dans l'html. Si false, la propriété reste observable mais non visible en tant qu'attribut dans l'html 'rendu', il est néanmoins possible de la créer en html ou en javascript (true par défaut).
- fromAttribute : Indique comment convertir un attribut vers une propriété. Si type est défini, alors ce paramètre est inutile. De même, type est inutile si `fromAttribute` est défini. Dans tous les cas, la conversion de la propriété vers l'attribut est automatique. Lorsque type est précisé, la conversion est automatique dans les deux sens (pour les types suivants : `Boolean`, `String`, `Number`, `Object`, and `Array`). `fromAttribute` permet de gérer plus finement la conversion en provenance de l'attribut. Nécessaire lorsqu'un typage particulier est utilisé.

New - 2.1.24
{: .label .label-purple }

---

## Les custom event et les attributs @event

Pour passer des fonctions dans les attributs d'un composant avec Wapitis et permettre à deux composants de communiquer entre eux, on utilisera les customEvents, comme nous l'avons vu avec le composant Todo.

On crée ainsi un customEvent en utilisant la méthode dispatchEvent de la librairie [UTILS](./utils.md) :

```typescript
UTILS.dispatchEvent('remove', { index: this.index }, this): void
```

Grâce à lit-html, pour ajouter un addEventListener sur le composant, on pourra créer un attribut avec @NomDeLevent sur le composant.

```typescript
${this._todos.map((todo, index) => html`<w-todo ?checked=${todo.checked} text=${todo.text} .index=${index} @remove=${this._removeTodo} @completed=${this._toggleTodo}></w-todo>`)}
```

---

## Méthodes et utilisation du cycle de vies

Le component a quelques méthodes intégrées qui définissent son cycle de vie.

### constructor
{: .no_toc .d-inline-block }

New - 2.1.0
{: .label .label-purple }

```typescript
constructor(options: any) {
    super(options)
}
```
Appelé lors de la création du composant seulement. Intéressant pour déclarer les variables et propriétés. Possible d'accéder aux propriétés déclarées (props) lors de la création du composant avec new Composant(props).

On peut déclarer les propriétés publiques obsevables dans le constructor. Bien que cela ne soit pas obligatoire, cela permet d'aider les éditeurs de code à savoir quels paramètres peuvent être utilisés lors de la création du composant sous la forme new Component({...}).

```typescript
constructor(options: { maVariable: string }) {
    super(options)
}
```

Si la création sous cette forme n'est pas utilisée ou si on a pas besoin de cette aide, la déclaration des paramètres dans le constructeur peut alors être la suivante :

```typescript
constructor(options: any) {
    super(options)
    /* ... */
}
```

Comme toutes les autres méthodes, le constructeur peut aussi ne pas être déclaré si on a rien à mettre dedans, puisqu'il est déclaré dans la classe parente.

### connectedCallback
{: .no_toc }

```typescript
connectedCallback(): void {
    super.connectedCallback()
}
```
Appelé lorsque l'élément est connecté pour la première fois au DOM du document.

### attributeChangedCallback
{: .no_toc }

```typescript
attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void {
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
beforeRender(_changedProperties: PropertyValues): void {
    //
}
```
Appelé avant le rendu du composant. Permet d'interagir avec les éléments à chaque appel du composant avant sa création dans le dom.
**_changedProperties** permet d'accéder aux propriétés en cours de changement avec leurs anciennes et leurs nouvelles valeurs grâce à la map ```PropertyValues = new Map<PropertyKey, { oldVal: unknown, newVal: unknown }>```

### render
{: .no_toc }

```typescript
render(): TemplateResult {
    return html`
        <!--  -->
    `
}
```
La méthode permet de créer le composant dans le dom grâce au tag html de lit-html. Il retourne un TemplateResult qui est ensuite interprété et permet la mise à jour du DOM.

### firstUpdated
{: .no_toc }

```typescript
firstUpdated(_changedProperties: PropertyValues): void {
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
updated(_changedProperties: PropertyValues): void {
    //
}
```
Appelé lors de chaque mise à jour du composant. Permet de réaliser des tâches après le rendu du composant à chaque appel en utilisant les méthodes existantes dans les librairies [DOM](../api/modules/_dom_.dom.md) et [SHADOWDOM](../api/modules/_shadowdom_.shadowdom.md) de WAPITIS ou l'API DOM, par exemple pour le focus d'un élément.
**_changedProperties** permet d'accéder aux propriétés en cours de changement avec leurs anciennes et leurs nouvelles valeurs grâce à la map ```PropertyValues = new Map<PropertyKey, { oldVal: unknown, newVal: unknown }>```

### disconnectedCallback
{: .no_toc }

```typescript
disconnectedCallback(): void {
    super.disconnectedCallback()
}
```
Appelé lorsque le custom element est déconnecté du DOM du document.

---

## Slot

Lors de la création d'un custom element si on veut permettre l'ajout d'enfant à notre composant, on peut utiliser le principe de slot.

Ainsi, on définit dans la méthode render une balise slot qui appellera tout enfant déclaré dans le composant. Imaginons un composant w-info possédant la méthode render suivante :

```typescript
render(): TemplateResult {
    html`
        <div class='title'>Informations</div>
        <slot></slot>
    `
}
```

Lors de l'appel du composant info on pourra écrire n'importe quel enfant dans le composant qui sera alors appelé à la place du slot dans le DOM.

```typescript
render(): TemplateResult {
    html`
        <w-info>
            <p>Les slot c'est super !</p>
        </w-info>
    `
}
```

Il est également possible d'être plus précis en donnant un nom au slot.

```typescript
render(): TemplateResult {
    html`
        <slot name='title'></slot>
        <slot name='content'></slot>
    `
}
```

Dans ce cas lors de l'appel du composant et de la création des enfants, il sera nécessaire de préciser à quel slot l'enfant sera affecté :

```typescript
render(): TemplateResult {
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
render(): TemplateResult {
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
{: .d-inline-block }

New - 2.1.0
{: .label .label-purple }

Dans certains cas, il peut être nécessaire d'étendre un composant avec un autre composant Wapitis, pour hériter des ses méthodes et propriétés.

Dans la classe étendu, au lieu de Component, il suffit d'appeler la classe que l'on veut utiliser. Si on veut hériter des styles de cette classe, il faut également utiliser un array dans la propriété styles et appeler `super.styles` :

```typescript
...

@customElement('x-footer')
export default class Footer extends Box {

    static get styles(): CSSResult {
        return [
            super.styles,
            css`

...
```

D'une manière générale, toute méthode que l'on voudra surcharger devra commencer par `super.`. Exemple :
```typescript
updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties)
}
```

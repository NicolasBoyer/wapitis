# Pour commencer

Afin de tester le fonctionnement de l'outil, nous allons essayer de créer une application de TODOS

Commençons pas l'installation. Dans un dossier de votre choix, initaliser npm via **npm init**

Puis installer et initialiser Wapitis

    npm i wapitis -D
    npx wapitis init

Répondez aux questions. Dans notre cas :

![](images/wapitisInit.png)

L'installation se poursuit alors avec ts-lint et electron-updater.

Une fois l'installation terminée les sources se présentent ainsi :

![](images/wapitisSrc.png)

- wapitis.json contient les divers éléments permettant la création de l'application.
- tslint.json permet de mettre en place l'aide à la saisie.
- tsconfig.json configure comment typescript doit fonctionner.
- .env contient les divers variables d'environnement nécessaires au bon fonctionnement de wapitis
- le dossier src contient les sources de l'applications. A commencer par les assets (images, icons, fonts ...)
- le dossier electron contient un fichier splash.html avec une icon éditable qui sera visible lors du lancement de l'application
  - about.png est éditable et comme son nom l'indique est visible dans la fenetre à propos de l'application electron
  - index.js contient le code js permettant de créer la popup de mise à jour et de recevoir les messages en provenance de l'application.
  - electronStart.ts est le fichier permettant de lancer l'application electron et contient la création des menus et des messages envoyés par l'application
- manifest.json est le manifest necessaire pour permettre d'installer l'application comme une WebApp
- main.css contient les css générales de l'application (il ne s'applique pas aux différents composants qui contiennet leurs propres styles)
- app.tsx est le point de départ de l'application. L'endroit ou nous appellerons le fichier racine de notre WebApp

Pour créer notre application, nous aurons besoin de deux composants:

    TodoList
        Input de text pour ajouter une tâche
        Liste des tâches
    Todo
        Case à cocher pour marquer complété
        Texte
        Bouton de suppression

TodoList aura une propriété observée todos : un array contenant la liste  des todos
Todo aura 3 attributs : checked, text, index, peut etre plus

Nous commencerons donc par créer un composant en utilisant la ligne de commande suivante :

    npx wapitis generate component components/todo-list.ts

Le fichier suivant est alors créé :

```Typescript
import { Component, css, customElement, html, property, PropertyValues } from 'wapitis'

interface IProps {
    maVariable: string
}

// Entrez le nom du composant (x-nameOfComponent) par défaut en paramètre de register => recquis
@customElement()
export default class Custom extends Component<IProps> {

    static get styles() {
        return css`
        :host {
            /*  */
        }
        `
    }

    @property() maVariable: string

    constructor(options: IProps) {
        super(options)
    }

    connectedCallback() {
        super.connectedCallback()
    }

    attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
        super.attributeChangedCallback(attrName, oldVal, newVal)
    }

    shouldUpdate(_changedProperties: PropertyValues): boolean {
        return true
    }

    beforeRender(_changedProperties: PropertyValues) {
        //
    }

    render() {
        return html`
            <!--  -->
        `
    }

    firstUpdated(_changedProperties: PropertyValues) {
        //
    }

    updated(_changedProperties: PropertyValues) {
        //
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

}
```

Ce fichier contient les méthodes accessible tout le long du cycle de vie du composant nouvellement créé (pour en savoir plus voir plus bas)

Nous allons l'éditer de cette façon :
```Typescript
import { Component, customElement, html, property } from 'wapitis'

// Nous définissons notre custom element dans la directive suivante et la classe associée
// w pour wapitis. il est obligatoire d'avoir "prefixe-nom" dans le nom d'un custom element
@customElement('w-todo-list')
export default class TodoList extends Component<{}> {
    // Une propriété _todos est déclaré avec la directive @property en indiquant le type dont il s'agit ici un Array d'objet
    // Le préfixe _ permet à la propriété d'être obervable tout en étant considérée comme protected. Elle n'apparait ainsi pas dans les attributs de l'élément il n'y a donc pas de conversion
    @property() _todos: Array<{ text: string; }> = []
    // Une propriété input non observable et protected est déclarée pour pouvoir y accéder ci après
    protected _input: HTMLInputElement | null

    render() {
        // On utilise ensuite le helper html afin de créer un template avec les événements et les variables observées à mettre à jour
        // @click correspond à addEventListener('click', this.addTodos)
        // La partie du template this._todos est mis à jour car il s'agit d'une propriété observable
        // L'écriture est ici également la même que https://lit-html.polymer-project.org/guide/template-reference
        return html`
            <div class='title'>todos</div>
            <form>
                <input type='text' placeholder='Ajouter une tâche'/>
                <button @click=${this._addTodo}>Ajouter</button>
            </form>
            <div class='todos'>
                ${this._todos.map((todo) => html`<div>${todo.text}</div>`)}
            </div>
        `
    }

    // On va chercher l'élément input
    firstUpdated = () => this._input = this.shadowRoot!.querySelector('input')

    // On ajoute à la propriété _todos la nouvelle tâche créée. C'est la methode render qui se charge de l'affichage lorsque _todos change
    protected _addTodo = (event: MouseEvent) => {
        event.preventDefault()
        if (this._input!.value.length > 0) {
            this._todos = [...this._todos, { text: this._input!.value }]
            this._input!.value = ''
        }
    }
}
```
Voir directement dans le code pour avoir les informations sur la création de ce composant

Afin de voir le résultat, il est nécessaire d'appeler ce composant. Nous pouvons le faire facilement dans la racine de l'application app.tsx.

Nous allons utiliser ici JSX afin d'appeler directement le composant en Javascript, en modifiant le fichier app.tsx de cette façon

```Typescript
import { JSX } from 'wapitis'
import TodoList from './components/todo-list'
import './www/styles/main.css'

document.body.appendChild(<TodoList></TodoList>)
```

Enfin pour voir le résultat nous allons lancer un serveur de test en exécutant la ligne de commande :
```
npx wapitis dev
```
Et en nous rendant sur : http://localhost:4444/

Cela donne :

![](images/wapitisTodoList01.png)

Afin d'améliorer un peu la présentation, nous allons intégrer un peu de stylage. Les composants portent leur stylage, ce qui rend très facile leur utilisation. De plus avec les shadow DOM, les CSS sont bloqués à l'intérieur du composant, ce qui veut dire que les CSS des autres composants n'agissent pas sur lui et inversement.

Il y a évidemment des passerelles et des surcharges possibles, comme cela sera expliqué plus loin dans la doc.

Ici nous allons transformer le code en ajoutant

```Typescript
export default class TodoList extends Component<{}> {
    static get styles() {
        return css`
        :host {
            font-family: Arial, Helvetica, sans-serif;
            margin: auto;
            width: 25rem;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .title {
            font-size: 100px;
            opacity: 0.2;
            color: #333333;
        }
        input {
            border: 1px solid #ccc;
            box-shadow: inset 0 1px 3px #ddd;
            border-radius: 4px;
            padding: 12px 20px;
        }
        button {
            display: none;
        }
        .todos {
            width: 25em;
            margin-top: 1rem;
        }
        `
    }

    @property() _todos: Array<{ text: string; }> = []

    ...
```
Ce qui donne :

![](images/wapitisTodoList02.png)

On pourrait s'arrêter ici, mais nous voulions également pouvoir supprimer les tâches et les marquer comme réalisées. Pour ce faire nous allons créer un autre composant que nous pourrons ensuite instancier dans le composant TodoList

```
npx wapitis generate component components/todo.ts
```

Un fois le composant créé, il est édité comme ceci (Lire les commentaires pour comprendre le fonctionnement)

```Typescript
import { Component, customElement, html, property, UTILS } from 'wapitis'

// On déclare les prporiétés puvliques obsevables. Ainsi si un constructor est déclarée on peut utiliser la forme new Todo({...}) pour créer la Todo. Et cela permet aux composants appelant d'avoir connaissances de ces propriétés
interface IProps {
    text: string
    index: number
    checked: boolean
}

@customElement('w-todo')
export default class Todo extends Component<IProps> {
    // On déclare les 3 propiétés observable en utilisant la directive @property. Comme il s'agit d'attribut, afin d'indiquer comment la conversion doit être faite entre l'attribut et la propriété, on indique le type pour index et checked, text étant un string il est inutile de l'indiquer. writeOnly est passé à true pour l'index afin qu'il n'apparaisse pas en tant qu'attribut html dans le dom
    @property() text: string
    @property({ type: Number, writeOnly: true }) index: number
    @property({ type: Boolean }) checked: boolean = false

    render() {
        // https://lit-html.polymer-project.org/guide/template-reference
        // On utilise .checked pour indiquer qu'on utilisera une valeur true ou false pour l'attribut html checked de l'input dans le DOM
        // Un custom event est utilisé pour préciser aux autres composants que la tâche est complétée ou supprimée (cf todo-list pour voir comment cela est traité)
        // Un autre custom event est utilisé pour preciser que la tâche est supprimée
        return html`
            <label>
                <input .checked=${this.checked} @change=${() => this._fireEvent('completed')} type='checkbox'/>
                <span>${this.text}</span>
            </label>
            <button @click=${() => this._fireEvent('remove')}>Supprimer</button>
        `
    }

    // Une fonction générique est créée pour envoyer le custom event
    // On utilise ici une des méthodes disponibles dans la librairie UTILS : dispatchEvent permettant d'envoyer un custom event
    protected _fireEvent = (name: string) => UTILS.dispatchEvent(name, { index: this.index }, this)
}
```

Nous allons ensuite modifier todo-list afin de déclarer le nouveau composant créé et les méthodes nécessaires à son fonctionnement.

```Typescript
import { Component, css, customElement, html, property } from 'wapitis'
// On importe le composant
import './todo'

...

render() {
        // On utilise ensuite le helper html afin de créer un template avec les événements et les variables observées à mettre à jour
        // @click correspond à addEventListener('click', this.addTodos)
        // La partie du template this._todos est mis à jour car il s'agit d'une propriété observable
        // L'écriture est ici également la même que https://lit-html.polymer-project.org/guide/template-reference
        // On remplace l'ancien div par le composant w-todo en déclarant les différentes variables
        // text et index avec un . car c'est une valeur
        // .checked permet d'indiquer qu'il s'agit d'un booleen. En tant qu'attribut seul checked sera écrit quand l'attribut sera à true. S'il est à false il ne sera pas présent
        // Enfin commen on ferait un addEventListener sur les custom event de ce composant on pose ici un @ accompagné du nom de ce custom event et d'une méthode associée
        return html`
            <div class='title'>todos</div>
            <form>
                <input type='text' placeholder='Ajouter une tâche'/>
                <button @click=${this._addTodo}>Ajouter</button>
            </form>
            <div class='todos'>
                ${this._todos.map((todo, index) => html`<w-todo ?checked=${todo.checked} text=${todo.text} .index=${index} @remove=${this._removeTodo} @completed=${this._toggleTodo}></w-todo>`)}
            </div>
        `
    }

    // On va chercher l'élément input
    firstUpdated = () => this._input = this.shadowRoot!.querySelector('input')

    // On ajoute à la propriété _todos la nouvelle tâche créée. C'est la methode render qui se charge de l'affichage lorsque _todos change
    protected _addTodo = (event: MouseEvent) => {
        event.preventDefault()
        if (this._input!.value.length > 0) {
            this._todos = [...this._todos, { text: this._input!.value, checked: false }]
            this._input!.value = ''
        }
    }

    // On supprime l'index demandé en filtrant le tableau existant grâce à l'index. La mise à jour du tableau permettra à la methode render de remplacer les élément nécessaires dans le template
    protected _removeTodo = (event: CustomEvent) => this._todos = this._todos.filter((todo, index) => index !== event.detail.index)

    // On remplace dans le tableau la propriété checked par la valeur renvoyée grâce à l'index. La mise à jour du tableau permettra à la methode render de remplacer les élément nécessaires dans le template
    protected _toggleTodo = (event: CustomEvent) => this._todos = this._todos.map((todo, index) => index === event.detail.index ? { ...todo, checked: !todo.checked } : todo)
}
```

Cela nous donne ainsi

![](images/wapitisTodoList03.png)

Afin d'améliorer le rendu, un peu de stylage est nécessaire

```Typescript
// On importe les icons avec le fichier icons.svg
import { Component, css, customElement, html, property, UTILS } from 'wapitis'
import icons from '../www/assets/img/icons.svg'

// On déclare les prporiétés puvliques obsevables. Ainsi si un constructor est déclarée on peut utiliser la forme new Todo({...}) pour créer la Todo. Et cela permet aux composants appelant d'avoir connaissances de ces propriétés
interface IProps {
    text: string
    index: number
    checked: boolean
}

@customElement('w-todo')
export default class Todo extends Component<IProps> {
    static get styles() {
        return css`
        :host {
            display: flex;
            word-break: break-all;
            padding: 15px 15px 15px 10px;
            line-height: 1.2;
            transition: color 0.4s;
            border: 1px solid #e6e6e6;
            margin-top: -1px;
            justify-content: space-between;
            background: #fdfdfd;
        }
        label {
            display: flex;
            align-items: center;
        }
        label span {
            padding-left: 0.5em;
            font-size: 24px;
            color: #4d4d4d;
            line-height: 1.2;
            transition: color 0.4s;
        }
        :host([checked]) label span {
            color: #d9d9d9;
            text-decoration: line-through;
        }
        input {
            display: none;
        }
        .icon {
            width: 1.7em;
            height: 1.7em;
            stroke: none;
            fill: #cacaca;
        }
        button {
            border: none;
            background: none;
            display: flex;
            justify-content: center;
            cursor: pointer;
        }
        .icon-x {
            fill: #cc9a9a;
            transition: all 0.4s;
            opacity: 0;
        }
        :host(:hover) .icon-x {
            opacity: 1;
        }
        button:hover .icon-x {
            fill: #af5b5e;
        }
        `
    }

    // On déclare les 3 propiétés observable en utilisant la directive @property. Comme il s'agit d'attribut, afin d'indiquer comment la conversion doit être faite entre l'attribut et la propriété, on indique le type pour index et checked, text étant un string il est inutile de l'indiquer. writeOnly est passé à true pour l'index afin qu'il n'apparaisse pas en tant qu'attribut html dans le dom
    @property() text: string
    @property({ type: Number, writeOnly: true }) index: number
    @property({ type: Boolean }) checked: boolean = false

    render() {
        // https://lit-html.polymer-project.org/guide/template-reference
        // On utilise .checked pour indiquer qu'on utilisera une valeur true ou false pour l'attribut html checked de l'input dans le DOM
        // Un custom event est utilisé pour préciser aux autres composants que la tâche est complétée ou supprimée (cf todo-list pour voir comment cela est traité)
        // Un autre custom event est utilisé pour preciser que la tâche est supprimée
        // On déclare une balise SVG qui va chercher les icones déclarés dans le fichier icons.svg
        return html`
            <label>
                <input .checked=${this.checked} @change=${() => this._fireEvent('completed')} type='checkbox'/>
                ${this.checked ? html`<svg class="icon"><use href=${icons}#icon-check-circle></use></svg>` : html`<svg class="icon"><use href=${icons}#icon-circle></use></svg>`}
                <span>${this.text}</span>
            </label>
            <button @click=${() => this._fireEvent('remove')} title='Supprimer'><svg class="icon icon-x"><use href=${icons}#icon-x></use></svg></button>
        `
    }

    ...
```

Dans un contexte de vrai webapp on aurait probablement créé un composant icon à la place de la balise SVG.

Celda dit, comme expliqué plus haut pour avoir des icones on utilise une balise SVG appelant le fichier d'icones icones.svg présent dans les assets/img. et l'id associé à l'icone voulu
On va lui ajouter les icones :

```xml
<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
		<symbol id="icon-circle" viewBox="0 0 24 24">
			<title>circle</title>
			<path d="M23 12c0-1.488-0.296-2.91-0.833-4.207-0.558-1.347-1.375-2.558-2.388-3.571s-2.224-1.831-3.571-2.388c-1.298-0.538-2.72-0.834-4.208-0.834s-2.91 0.296-4.207 0.833c-1.347 0.558-2.558 1.375-3.571 2.389s-1.831 2.224-2.389 3.571c-0.537 1.297-0.833 2.719-0.833 4.207s0.296 2.91 0.833 4.207c0.558 1.347 1.375 2.558 2.388 3.571s2.224 1.831 3.571 2.388c1.298 0.538 2.72 0.834 4.208 0.834s2.91-0.296 4.207-0.833c1.347-0.558 2.558-1.375 3.571-2.388s1.831-2.224 2.388-3.571c0.538-1.298 0.834-2.72 0.834-4.208zM21 12c0 1.221-0.243 2.383-0.681 3.442-0.456 1.101-1.124 2.092-1.955 2.922s-1.822 1.499-2.922 1.955c-1.059 0.438-2.221 0.681-3.442 0.681s-2.383-0.243-3.442-0.681c-1.101-0.456-2.092-1.124-2.922-1.955-0.831-0.831-1.499-1.822-1.955-2.922-0.438-1.059-0.681-2.221-0.681-3.442s0.243-2.383 0.681-3.442c0.456-1.101 1.124-2.092 1.955-2.922s1.822-1.499 2.922-1.955c1.059-0.438 2.221-0.681 3.442-0.681s2.383 0.243 3.442 0.681c1.101 0.456 2.092 1.124 2.922 1.955 0.831 0.831 1.499 1.822 1.955 2.922 0.438 1.059 0.681 2.221 0.681 3.442z"></path>
		</symbol>
		<symbol id="icon-check-circle" viewBox="0 0 24 24">
			<title>check-circle</title>
			<path d="M21 11.080v0.92c-0.001 1.22-0.244 2.382-0.683 3.441-0.456 1.1-1.126 2.091-1.957 2.921s-1.823 1.498-2.924 1.953c-1.059 0.438-2.221 0.68-3.442 0.679s-2.382-0.244-3.441-0.683c-1.1-0.456-2.091-1.126-2.921-1.957s-1.498-1.823-1.953-2.924c-0.438-1.058-0.68-2.22-0.679-3.441s0.244-2.382 0.683-3.441c0.456-1.1 1.126-2.091 1.957-2.921s1.823-1.498 2.924-1.953c1.059-0.438 2.221-0.68 3.442-0.679 1.33 0.001 2.586 0.289 3.649 0.775 0.502 0.23 1.096 0.008 1.325-0.494s0.008-1.096-0.494-1.325c-1.327-0.606-2.866-0.955-4.479-0.956-1.488-0.001-2.91 0.294-4.207 0.831-1.348 0.556-2.56 1.373-3.574 2.386s-1.832 2.223-2.39 3.57c-0.538 1.297-0.835 2.718-0.836 4.206s0.294 2.91 0.831 4.207c0.557 1.347 1.374 2.559 2.386 3.573s2.223 1.832 3.57 2.39c1.297 0.538 2.718 0.835 4.206 0.836s2.91-0.294 4.207-0.831c1.347-0.557 2.559-1.374 3.573-2.386s1.832-2.223 2.39-3.57c0.539-1.297 0.836-2.718 0.837-4.207v-0.92c0-0.552-0.448-1-1-1s-1 0.448-1 1zM21.293 3.293l-9.293 9.302-2.293-2.292c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l3 3c0.391 0.391 1.024 0.39 1.415 0l10-10.010c0.39-0.391 0.39-1.024-0.001-1.414s-1.024-0.39-1.414 0.001z"></path>
		</symbol>
		<symbol id="icon-x" viewBox="0 0 24 24">
			<title>x</title>
			<path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
		</symbol>
	</defs>
</svg>
```

Pour récupérer ces icônes et leur code il suffit de se rendre sur [icomoon](https://icomoon.io/app/) et de d'appuyer sur generate SVG, il est alors possible de récupérer ces codes comme on le voit ici

![](images/wapitisTodoList04.png)

Au final on obtient:

![](images/wapitisTodoList05.png)

Une fois terminé notre webapp, il est tout à fait possible de tester l'app sous electron en lançant

```
npx wapitis electron --dev
```

Cela ouvre alors une fenetre en plein écran. Il s'agi d'une app electron contenant notre nouvelle webapp.

![](images/wapitisTodoList06.png)

Il est alors possible de continuer à développer notre webapp comme on le faisait en test web. La mise à jour est automatique.

Pour modifier les menus ou tout ce qui concerne electron, il suffit de modifier le fichier electronSTart.ts. Nous ne le ferons pas ici.

Si nous ne verrons pas directement comment publier cette application pour la production avec electron, cela est tout à fait possible et sera expliqué plus bas.

Enfin si nous voulons publier notre webapp pour la production et profiter du service worker et de ses possibilités, il suffi de lancer

```
npx wapitis prod
```

Le résultat de la compilation est disponible dans le dossier dist :

![](images/wapitisTodoList07.png)

Il n'y a rien à faire pour activer le service worker. sw.js s'en occupe. Par ailleurs un polyfill est intégré afin de gérer le passage sur les différents navigateurs. La seule chose à faire est de styler les boutons permettant d'activer les notifications et l'ajout en tant qu'application à l'écran d'accueil

Pour cela nous allons remplir styles/main.css.

```CSS
body {
    margin: 0;
}

.notificationPermission,
.installApp {
    padding: 0.5em;
}

.installApp {
    float: left;
}

.installApp button,
.notificationPermission button {
    border: 0;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    box-shadow: 0 0.1875rem 0.3125rem -0.0625rem rgba(0, 0, 0, 0.2), 0 0.375rem 0.625rem 0 rgba(0, 0, 0, 0.14), 0 0.0625rem 10.5rem 0 rgba(0, 0, 0, 0.12);
    background-repeat: no-repeat;
    background-position: 10px 10px;
}

.notificationPermission button {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><path stroke="0" fill="grey" d="M4 8c0-0.001 0-0.002 0-0.003 0-2.608 1.664-4.827 3.988-5.654l0.042-0.013c-0.016-0.095-0.025-0.204-0.025-0.315 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0.111-0.009 0.22-0.027 0.327l0.002-0.012c2.361 0.843 4.020 3.060 4.020 5.664 0 0.002 0 0.004 0 0.006v-0 6l3 2v1h-18v-1l3-2v-6zM12 18c0 1.105-0.895 2-2 2s-2-0.895-2-2v0h4z"></path></svg>');
    background-position: 15px 15px;
}

.installApp button {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><path stroke="0" fill="grey" d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg>');
    background-position: 13px 14px;
}

.installApp span,
.notificationPermission span {
    display: none;
}
```

Quelques éléments ont été rajoutés sur le sit envoyés sur le serveur. Ils ne seront pas décrit ici ...

Il ne reste plus alors qu'à tout envoyer sur le serveur de son choix. Dans mon cas, j'ai utilisé netlify.

Le code de la démo est disponible ici : [https://github.com/NicolasBoyer/wapitis-todos](https://github.com/NicolasBoyer/wapitis-todos)

Et la démo elle même est là : [https://wapitis-todos-test.netlify.com](https://wapitis-todos-test.netlify.com)

Tout n'est pas décrit ici, il manque par exemple l'utilisation des slot ou encore la gestion des propriétés de stylage pour surcharger, la publication dans une app electron et pleins d'autres choses qui seront expliqués dans le reste de la documentation.
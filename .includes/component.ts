import { Component, css, customElement, html, property, PropertyValues } from 'wapitis'

// Entrez le nom du composant (x-nameOfComponent) par défaut en paramètre de register => recquis
@customElement()
export default class Custom extends Component {

    static get styles() {
        return css`
        :host {
            /*  */
        }
        `
    }

    @property() maVariable: string

    // On peut déclarer les propriétés publiques obsevables dans le constructor. Bien que cela ne soit pas obligatoire, cela permet d'aider les éditeurs de code à savoir quels paramètres peuvent être utilisés lors de la création du composant sous la forme new Component({...}).
    // ```typescript
    // constructor(options: { maVariable: string }) {
    //     super(options)
    // }
    // ```
    // Si la création sous cette forme n'est pas utilisée ou si on a pas besoin de cette aide, la déclaration des paramètres dans le constructeur peut alors être la suivante :
    constructor(options: any) {
        super(options)
        /* ... */
    }
    // Comme toutes les autres méthodes, le constructeur peut aussi ne pas être déclaré si on a rien à mettre dedans, puisqu'il est déclaré dans la classe parente.

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

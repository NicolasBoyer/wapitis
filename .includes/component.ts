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

import { render, TemplateResult } from 'lit-html'
import { DOM, JSX, Log, UTILS } from '.'
import { arrayFlat, CSSResult, CSSResultArray } from './css'

/**
 * La directive @customElement permet de créer le nom du composant et de le déclarer comme WebComponent.
 *
 * Elle se place au dessus du nom de la classe. Exemple :
 * ```typescript
 * @customElement('w-todo')
 * export default class Todo extends Component<IProps> {
 * ```
 *
 * @category Directive
 * @param {string} tagName Nom du custom element. Si aucun tagName n'est spécifié, il prend alors le nom ```x-${type.name.toLowerCase()}```
 * @returns Retourne le custom element T avec le nom tagName
 */
export function customElement(tagName?: string) {
    return <T extends HTMLElement>(type: new (options: any) => T) => {
        if (!tagName) {
            tagName = `x-${type.name.toLowerCase()}`
        }
        if (customElements.get(tagName)) {
            return
        }
        customElements.define(tagName, type)
    }
}

/**
 * Paramètres de la directive @property. Trois options possibles :
 * - type : indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (string par défaut)
 * - reflectInAttribute : la propriété est transformée en attribut, de camelCase vers dashCase (true par défaut) et est observable
 * - writeOnly : propriété observable non visible dans l'html rendu mais possible de la créer en html ou en javascript (false par défaut)
 */
export interface IPropertyOptions {
    /**
     * Indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (string par défaut)
     */
    type?: object | string | number | boolean | unknown
    /**
     * La propriété est transformée en attribut, de camelCase vers dashCase (true par défaut) et est observable
     */
    reflectInAttribute?: boolean
    /**
     * Propriété observable non visible dans l'html rendu mais possible de la créer en html ou en javascript (false par défaut)
     */
    writeOnly?: boolean
}

/**
 * La directive @property rend la propriété observable et dynamique. La propriété est aussi accessible lors de la création de la classe via new Class() et intégrée à l'interface : IProps
 *
 * Elle se place à gauche du nom de la propriété. Exemple :
 * ```typescript
 * @property({ type: Boolean }) checked: boolean = false
 * ```
 * @category Directive
 * @param {IPropertyOptions} [options]
 * @returns Retourne la propriété observable
 */
export function property(options?: IPropertyOptions) {
    return (target: object, propertyName?: PropertyKey): any => {
        if (target.hasOwnProperty(propertyName)) {
            return
        }
        (target.constructor as typeof Component).createProperty(propertyName, options)
    }
}

/**
 * Définit les paramètres des methodes du cycle de vie de Component
 *
 * Il s'agit d'une map définit avec l'entrée PropertyKey et la valeur { oldVal: unknown, newVal: unknown } :
 * - oldVal Ancienne valeur de la propriété
 * - newVal Nouvelle valeur de la propriété
 *
 * Map<PropertyKey, { oldVal: unknown, newVal: unknown }>
 */
export type PropertyValues = Map<PropertyKey, { oldVal: unknown, newVal: unknown }>

/**
 * Classe qui étend HTMLElement et qui associée à la directive @customElement permet la création d'un customElement
 *
 * @typeparam T Type générique de la classe définit grâce à la directive customElement
 */
export abstract class Component<T> extends HTMLElement {

    /**
     * Spécifique au web component. Permet de déclarer les propriétés qui seront observés et provoqueront un nouveau rendu via [[render]] et le rappel de [[attributeChangedCallback]]
     *
     * Inutile d'utiliser cette méthode. Elle est appelé automatiquement grâce à la directive @property
     * @returns Retourne un tableau contenant les noms des attributs que vous voulez observer
     */
    static get observedAttributes() {
        return this._observablesAttributes[this._id + '_' + this.name]
    }

    /**
     * Permet de déclarer les styles en utilisant le tag css, exemple :
     * ```typescript
     *   static get styles() {
     *       return css`
     *       :host {
     *           font-family: Arial, Helvetica, sans-serif;
     *           margin: auto;
     *           width: 25rem;
     *           display: flex;
     *           flex-direction: column;
     *           align-items: center;
     *       }
     *       `
     *   }
     * ```
     */
    static styles?: CSSResult | CSSResultArray

    /**
     * Crée une propriété avec son setter et son getter et définit grâce aux options, si elle est observable et l'ajoute en tant qu'attribut, le cas échéant
     *
     * Lors de la création, demande une update et la lance si aucune autre demande n'est en cours. Ce qui amène ensuite à relancer la méthode [[render]]
     *
     * Il n'est ni necessaire ni recommandé d'utiliser cette méthode qui est appelé via la directive @property
     * @param {PropertyKey} name Nom de la propriété
     * @param {IPropertyOptions} [options]
     */
    static createProperty(name: PropertyKey, options?: IPropertyOptions) {
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`
        const classId = this._id + '_' + this.name
        this._propertyOptions[classId + '_' + (name as string)] = options || null
        const reflectPropertyInAttribute = (!options || options && options.reflectInAttribute !== false) && (name as string).charAt(0) !== '_'
        const writeOnly = options && options.writeOnly
        const isBoolean = options && options.type === Boolean
        if (reflectPropertyInAttribute) {
            this._observablesAttributes[classId] = this._observablesAttributes[classId] || []
            this._observablesAttributes[classId].push(name as string)
        }
        Object.defineProperty(this.prototype, name, {
            get(): any {
                const _val = this[key as string]
                // Log.debug("get")
                // Log.debug(`Get: ${name as string} => ${DOM.toString(_val, options && options.type)}`);
                return isBoolean && _val === '' ? true : isBoolean && !_val ? false : _val
            },
            set(this: Component<any>, newVal: unknown) {
                // Log.debug(`Set: ${name as string} => ${DOM.toString(newVal, options && options.type)}`);
                if (!(key as string in this) || key as string in this && this[key as string] !== newVal) {
                    // Log.debug("set")
                    if (!this._changedProperties.has(name)) {
                        this._changedProperties.set(name, { oldVal: this[key as string], newVal })
                    }
                    this[key as string] = newVal
                    const attrName = UTILS.camelCaseToDashCase(name)
                    if (reflectPropertyInAttribute && !writeOnly) {
                        DOM.setAttribute(this, attrName, newVal)
                    }
                    if (writeOnly) {
                        this.removeAttribute(attrName)
                    }
                    this._requestUpdate()
                }
            },
            configurable: true,
            enumerable: true
        })
    }
    private static _observablesAttributes: { [key: string]: string[] } = {}
    private static _propertyOptions: { [key: string]: IPropertyOptions | null } = {}
    private static _id = UTILS.generateId()
    /**
     * Propriété qui permet de définir les attributs lors de l'utilisation de cette classe avec [[JSX]]
     */
    protected _props: T
    private _renderRoot: ShadowRoot
    private _changedProperties: PropertyValues = new Map()
    private _isUpdated: boolean = false
    private _hasConnectedResolver: (() => void) | undefined = undefined
    private _isConnected: boolean = false
    private _styles: string
    private _isStylesAdded: boolean = false
    private _timer = null

    /**
     * Crée une instance de Component
     *
     * @param {T} options Paramètre de type {{ [x: string]: any }}, nécessaire pour la création de la classe sous la forme new({options})
     *
     * Une fois appelées, les propriétés sont automatiquement prises en compte, si elles ont été déclarées sur le composant
     * @returns Retourne le composant avec le nom définit par la directive customElement.
     */
    constructor(options?: T) {
        super()
        for (const name in options) {
            if (options.hasOwnProperty(name) && name in this) {
                (this as { [x: string]: any })[name] = options[name]
            }
        }
        this._renderRoot = this.attachShadow({ mode: 'open' })
        const cssResult = (this.constructor as typeof Component).styles
        this._styles = cssResult && Array.isArray(cssResult) ? arrayFlat(cssResult).join(' ') : cssResult ? cssResult.toString() : ''
        this._requestUpdate()
    }

    /**
     * Spécifique au web component. Appelé lorsque l'élément personnalisé est connecté pour la première fois au DOM du document
     */
    connectedCallback() {
        this._isConnected = true
        if (this._hasConnectedResolver) {
            this._hasConnectedResolver()
            this._hasConnectedResolver = undefined
        }
        Log.debug('connectedCallback')
    }

    /**
     * Spécifique au web component. Appelé lorsque l'élément personnalisé est déconnecté du DOM du document
     */
    disconnectedCallback() {
        //
    }

    /**
     * Spécifique au web component. Si la nouvelle valeur de l'attribut observé est différent de l'ancienne, l'attribut est alords affecté comme propriété. La méthode [[render]] est par conséquent relancée
     *
     * @param {string} attrName Nom de l'attribut
     * @param {*} oldVal Ancienne valeur de l'attribut
     * @param {*} newVal Nouvelle valeur de l'attribut
     */
    attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
        if (oldVal !== newVal) {
            Log.debug('attributeChangedCallback')
            const name = UTILS.dashCaseToCamelCase(attrName)
            const ctor = (this.constructor as typeof Component)
            const options = ctor._propertyOptions[ctor._id + '_' + ctor.name + '_' + name]
            this[name] = UTILS.fromString(newVal, options && options.type)
        }
    }

    /**
     * Permet de conditionner le rendu du composant.
     *
     * [[render]] est appelé si la fonction retourne true. Ce qui est le comportement par défaut.
     *
     * @param {PropertyValues} _changedProperties
     */
    protected shouldUpdate(_changedProperties: PropertyValues): boolean {
        Log.debug('shouldUpdate')
        return true
    }

    /**
     * Appelé avant le rendu du composant. Permet d'interagir avec les éléments à chaque appel du composant avant sa création dans le dom.
     *
     * @param {PropertyValues} _changedProperties
     */
    protected beforeRender(_changedProperties: PropertyValues) {
        Log.debug('beforeRender')
    }

    /**
     * Permet de créer le composant dans le DOM grâce au tag html de lit-html.
     *
     * @returns {(TemplateResult | void)} Retourne un TemplateResult qui est ensuite interprété et permet la mise à jour du DOM
     */
    // tslint:disable-next-line: no-empty
    protected render(): TemplateResult | void { }

    /**
     * Appelé lors de chaque mise à jour du composant
     *
     * Permet de réaliser des tâches après le rendu du composant à chaque appel en utilisant l'API DOM ou les librairies [[DOM]] et [[SHADOWDOM]], par exemple pour le focus d'un élément
     *
     * @param {PropertyValues} _changedProperties
     */
    protected updated(_changedProperties: PropertyValues) {
        Log.debug('updated')
    }

    /**
     * Appelé lors de la première mise à jour du composant
     *
     * Utile pour réaliser des actions qui ne doivent avoir lieu qu'une fois, comme la récupération des différents éléments rendu dans la méthode [[render]]
     *
     * En utilisant les methodes existantes dans les librairies [[DOM]] et [[SHADOWDOM]] de WAPITIS ou l'API DOM, par exemple avec querySelector et la propriété shadowRoot :
     * ``` typescript
     *   this._input = this.shadowRoot!.querySelector('input')
     * ```
     *
     * @param {PropertyValues} _changedProperties
     */
    protected firstUpdated(_changedProperties: PropertyValues) {
        Log.debug('firstUpdated')
    }

    /**
     * Met en attente l'update jusqu'à ce qu'il n'y ait plus de set properties
     *
     * @param {boolean} [isUpdate=false]
     */
    private _requestUpdate(isUpdate: boolean = false) {
        if (isUpdate) {
            clearTimeout(this._timer)
            this._update()
            return
        }
        if (!isUpdate) {
            if (this._timer) {
                clearTimeout(this._timer)
            }
            this._timer = setTimeout(() => this._requestUpdate(true))
            return
        }
    }

    /**
     * Gère le lifecycle
     */
    private async _update() {
        if (!this._isConnected) {
            await new Promise((res) => this._hasConnectedResolver = res)
        }
        if (this._renderRoot && this.shouldUpdate(this._changedProperties)) {
            this.beforeRender(this._changedProperties)
            const templateResult = this.render()
            render(templateResult, this._renderRoot)
            if (!this._isStylesAdded) {
                if (this.querySelector('style[slot=override]')) {
                    const overrideSlot = this._renderRoot.appendChild(JSX.createElement('slot', { name: 'override' })) as HTMLSlotElement
                    const overrideStyle = overrideSlot && overrideSlot.assignedElements()[0]
                    this._renderRoot.removeChild(overrideSlot)
                    if (overrideStyle) {
                        this._renderRoot.insertBefore(overrideStyle, this._renderRoot.firstChild)
                    }
                }
                if (this._styles !== '') {
                    // Polyfill -> A supprimer après intégration de shadowdom et custom elements dans Edge
                    if ((/Edge/.test(navigator.userAgent))) {
                        Array.prototype.slice.call(this._renderRoot.querySelectorAll('link'), 0).forEach(async (link) => {
                            let linkStyle = await UTILS.getFile(link.href)
                            linkStyle = linkStyle.replace(':host', this.tagName)
                            const style = document.createElement('style')
                            style.innerHTML = linkStyle
                            link.parentNode.insertBefore(style, link)
                            link.parentNode.removeChild(link)
                        })
                        this._styles = this._styles.replace(':host', this.tagName)
                    }
                    this._renderRoot.insertBefore(JSX.createElement('style', null, this._styles), this._renderRoot.firstChild)
                }
                this._isStylesAdded = true
                Log.debug('styleadopted')
            }
            if (!this._isUpdated) {
                this.firstUpdated(this._changedProperties)
            }
            this.updated(this._changedProperties)
            if (!this._isUpdated) {
                UTILS.dispatchEvent('componentCreated', this)
            }
            this._isUpdated = true
            this._changedProperties = new Map()
        }

    }
}

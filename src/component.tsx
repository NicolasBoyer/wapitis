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
        customElements.define(tagName, type as unknown as CustomElementConstructor)
    }
}

/**
 * Paramètres de la directive @property. Trois options possibles :
 * - type : indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (string par défaut)
 * - attribute : si true, la propriété est alors répliquée en tant qu'attribut dans l'html. Si false, la propriété reste observable mais non visible en tant qu'attribut dans l'html 'rendu', il est néanmoins possible de la créer en html ou en javascript (true par défaut)
 */
export interface IPropertyOptions<Type = unknown, TypeHint = unknown> {
    /**
     * Indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (`String` par défaut) - `Boolean`, `String`, `Number`, `Object`, `Array`
     */
    type?: TypeHint
    /**
     * Si true, la propriété est alors répliquée en tant qu'attribut dans l'html. Si false, la propriété reste observable mais non visible en tant qu'attribut dans l'html 'rendu', il est néanmoins possible de la créer en html ou en javascript (true par défaut)
     */
    attribute?: boolean
    /**
     * Indique comment convertir un attribut vers une propriété. Si type est défini, alors ce paramètre est inutile. De même, type est inutile si `fromAttribute` est défini. Dans tous les cas, la conversion de la propriété vers l'attribut est automatique. Lorsque type est précisé, la conversion est automatique dans les deux sens (pour les types suivants : `Boolean`, `String`, `Number`, `Object`, and `Array`). `fromAttribute` permet de gérer plus finement la conversion en provenance de l'attribut. Nécessaire lorsqu'un typage particulier est utilisé
     */
    fromAttribute?: (value: string, type?: TypeHint) => Type
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
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
 * @noInheritDoc
 * @typeparam T Type générique de la classe définit grâce à la directive customElement
 */
export abstract class Component extends HTMLElement {
    /**
     * Si true, les logs spécifiés dans le composant Component sont publiés. False par défaut
     */
    protected showInternalLog = false

    /**
     * Spécifique au web component. Permet de déclarer les propriétés qui seront observées et provoqueront un nouveau rendu via [[render]] et le rappel de [[attributeChangedCallback]]
     *
     * Inutile d'utiliser cette méthode. Elle est appelé automatiquement grâce à la directive @property
     * @returns Retourne un tableau contenant les noms des attributs que vous voulez observer
     */
    static get observedAttributes(): string[] {
        // Récupère et déclare les propriétés du composant parent si celui-ci est un Component de Wapitis
        const superCtor = Object.getPrototypeOf(this)
        if (superCtor.name !== 'Component') {
            const superProperties = Object.keys(superCtor.prototype).filter((name) => typeof Object.getOwnPropertyDescriptor(superCtor.prototype, name).get === 'function')
            superProperties.forEach((prop) => {
                if (!Object.keys(this._propertyOptions).includes(this._id + '_' + this.name + '_' + prop)) {
                    Object.keys(superCtor._propertyOptions).forEach((option) => {
                        if (option.includes(superCtor.name + '_' + prop)) {
                            this.createProperty(prop, superCtor._propertyOptions[option])
                        }
                    })
                }
            })
        }
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
     * Crée une propriété avec son setter et son getter et définit, grâce aux options, si elle est observable et l'ajoute en tant qu'attribut, le cas échéant
     *
     * Lors de la création, demande une update et la lance si aucune autre demande n'est en cours. Ce qui amène ensuite à relancer la méthode [[render]]
     *
     * Il n'est ni necessaire ni recommandé d'utiliser cette méthode qui est appelée via la directive @property
     * @param {PropertyKey} name Nom de la propriété
     * @param {IPropertyOptions} [options]
     */
    static createProperty(name: PropertyKey, options?: IPropertyOptions): void {
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`
        const classId = this._id + '_' + this.name
        this._propertyOptions[classId + '_' + (name as string)] = options || null
        const reflectPropertyInAttribute = !(name as string).startsWith('_')
        const attribute = !options || options && options.attribute !== false
        const isBoolean = options && options.type === Boolean
        if (reflectPropertyInAttribute) {
            this._observablesAttributes[classId] = this._observablesAttributes[classId] || []
            const attrName = (name as string).toLowerCase()
            this._observablesAttributes[classId].push(attrName)
            this._attributesToProperties[attrName] = name
        }
        Object.defineProperty(this.prototype, name, {
            get(): any {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const _val = this[key as string]
                // Log.debug("get")
                // Log.debug(`Get: ${name as string} => ${DOM.toString(_val, options && options.type)}`);
                return isBoolean && _val === '' ? true : isBoolean && !_val ? false : _val
            },
            set(this: Component, newVal: unknown) {
                // Log.debug(`Set: ${name as string} => ${DOM.toString(newVal, options && options.type)}`);
                if (!(key as string in this) || key as string in this && this[key as string] !== newVal) {
                    // Log.debug("set")
                    const oldVal = this[key as string]
                    this._changedProperties.set(name, { oldVal, newVal })
                    this[key as string] = newVal
                    const attrName = (name as string).toLowerCase()
                    if (reflectPropertyInAttribute && attribute) {
                        DOM.setAttribute(this, attrName, newVal)
                    }
                    if (!attribute) {
                        this.removeAttribute(attrName)
                        if (oldVal !== newVal) {
                            this._setPropertyValue(name as string, newVal)
                        }
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
    /** Fait le lien entre le nom de la propriété et celui de l'attribut. Ainsi, si le nom de la propriété est en camelCase, il est alors transformé en minuscule. On peut alors facilement retrouver le nom de la propriété via l'attribut */
    private static _attributesToProperties: { [key: string]: string | number | symbol } = {}
    /**
     * Propriété qui permet de définir les attributs lors de l'utilisation de cette classe avec [[JSX]]
     */
    protected _props: any
    private _renderRoot: ShadowRoot
    private _changedProperties: PropertyValues = new Map()
    private _isUpdated = false
    private _hasConnectedResolver: (() => void) | undefined = undefined
    private _isConnected = false
    private _styles: string
    private _isStylesAdded = false
    private _timer = null

    /**
     * Crée une instance de Component
     *
     * @param {T} options Paramètre de type {{ [x: string]: any }}, nécessaire pour la création de la classe sous la forme new({options})
     *
     * Une fois appelées, les propriétés sont automatiquement prises en compte, si elles ont été déclarées sur le composant
     * @returns Retourne le composant avec le nom définit par la directive customElement.
     */
    constructor(options?: any) {
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
    connectedCallback(): void {
        this._isConnected = true
        if (this._hasConnectedResolver) {
            this._hasConnectedResolver()
            this._hasConnectedResolver = undefined
        }
        if (this.showInternalLog) {
            Log.debug(this.constructor.name + ' - connectedCallback')
        }
    }

    /**
     * Spécifique au web component. Appelé lorsque l'élément personnalisé est déconnecté du DOM du document
     */
    disconnectedCallback(): void {
        //
    }

    /**
     * Spécifique au web component. Si la nouvelle valeur de l'attribut observé est différente de l'ancienne, l'attribut est alors affecté comme propriété. La méthode [[render]] est par conséquent relancée
     *
     * @param {string} attrName Nom de l'attribut
     * @param {*} oldVal Ancienne valeur de l'attribut
     * @param {*} newVal Nouvelle valeur de l'attribut
     */
    attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void {
        if (oldVal !== newVal) {
            if (this.showInternalLog) {
                Log.debug(this.constructor.name + ' - attributeChangedCallback')
            }
            this._setPropertyValue(attrName, newVal)
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
        if (this.showInternalLog) {
            Log.debug(this.constructor.name + ' - shouldUpdate')
        }
        return true
    }

    /**
     * Appelé avant le rendu du composant. Permet d'interagir avec les éléments à chaque appel du composant avant sa création dans le dom
     *
     * @param {PropertyValues} _changedProperties
     */
    protected beforeRender(_changedProperties: PropertyValues): void {
        if (this.showInternalLog) {
            Log.debug(this.constructor.name + ' - beforeRender')
        }
    }

    /**
     * Permet de créer le composant dans le DOM grâce au tag html de lit-html
     *
     * @returns {(TemplateResult | void)} Retourne un TemplateResult qui est ensuite interprété et permet la mise à jour du DOM
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected render(): TemplateResult | void { }

    /**
     * Appelé lors de chaque mise à jour du composant
     *
     * Permet de réaliser des tâches après le rendu du composant à chaque appel en utilisant l'API DOM ou les librairies [[DOM]] et [[SHADOWDOM]], par exemple pour le focus d'un élément
     *
     * @param {PropertyValues} _changedProperties
     */
    protected updated(_changedProperties: PropertyValues): void {
        if (this.showInternalLog) {
            Log.debug(this.constructor.name + ' - updated')
        }
    }

    /**
     * Appelé lors de la première mise à jour du composant
     *
     * Utile pour réaliser des actions qui ne doivent avoir lieu qu'une fois, comme la récupération des différents éléments rendus dans la méthode [[render]], , en utilisant les méthodes existantes dans les librairies [[DOM]] et [[SHADOWDOM]] de WAPITIS ou l'API DOM. Par exemple avec querySelector et la propriété shadowRoot :
     * ``` typescript
     *   this._input = this.shadowRoot!.querySelector('input')
     * ```
     *
     * @param {PropertyValues} _changedProperties
     */
    protected firstUpdated(_changedProperties: PropertyValues): void {
        if (this.showInternalLog) {
            Log.debug(this.constructor.name + ' - firstUpdated')
        }
    }

    /**
     * Assigne une valeur `value` à la propriété `propName`
     *
     * @private
     * @param {string} propName
     * @param {unknown} value
     */
    private _setPropertyValue(propName: string, value: unknown): void {
        const ctor = (this.constructor as typeof Component)
        const name = ctor._attributesToProperties[propName.toLowerCase()] || propName
        const options = ctor._propertyOptions[ctor._id + '_' + ctor.name + '_' + (name as string)]
        this[name] = options.fromAttribute ? options.fromAttribute(value as string, options && options.type) : UTILS.fromString(value as string, options && options.type)
    }

    /**
     * Met en attente l'update jusqu'à ce qu'il n'y ait plus de set properties
     *
     * @param {boolean} [isUpdate=false]
     */
    private _requestUpdate(isUpdate = false): void {
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
        }
    }

    /**
     * Gère le lifecycle
     */
    private async _update(): Promise<void> {
        if (!this._isConnected) {
            // eslint-disable-next-line promise/param-names
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
                    if ((navigator.userAgent.includes('Edge'))) {
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
                if (this.showInternalLog) {
                    Log.debug(this.constructor.name + ' - styleadopted')
                }
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

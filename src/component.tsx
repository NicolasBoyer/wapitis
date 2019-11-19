import { render, TemplateResult } from 'lit-html'
import { DOM, JSX, Log, UTILS } from '.'
import { arrayFlat, CSSResult, CSSResultArray } from './css'

/**
 *
 *
 * @export
 * @param {string} tagName
 * @returns
 */
export const customElement = (tagName?: string) => {
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
 * Trois options possibles :
 * - type : indique le type à utiliser lors du passage de la propriété à l'attribut et inversement (string par défaut)
 * - reflectInAttribute : la propriété est transformée en attribut, de camelCase vers dashCase (true par défaut) et est observable
 * - writeOnly : propriété observable non visible dans l'html rendu mais possible de la créer en html ou en javascript (false par défaut)
 *
 * @export
 * @interface PropertyOptions
 */
export interface IPropertyOptions {
    /**
     *
     *
     * @type {(object | string | number | boolean | unknown)}
     * @memberof PropertyOptions
     */
    type?: object | string | number | boolean | unknown
    reflectInAttribute?: boolean
    writeOnly?: boolean
}

/**
 * Rend la propriété observable et dynamique. La propriété est aussi accessible lors de la création de la classe via new Class() et intégrée à l'interface : IComponentOpts
 *
 * @export
 * @param {IPropertyOptions} [options]
 * @returns
 */
export function property(options?: IPropertyOptions) {
    return (target: object, propertyName?: PropertyKey): any => {
        if (target.hasOwnProperty(propertyName)) {
            return
        }
        (target.constructor as typeof Component).createProperty(propertyName, options)
    }
}

export type PropertyValues = Map<PropertyKey, { oldVal: unknown, newVal: unknown }>

/**
 *
 *
 * @export
 * @abstract
 * @class Component
 * @extends {HTMLElement}
 * @template T
 */
export abstract class Component<T> extends HTMLElement {

    /**
     *
     *
     * @readonly
     * @static
     * @memberof Component
     */
    static get observedAttributes() {
        return this._observablesAttributes[this._id + '_' + this.name]
    }

    /**
     *
     *
     * @static
     * @type {(CSSResult | CSSResultArray)}
     * @memberof Component
     */
    static styles?: CSSResult | CSSResultArray

    /**
     *
     *
     * @static
     * @param {PropertyKey} name
     * @param {IPropertyOptions} [options]
     * @returns
     * @memberof Component
     */
    static createProperty(name: PropertyKey, options?: IPropertyOptions) {
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`
        const classId = this._id + '_' + this.name
        this._propertyOptions[classId + '_' + (name as string)] = options || null
        const reflectPropertyInAttribute = (!options || options && options.reflectInAttribute !== false) && (name as string).charAt(0) !== '_'
        const writeOnly = options && options.writeOnly
        if (reflectPropertyInAttribute) {
            this._observablesAttributes[classId] = this._observablesAttributes[classId] || []
            this._observablesAttributes[classId].push(name as string)
        }
        Object.defineProperty(this.prototype, name, {
            get(): any {
                const _val = this[key as string]
                // Log.debug("get")
                // Log.debug(`Get: ${name as string} => ${DOM.toString(_val, options && options.type)}`);
                return _val
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
     * Crée une instance de Component.
     * @param {{ [x: string]: any }} [options] nécessaire pour la création sour la forme new({options}). Une fois appelées, les propriétés sont automatiquement prises en compte si elles ont été déclarées sur le composant.
     * @memberof Component
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

    connectedCallback() {
        this._isConnected = true
        if (this._hasConnectedResolver) {
            this._hasConnectedResolver()
            this._hasConnectedResolver = undefined
        }
        Log.debug('connectedCallback')
    }

    disconnectedCallback() {
        //
    }

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
     * Contrôle si `update` doit être appelé ou non. Par défaut, cette méthode est toujours à true, mais peut être modifiée ici
     *
     * @param _changedProperties Map des propriétés en cours de changements avec les anciennes et les nouvelles valeurs
     */
    protected shouldUpdate(_changedProperties: PropertyValues): boolean {
        Log.debug('shouldUpdate')
        return true
    }

    /**
     *
     *
     * @protected
     * @param {PropertyValues} _changedProperties
     * @memberof Component
     */
    protected beforeRender(_changedProperties: PropertyValues) {
        Log.debug('beforeRender')
    }

    /**
     *
     *
     * @protected
     * @returns {(TemplateResult | void)}
     * @memberof Component
     */
    // tslint:disable-next-line: no-empty
    protected render(): TemplateResult | void { }

    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @protected
     * @param {PropertyValues} _changedProperties Map of changed properties with old values
     * @memberof Component
     */
    protected updated(_changedProperties: PropertyValues) {
        Log.debug('updated')
    }

    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    protected firstUpdated(_changedProperties: PropertyValues) {
        Log.debug('firstUpdated')
    }

    /**
     * Met en attente l'update jusqu'à ce qu'il n'y ait plus de set properties
     *
     * @private
     * @param {boolean} [isUpdate=false]
     * @memberof Component
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
     *
     * @private
     * @memberof Component
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

import { directive, PropertyPart } from 'lit-html'
import { DOM } from './dom'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UTILS = {
    /**
     * Transforme une string dans le type renseigné
     *
     * @param {(string | null)} value Chaîne à transformer
     * @param {unknown} type Type dans lequel transformer la chaîne : Boolean, Number, Object, Array, ...
     * @returns
     */
    fromString(value: string | null, type?: unknown): any {
        switch (type) {
            case Boolean:
                return value === 'true' || value === '' ? '' : null
            case Number:
                return Number(value)
            case Object:
            case Array:
                return JSON.parse(value)
        }
        return value
    },

    /**
     * Transforme une valeur du type renseigné en string
     *
     * @param {unknown} value La valeur à transformer en string
     * @param {unknown} type Type de la valeur à transformer : Boolean, Number, Object, Array, ...
     * @returns {unknown}
     */
    toString(value: unknown, type?: unknown): unknown {
        return type === Object || type === Array || typeof value === 'object' ? JSON.stringify(value) : JSON.parse(value as string)
    },

    /**
     * Transforme une chaîne du type camelCase en DashCase
     *
     * @param {*} name Chaîne à transformer
     * @returns
     */
    camelCaseToDashCase(name: any): any {
        return name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    },

    /**
     * Transforme une chaîne du type DashCase en camelCase
     *
     * @param {*} name Chaîne à transformer
     * @returns
     */
    dashCaseToCamelCase(name: any): any {
        return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    },

    /**
     * Retourne un id de type string
     *
     * @returns
     */
    generateId(): string {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    },

    /**
     * Envoie un customEvent sur l'élément parent, avec les propriétés renseignées dans property
     *
     * @param {string} name Nom du custom Event
     * @param {object} property Propriétés à envoyer
     * @param {HTMLElement} parent Elément sur lequel le custom event est envoyé, document.body par défaut
     */
    dispatchEvent(name: string, property: object, parent: HTMLElement = document.body): void {
        const event = new CustomEvent(name, { detail: property })
        parent.dispatchEvent(event)
    },

    /**
     * Retourne la taille et la position de la fenêtre web courante
     *
     * @returns Retourne { width: number, height: number, top: number, left: number }
     */
    getWindowSize(): { width: number, height: number, top: number, left: number } {
        const window = document.createElement('div')
        window.style.position = 'absolute'
        window.style.top = '0px'
        window.style.bottom = '0px'
        window.style.left = '0px'
        window.style.right = '0px'
        window.style.zIndex = '0'
        document.body.appendChild(window)
        const windowsize: { width: number, height: number, top: number, left: number } = { width: window.offsetWidth, height: window.offsetHeight, top: window.offsetTop, left: window.offsetLeft }
        document.body.removeChild(window)
        return windowsize
    },

    /**
     * Retourne le texte contenu dans le fichier spécifié de façon asynchrone
     *
     * @param {string} url Url du fichier à traiter
     * @returns
     */
    async getFile(url: string): Promise<any> {
        const response = await fetch(url)
        const text = await response.text()
        try {
            return JSON.parse(text)
        } catch (err) {
            return text
        }
    },

    /**
     * Enregistre les données dans la clé spécifiée en local storage
     *
     * @typeparam T Le type des données à sauvegarder
     * @param {string} key La clé à utiliser pour sauvegarder les données
     * @param {T} datas Les données à sauvegarder
     */
    save<T>(key: string, datas: T): void {
        // Mettre en place la possibilité de sauvegarder le fichier via file et blob cf truc save
        localStorage.setItem(key, JSON.stringify(datas))
    },

    /**
     * Retourne les données spécifiées dans la clé en local storage
     *
     * @typeparam T Le type des données à retourner
     * @param {string} key La clé à utiliser pour charger les données
     * @returns {T} Retourne les données
     */
    load<T>(key: string): T {
        const datas = localStorage.getItem(key) || '{}'
        return JSON.parse(datas)
    },

    /**
     * Directive transformant des propriétés de types objet `{ [key: string]: unknown }` en attribut compréhensible par lit-html et le tag html.
     *
     * Cela est particulièrement utile dans le cas de données externes.
     *
     * @author open-wc@ (open-wc). Adapdée à Wapitis
     *
     * Comme toute directive, propsToAttributes est utilisé dans un tag html. Avec la syntaxe de lit-html, il est nécessaire de déclarer un attribut pour appliquer cette directive. Nous utilisons ici la convention `...=`, bien que n'importe quel nom d'attibut puisse être utilisé. Exemple :
     *
     * ```typescript
     * html`
     *      <div ...="${propsToAttributes({ propertyA: 'a', propertyB: 'b' })}"></div>
     * `
     * ```
     *
     * @param {{ [key: string]: unknown }} props Les propriétés de type `{ [key: string]: unknown }` à transformer
     */
    propsToAttributes: directive((props: { [key: string]: unknown }) => (part: PropertyPart) => {
        const previousProps = new WeakMap()
        const prev = previousProps.get(part)
        if (prev === props) {
            return
        }
        previousProps.set(part, props)
        if (props) {
            // tslint:disable-next-line: forin
            for (const key in props) {
                const value = props[key]
                if (!prev || prev[key] !== value) {
                    DOM.setAttribute(part.committer.element as HTMLElement, key, value)
                }
            }
        }
        if (prev) {
            for (const key in prev) {
                if (!props || !(key in props)) {
                    part.committer.element.removeAttribute(key)
                }
            }
        }
    }),

    /**
     * Retourne une string utilisable dans une url (contenant toujours les / et les :)
     *
     * @param {string} str La chaîne à traiter
     * @param {{ isPath: boolean, replacementChar: string }} [options={ isPath: true, replacementChar: '_' }] isPath Ne tramsforme pas les / et les :, utile pour créer une route ou un path, replacementChar Le caractère de remplacement utilisé, _ par défaut
     */
    slugify(str: string, options?: { isPath?: boolean, replacementChar?: string }): string {
        const isPath = options && options.isPath !== undefined ? options.isPath : true
        const replacementChar = options && options.replacementChar || '_'
        const a = 'ãàáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/-,:;'
        // eslint-disable-next-line quotes
        const b = isPath ? `aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh${replacementChar}/${replacementChar}${replacementChar}:${replacementChar}` : `aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh${replacementChar}${replacementChar}${replacementChar}${replacementChar}${replacementChar}${replacementChar}`
        const p = new RegExp(a.split('').join('|'), 'g')

        str = str.toString().toLowerCase()
            .replace(/\s+/g, replacementChar) // Replace spaces with _
            .replace(p, c =>
                b.charAt(a.indexOf(c))) // Replace special chars
            .replace(/&/g, replacementChar + 'and' + replacementChar) // Replace & with 'and'
            .replace(/--+/g, replacementChar) // Replace multiple - with single _
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
        return isPath ? str : str.replace(/[^\w-]+/g, '') // Remove all non-word chars
    },

    /**
     * Retourne un id de type number en fonction de la chaîne de caratères passée en paramètre
     *
     * @param {string} str La chaîne de caractères à utitliser
     */
    generateIdFromString(str: string): number {
        let hash = 0
        if (str.length === 0) {
            return hash
        }
        for (let i = 0; i < str.length; i++) {
            const charcode = str.charCodeAt(i)
            // eslint-disable-next-line no-bitwise
            hash = ((hash << 5) - hash) + charcode
            // eslint-disable-next-line no-bitwise
            hash |= 0
        }
        return hash
    }
}

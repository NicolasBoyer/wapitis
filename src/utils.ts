// tslint:disable-next-line:no-namespace
export namespace UTILS {
    /**
     * Transforme une string dans le type renseigné
     *
     * @param {(string | null)} value Chaîne à transformer
     * @param {unknown} type Type dans lequel transformer la chaine : Boolean, Number, Object, Array, ...
     * @returns
     */
    export function fromString(value: string | null, type?: unknown) {
        switch (type) {
            case Boolean:
                return value || value === '' ? '' : null
            case Number:
                return Number(value)
            case Object:
            case Array:
                return JSON.parse(value)
        }
        return value
    }

    /**
     * Transforme une valeur du type renseigné en string
     *
     * @param {unknown} value La valeur à transformer en string
     * @param {unknown} type Type de la valeur à transformer : Boolean, Number, Object, Array, ...
     * @returns {unknown}
     */
    export function toString(value: unknown, type?: unknown): unknown {
        return type === Object || type === Array || typeof value === 'object' ? JSON.stringify(value) : JSON.parse(value as string)
    }

    /**
     * Transforme une chaine du type camelCase en DashCase
     *
     * @param {*} name Chaîne à transformer
     * @returns
     */
    export function camelCaseToDashCase(name) {
        return name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    }

    /**
     * Transforme une chaine du type DashCase en camelCase
     *
     * @param {*} name Chaîne à transformer
     * @returns
     */
    export function dashCaseToCamelCase(name) {
        return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    }

    /**
     * Retourne un id de type string
     *
     * @returns
     */
    export function generateId() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    }

    /**
     * Envoie un customEvent sur l'élément parent, avec les propriétés renseignés dans property
     *
     * @param {string} name Nom du custom Event
     * @param {object} property Propriétés à envoyer
     * @param {HTMLElement} parent Element sur lequel le custom event est envoyé, document.body par défaut
     */
    export function dispatchEvent(name: string, property: object, parent: HTMLElement = document.body) {
        const event = new CustomEvent(name, { detail: property })
        parent.dispatchEvent(event)
    }

    /**
     * Retourne la taille et la position de la fenêtre web courante
     *
     * @returns Retourne { width: number, height: number, top: number, left: number }
     */
    export function getWindowSize() {
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
    }

    /**
     * Retourne le texte contenu dans le fichier spécifié de façon asynchrone
     *
     * @param {string} url Url du fichier à traiter
     * @returns
     */
    export async function getFile(url: string) {
        const response = await fetch(url)
        const text = await response.text()
        try {
            return JSON.parse(text)
        } catch (err) {
            return text
        }
    }

    /**
     * Enregistre les données dans la clé spécifié en local storage
     *
     * @typeparam T Le type des données à sauvegarder
     * @param {string} key La clé à utiliser pour sauvegarder les données
     * @param {T} datas Les données à sauvegarder
     */
    export function save<T>(key: string, datas: T): void {
        // Mettre en place la possibilité de sauvegarder le fichier via file et blob cf truc save
        localStorage.setItem(key, JSON.stringify(datas))
    }

    /**
     * Retourne les données spécifié dans la clé en local storage
     *
     * @typeparam T Le type des données à retourner
     * @param {string} key La clé à utiliser pour charger les données
     * @returns {T} Retourne les données
     */
    export function load<T>(key: string): T {
        const datas = localStorage.getItem(key) || '{}'
        return JSON.parse(datas)
    }
}

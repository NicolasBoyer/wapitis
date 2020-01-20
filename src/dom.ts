import { html, TemplateResult } from 'lit-html'
import { UTILS } from '.'

// tslint:disable-next-line:no-namespace
export namespace DOM {
    /**
     * Assigne l'attribut spécifié et sa valeur à l'élément spécifié
     *
     * @param {HTMLElement} element L'élément sur lequel l'attribut est affecté
     * @param {string} name Nom de l'attribut
     * @param {*} value Valeur de l'attribut
     * @param {boolean} isStyle Si true, ajoute en tant que que style
     */
    export function setAttribute(element: HTMLElement, name: string, value: any, isStyle?: boolean) {
        try {
            if (value !== null) {
                value = UTILS.toString(value)
                if (isStyle && (Number(value) || value === 0)) {
                    const style: any = name
                    element.style[style] = value + 'px'
                }
            }
        } catch (e) {
            //
        }
        if (value !== null) {
            element.setAttribute(name, String(value))
        } else {
            element.removeAttribute(name)
        }
    }

    /**
     * Transforme un style en nombre
     *
     * @param {(string | null)} style Le style à transformer
     * @returns
     */
    export function parseStyleToNumber(style: string | null) {
        return parseInt(String(style), 10)
    }

    /**
     * Supprime la classe contenant le préfix renseigné
     *
     * @param {HTMLElement} element L'élément sur lequel la classe sera supprimée
     * @param {string} prefix Le préfix de la classe à supprimer
     */
    export function removeClassByPrefix(element: HTMLElement, prefix: string) {
        const regx = new RegExp('\\b' + prefix + '.*?\\b', 'g');
        [...element.classList].map((className) => regx.test(className) && element.classList.remove(className))
    }

    /**
     * Assigne la propriété renseignée dans le style si la valeur est différente
     *
     * @param {HTMLElement} element L'élément sur lequel le style est appliqué
     * @param {string} name Le nom du style à assigner
     * @param {string} value La valeur du style à assigner
     * @returns {boolean} Retourne true si le style est appliqué
     */
    export function setStyle(element: HTMLElement, name: string, value: string): boolean {
        if (element.style.getPropertyValue(name) !== value) {
            element.style.setProperty(name, value)
            return true
        }
        return false
    }

    /**
     * Crée un composant `tag` contenant les attributs et l'enfant passés en paramètres
     *
     * @param {string} tag Nom du futur composant
     * @param {{ [key: string]: unknown }} attributes Attributs du futur composant
     * @param {TemplateResult} children Enfant du futur composant
     * @returns {TemplateResult} Retourne un TemplateResult à appeler avec le tag html
     * ```typescript
     *  return html`
     *      ${this.createComponent(this.tag, { class: this.type + (this.position && ' ' + this.position) + (this.class && ' ' + this.class) }, html`<slot></slot>`)}
     *  `
     * ```
     */
    export function createComponent(tag: string, attributes?: { [key: string]: unknown }, children?: TemplateResult) {
        const template = html`
            <${tag} ...=${UTILS.propsToAttributes(attributes)}>
                ${children}
            </${tag}>
        `
        const record: any = [`<${tag} ...=`, '>', `</${tag}>`]
        return html(record, ...(template.values.filter((value) => value !== tag)))
    }
}

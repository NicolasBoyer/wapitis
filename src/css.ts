const constructionToken = Symbol()
/**
 * @ignore
 */
export class CSSResult {
    readonly cssText?: string

    constructor(cssText: string, safeToken: symbol) {
        if (safeToken !== constructionToken) { throw new Error('Erreur : Utilez `unsafeCSS` ou `css`.') }
        this.cssText = cssText
    }

    toString = (): string => this.cssText
}

/**
 * Permet d'insérer un champ de string qui n'est pas un CSSResult et n'a donc pas été traité par un tag CSS dans la string litteral inclus dans le tag CSS
 *
 * A utiliser si nécessaire, mais passer de préférence par le tag css qui est plus sur
 *
 * Exemple via le tag css :
 * ```typescript
 * const mainColor = css`red`;
 * ...
 * static get styles() {
 *    return css`
 *      div { color: ${mainColor} }
 *    `;
 * }
 * ```
 * Exemple via le tag unsafeCSS :
 * ```typescript
 * static get styles() {
 *    const mainColor = 'red';
 *    return css`
 *      div { color: ${unsafeCSS(mainColor)} }
 *    `;
 *  }
 * ```
 * @param {unknown} value
 * @returns
 */
export const unsafeCSS = (value: unknown): CSSResult => new CSSResult(String(value), constructionToken)

const textFromCSSResult = (value: CSSResult | number): string | number => {
    if (value instanceof CSSResult) {
        return value.cssText
    } else if (typeof value === 'number') {
        return value
    } else {
        throw new Error('Erreur : Utilez `unsafeCSS` pour passer des valeurs sans `css`. Mais attention à la sécurité de vos pages')
    }
}

/**
 * @ignore
 */
export function arrayFlat(
    styles: CSSResultArray, result: CSSResult[] = []): CSSResult[] {
    for (let i = 0, length = styles.length; i < length; i++) {
        const value = styles[i]
        if (Array.isArray(value)) {
            arrayFlat(value, result)
        } else {
            result.push(value)
        }
    }
    return result
}

/**
 * Tag permettant d'insérer du CSS dans la propriété styles du composant. Exemple :
 * ```typescript
 * static get styles() {
 *     return css`
 *     :host {
 *         font-family: Arial, Helvetica, sans-serif;
 *         margin: auto;
 *         width: 25rem;
 *         display: flex;
 *         flex-direction: column;
 *         align-items: center;
 *     }
 *     `
 * }
 * ```
 * ou avec un array pour par exemple hériter des styles du parent :
 * ```typescript
 * static get styles() {
 *     const mainColor = css`red`
 *     return [
 *         super.styles,
 *         css`
 *         :host {
 *             display: block;
 *             text-align: center;
 *         }
 *         `
 *     ]
 * }
 * ```
 * @param {TemplateStringsArray} strings
 * @param {(...Array<CSSResult | number>)} values
 * @returns
 */
export const css = (strings: TemplateStringsArray, ...values: Array<CSSResult | number>): CSSResult => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0])
    return new CSSResult(cssText, constructionToken)
}

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/interface-name-prefix, @typescript-eslint/no-empty-interface
export interface CSSResultArray extends Array<CSSResult | CSSResultArray> { }

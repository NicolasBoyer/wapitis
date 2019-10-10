const constructionToken = Symbol()
export class CSSResult {
    readonly cssText: string

    constructor(cssText: string, safeToken: symbol) {
        if (safeToken !== constructionToken) { throw new Error('Erreur : Utilez `unsafeCSS` ou `css`.') }
        this.cssText = cssText
    }

    toString = (): string => this.cssText
}

export const unsafeCSS = (value: unknown) => new CSSResult(String(value), constructionToken)

const textFromCSSResult = (value: CSSResult | number) => {
    if (value instanceof CSSResult) {
        return value.cssText
    } else if (typeof value === 'number') {
        return value
    } else {
        throw new Error('Erreur : Utilez `unsafeCSS` pour passer des valeurs sans `css`. Mais attention à la sécurité de vos pages')
    }
}

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

export const css = (strings: TemplateStringsArray, ...values: Array<CSSResult | number>) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0])
    return new CSSResult(cssText, constructionToken)
}

// tslint:disable-next-line: interface-name
export interface CSSResultArray extends Array<CSSResult | CSSResultArray> { }

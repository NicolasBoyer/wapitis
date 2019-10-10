import { UTILS } from '.'

// tslint:disable-next-line:no-namespace
export namespace DOM {
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

    export function parseStyleToNumber(style: string | null) {
        return parseInt(String(style), 10)
    }

    export function removeClassByPrefix(element: HTMLElement, prefix: string) {
        const regx = new RegExp('\\b' + prefix + '.*?\\b', 'g');
        [...element.classList].map((className) => regx.test(className) && element.classList.remove(className))
    }

    export function setStyle(element: HTMLElement, name: string, value: string): boolean {
        if (element.style.getPropertyValue(name) !== value) {
            element.style.setProperty(name, value)
            return true
        }
        return false
    }
}

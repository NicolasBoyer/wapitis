// tslint:disable-next-line:no-namespace
export namespace UTILS {
    export function fromString(value: string | null, type?: unknown) {
        switch (type) {
            case Boolean:
                return JSON.parse(value) || false
            case Number:
                return Number(value)
            case Object:
            case Array:
                return JSON.parse(value)
        }
        return value
    }

    export function toString(value: unknown, type?: unknown): unknown {
        return type === Object || type === Array || typeof value === 'object' ? JSON.stringify(value) : JSON.parse(value as string)
    }

    export function camelCaseToDashCase(name) {
        return name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
    }

    export function dashCaseToCamelCase(name) {
        return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    }

    export function generateId() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    }

    export function dispatchEvent(name: string, property: object, parent: HTMLElement = document.body) {
        const event = new CustomEvent(name, { detail: property })
        parent.dispatchEvent(event)
    }

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

    export async function getFile(url: string) {
        const response = await fetch(url)
        const text = await response.text()
        try {
            return JSON.parse(text)
        } catch (err) {
            return text
        }
    }
}

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        interface Element extends HTMLElement {
            [key: string]: any
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        interface ElementAttributesProperty {
            _props: any
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        interface IntrinsicElements {
            [key: string]: any
        }
    }
}

export class JSXServices {
    public createElement(tag: string | typeof HTMLElement, attributes: { [name: string]: unknown }, ...children: unknown[]): Element {
        let element: HTMLElement
        if (typeof tag === 'string') {
            element = document.createElement(tag)
        } else {
            // eslint-disable-next-line new-cap
            element = new (tag)()
        }
        // Add attributes
        for (const name in attributes) {
            if (name && attributes.hasOwnProperty(name)) {
                (element)[name] = attributes[name]
            }
        }
        // Append children
        for (const child of children) {
            JSX.appendChildren(element, child)
        }
        return element
    }

    appendChildren(element: Element | DocumentFragment, children: unknown): void {
        if (Array.isArray(children)) {
            children.forEach((ch) => JSX.appendChildren(element, ch))
        } else if (children instanceof Node) {
            element.appendChild(children)
        } else {
            element.appendChild(document.createTextNode(String(children)))
        }
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const JSX: JSXServices = new JSXServices()

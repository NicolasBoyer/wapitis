/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/interface-name-prefix
        interface Element extends HTMLElement {
            [key: string]: any
        }
        // eslint-disable-next-line @typescript-eslint/interface-name-prefix
        interface ElementAttributesProperty {
            _props: any
        }
        // eslint-disable-next-line @typescript-eslint/interface-name-prefix
        interface IntrinsicElements {
            [key: string]: any
        }
    }
}

export class JSXServices {
    public createElement(tag: string | typeof HTMLElement, attributes: { [name: string]: any }, ...children: any[]): Element {
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
                (element as any)[name] = attributes[name]
            }
        }
        // Append children
        for (const child of children) {
            JSX.appendChildren(element, child)
        }
        return element
    }

    appendChildren(element: Element | DocumentFragment, children: any): void {
        if (Array.isArray(children)) {
            children.forEach((ch) => JSX.appendChildren(element, ch))
        } else if (children instanceof Node) {
            element.appendChild(children)
        } else {
            element.appendChild(document.createTextNode(children))
        }
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const JSX: JSXServices = new JSXServices()

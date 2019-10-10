declare global {
    namespace JSX {
        // tslint:disable-next-line: interface-name
        interface Element extends HTMLElement {
            [key: string]: any
        }
        // tslint:disable-next-line: interface-name
        interface ElementAttributesProperty {
            _props: any
        }
        // tslint:disable-next-line: interface-name
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
            element = new (tag as typeof HTMLElement)()
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

    appendChildren(element: Element | DocumentFragment, children: any) {
        if (Array.isArray(children)) {
            children.forEach((ch) => JSX.appendChildren(element, ch))
        } else if (children instanceof Node) {
            element.appendChild(children)
        } else {
            element.appendChild(document.createTextNode(children))
        }
    }
}

export const JSX: JSXServices = new JSXServices()

declare global {
    namespace JSX {
        // On considère tout élément JSX comme un HTMLElement
        interface Element extends HTMLElement {
            [key: string]: any;
        }
        interface ElementAttributesProperty {
            _jsxProps: any;  
		}
        interface IntrinsicElements {
            [key: string]: any;
        }
    }
}

export interface IConstructor<T> {
    new(): T;
}

export class JSXServices {
    /** API React. */
    public createElement(tag: string | IConstructor<HTMLElement>, attributes: { [name: string]: any }, ...children: any[]): Element {
        let element: HTMLElement;
        if (typeof tag === "string") {
            element = document.createElement(tag);
        } else {
            element = new tag();
        }
        // Add attributes
        for (const name in attributes) {
            if (name && attributes.hasOwnProperty(name)) {
                const attr = attributes[name];
                if (typeof attr === "function" || typeof attr === "object") {
                    (element as any)[name] = attr;
                } else if (attr !== null) {
                    element.setAttribute(name, attr);
                }
            }
        }
        // Append children
        for (const child of children) {
            JSX.appendChildren(element, child);
        }
        return element;
    }

    /** API React. */
    appendChildren(element: Element | DocumentFragment, children: any) {
        if (Array.isArray(children)) {
            children.forEach((ch) => JSX.appendChildren(element, ch));
        } else if (children instanceof Node) {
            element.appendChild(children);
        } else {
            element.appendChild(document.createTextNode(children));
        }
    }
}

export const JSX: JSXServices = new JSXServices();

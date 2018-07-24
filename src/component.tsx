import { DOM, JSX } from ".";

export abstract class Component extends HTMLElement {
    [key: string]: any;
    protected _defaultAttributes: Array<{name: string, value: any, executeAtLast?: boolean}> = [];
    protected _renderElements: HTMLElement;
    private _jsxProps: any;

    static register(tagName?: string) {
        return <T extends HTMLElement>(type: new () => T) => {
            if (!tagName) {
                tagName = `x-${type.name.toLowerCase()}`;
            }
            if (customElements.get(tagName)){
                return;
            }
            customElements.define(tagName, type)
        }
    }

    connectedCallback() {
        this._renderElements = this._render();
        let style = this._style();
        // Polyfill -> A supprimer après intégration de shadowdom dans FF et Edge
        if (!("registerElement" in document)) {
            const id = DOM.generateId();
            this.setAttribute(id, "");
            this.setAttribute("data-polyfillid", id);
            this._renderElements.setAttribute(id, "");
            this._renderElements.setAttribute("data-polyfillid", id);
            Array.prototype.slice.call(this._renderElements.querySelectorAll("*"), 0).forEach((descendant) => {
                descendant.setAttribute(id, "");
                descendant.setAttribute("data-polyfillid", id);
            });
            style = style.replace(/([^\s]+)(\s*\w*{)/g, "$1[" + id.toLowerCase() + "]$2");
            style = style.replace(":host", this.tagName);
        }
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(JSX.createElement("style", null, style));
        shadow.appendChild(this._renderElements);
        this._setOpts();
        DOM.dispatchEvent("componentCreated", this);
    }

    protected _render(): HTMLElement {
        return null;
    }

    protected _style(): string {
        return "";
    }

    // Opts
    private _setOpts() {
        const options = Object();
        const executeAtLast: Array<{name: string, value: string}> = [];
        // Attributes
        if (this.attributes) {
            const attributes = Array.prototype.slice.call(this.attributes);
            attributes.forEach((element: any) => {
                options[element.name] = element.value;
            });
        }
        // Options
        if (this._options) {
            Object.keys(this._options).forEach((element: any) => {
                // camelCase to dash
                const name = element.replace( /([a-z])([A-Z])/g, "$1-$2" ).toLowerCase();
                if (!options[name]) {
                    options[name] = this._options[element];
                }
            });
        }
        // Attributs par défaut
        for (const defaultAttr of this._defaultAttributes) {
            if (defaultAttr.executeAtLast) {
                executeAtLast.push({name: defaultAttr.name, value: defaultAttr.value});
            }
            if (!options[defaultAttr.name] && !defaultAttr.executeAtLast) {
                options[defaultAttr.name] = defaultAttr.value;
            }
        }
        // Mise en place des attributs et options
        for (const name in options) {
            if (options.hasOwnProperty(name)) {
                // dash to camelCase
                // tslint:disable-next-line:only-arrow-functions
                this[name.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); })] = options[name];
            }
        }
        // Attributs à intialiser en dernier (center)
        executeAtLast.forEach((attr) => this[attr.name] = options[attr.name] || attr.value);
    }

}
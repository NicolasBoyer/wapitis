import icons from "./icons.svg";

// tslint:disable-next-line:no-namespace
export namespace DOM {
    export function addIcon(name: string, parent: HTMLElement, elementAfter?: Node | null): SVGSVGElement {
        const svg = elementAfter ? parent.insertBefore(document.createElementNS("http://www.w3.org/2000/svg", "svg"), elementAfter) : parent.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
        svg.setAttribute("class", "icon icon-" + name);
        svg.setAttribute("aria-hidden", "true");
        const use = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "use"));
        use.setAttribute("href", icons + "#icon-" + name);
        return svg;
    }

    export function changeIcon(svg: SVGSVGElement, name: string): SVGSVGElement {
        svg.setAttribute("class", "icon icon-" + name);
        svg.setAttribute("aria-hidden", "true");
        (svg.firstChild as SVGUseElement).setAttribute("href", icons + "#icon-" + name);
        return svg;
    }

    export function removeIcon(svg: SVGSVGElement, parent: HTMLElement) {
        parent.removeChild(svg);
    }

    export function setAttribute(element: HTMLElement, name: string, value: any) {
        try {
            value = JSON.parse(value);
            if (Number(value) || value === 0) {
                const style: any = name;
                element.style[style] = value + "px";
            }
        } catch (e) {
            //
        }
        element.setAttribute(name, String(value));
    }

    export function generateId() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }

    export function dispatchEvent(name: string, property: object, parent: HTMLElement = document.body) {
        const event = new CustomEvent(name, {detail: property});
        parent.dispatchEvent(event);
    }

    export function getWindowSize() {
        const window = document.createElement("div");
        window.style.position = "absolute";
        window.style.top = "0px";
        window.style.bottom = "0px";
        window.style.left = "0px";
        window.style.right = "0px";
        window.style.zIndex = "0";
        document.body.appendChild(window);
        const windowsize: {width: number, height: number, top: number, left: number} = {width : window.offsetWidth, height: window.offsetHeight, top: window.offsetTop, left: window.offsetLeft};
        document.body.removeChild(window);
        return windowsize;
    }

    export function parseStyleToNumber(style: string | null) {
        return parseInt(String(style), 10);
    }

    export function removeClassByPrefix(element: HTMLElement, prefix: string) {
        const regx = new RegExp("\\b" + prefix + ".*?\\b", "g");
        [...element.classList].map((className) => regx.test(className) && element.classList.remove(className));
    }
}

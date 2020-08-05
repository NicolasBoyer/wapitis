/**
 * Checks if the node is a document node or not.
 * @param {Node} node
 * @returns {node is Document | DocumentFragment}
 */
function isDocumentNode(node: Document | DocumentFragment): boolean {
    return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_NODE
}

function findParentOrHost(element: Node, root: Element | ShadowRoot): Element | ShadowRoot {
    const parentNode = element.parentNode as ShadowRoot
    return (parentNode && parentNode.host && parentNode.nodeType === 11) ? parentNode.host : parentNode === root ? null : parentNode
}

/**
 * Finds all elements on the page, inclusive of those within shadow roots.
 * @param {string=} selector Simple selector to filter the elements by. e.g. 'a', 'div.main'
 * @return {!Array<string>} List of anchor hrefs.
 * @author ebidel@ (Eric Bidelman)
 * License Apache-2.0
 */
function collectAllElementsDeep(selector: string = null, root: Element | Document): string[] {
    const allElements = []

    const findAllElements = (nodes: Element[] | ShadowRoot[] | NodeListOf<Element>): void => {
        // eslint-disable-next-line no-cond-assign
        for (let i = 0, el; el = nodes[i]; ++i) {
            (allElements).push(el)
            // If the element has a shadow root, dig deeper.
            if ((el as Element).shadowRoot) {
                findAllElements((el as Element).shadowRoot.querySelectorAll('*'))
            }
        }
    }
    if ((root as Element).shadowRoot) {
        findAllElements((root as Element).shadowRoot.querySelectorAll('*'))
    }
    findAllElements(root.querySelectorAll('*'))

    return (selector ? allElements.filter((el) => (el as Element).matches(selector)) : allElements) as string[]
}

/* eslint-disable */
function splitByCharacterUnlessQuoted(selector: any, character: string): string[] {
    return selector.match(/\\?.|^$/g).reduce((p, c) => {
        if (c === '"' && !p.sQuote) {
            p.quote ^= 1
            p.a[p.a.length - 1] += c
        } else if (c === '\'' && !p.quote) {
            p.sQuote ^= 1
            p.a[p.a.length - 1] += c
        } else if (!p.quote && !p.sQuote && c === character) {
            p.a.push('')
        } else {
            p.a[p.a.length - 1] += c
        }
        return p
    }, { a: [''] }).a
}
/* eslint-enable */

function findMatchingElement(splitSelector: string[], possibleElementsIndex: number, root): (element: Element | Document | DocumentFragment) => boolean {
    return (element) => {
        let position = possibleElementsIndex
        let parent = element
        let foundElement = false
        while (parent && !isDocumentNode(parent as Document | DocumentFragment)) {
            const foundMatch = (parent as Element).matches(splitSelector[position])
            if (foundMatch && position === 0) {
                foundElement = true
                break
            }
            if (foundMatch) {
                position--
            }
            parent = findParentOrHost(parent, root)
        }
        return foundElement
    }
}

function _querySelectorDeep(selector: string, findMany: boolean, root: Element | Document): any {
    const lightElement = root.querySelector(selector)

    if (document.head.attachShadow) {
        // no need to do any special if selector matches something specific in light-dom
        if (!findMany && lightElement) {
            return lightElement
        }

        // split on commas because those are a logical divide in the operation
        const selectionsToMake = splitByCharacterUnlessQuoted(selector, ',')

        return selectionsToMake.reduce((acc: string[] | string, minimalSelector) => {
            // if not finding many just reduce the first match
            if (!findMany && acc) {
                return acc
            }
            // do best to support complex selectors and split the query
            const splitSelector = splitByCharacterUnlessQuoted(minimalSelector
                // remove white space at start of selector
                .replace(/^\s+/g, '')
                .replace(/\s*([>+~]+)\s*/g, '$1'), ' ')
                // filter out entry white selectors
                .filter((entry) => !!entry)
            const possibleElementsIndex = splitSelector.length - 1
            const possibleElements = collectAllElementsDeep(splitSelector[possibleElementsIndex], root)
            const findElements = findMatchingElement(splitSelector, possibleElementsIndex, root)
            if (findMany) {
                acc = (acc as string[]).concat(possibleElements.filter(() => findElements))
                return acc
            } else {
                acc = possibleElements.find(() => findElements)
                return acc || null
            }
        }, findMany ? [] : null)
    } else {
        if (!findMany) {
            return lightElement
        } else {
            return root.querySelectorAll(selector)
        }
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SHADOWDOM = {
    /**
     * Retrouve le host du shadowTree de ce noeud
     *
     * @typeparam T Type générique de l'host recherché
     * @param {Node} from Noeud sur lequel on cherche le host
     * @returns {T} Retourne le host de type T
     */
    findHost<T extends Element = Element>(from: Node): T {
        while (from.parentNode) { from = from.parentNode }
        return (from as ShadowRoot).host as T
    },

    /**
     * Retrouve le premier DocumentOrShadowRoot ancêtre d'un noeud
     *
     * @param {Node} from Noeud sur lequel la recherche est effectuée
     * @returns {(Document | ShadowRoot)} Retourne le premier shadowroot ancêtre ou le Document
     */
    findDocumentOrShadowRoot(from: Node): Document | ShadowRoot {
        while (from.parentNode) { from = from.parentNode }
        return (from.nodeType === Node.DOCUMENT_NODE || (from instanceof ShadowRoot)) ? from as Document | ShadowRoot : null
    },

    /**
     * Retourne le parent, incluant la balise <slot> dans la chaîne
     *
     * @param {string} selector Le parent le plus proche à sélectionner
     * @param {Element} base L'élément sur lequel est effectuée la recherche
     * @returns
     */
    deepClosestElement(selector: string, base: Element): Element {
        function _closestFrom(element: Element | Window | Document | null): Element | null {
            if (!element || element === document || element === window) {
                return null
            }
            if ((element as Slotable).assignedSlot) {
                element = (element as Slotable).assignedSlot
            }
            const found = (element as Element).closest(selector)
            return found || _closestFrom(((element as Element).getRootNode() as ShadowRoot).host)
        }
        return _closestFrom(base)
    },

    /**
     * Retrouve l'activeElement en pénétrant tous les shadowDOM
     *
     * @param {DocumentOrShadowRoot} from Le shadowroot sur lequel la recherche est effectuée ou le document
     * @returns
     */
    findDeepActiveElement(from?: DocumentOrShadowRoot): Element {
        let a = (from || document).activeElement
        while (a && a.shadowRoot && a.shadowRoot.activeElement) { a = a.shadowRoot.activeElement }
        return a
    },

    /**
     * Retrouve les éléments spécifiés dans le selector en fonction du root ou du document
     *
     * @author Georgegriff@ (George Griffiths). License Apache-2.0. Adapdée à Typescript
     *
     * @param {string} selector Le sélecteur de recherche
     * @param {(Element | Document)} root L'élément sur lequel la recherche est effectuée ou le document
     * @returns {Element[]}
     */
    querySelectorAllDeep(selector: string, root: Element | Document = document): Element[] {
        return _querySelectorDeep(selector, true, root) as Element[]
    },

    /**
     * Retrouve tous les éléments assignés dans les slot de l'élément courant
     *
     * @param {Element} from L'élément sur lequel est effectuée la recherche
     * @returns {Element[]} Retourne un tableau avec les éléments retrouvés
     */
    findAssignedElements(from: Element): Element[] {
        let elements: Element[] = []
        SHADOWDOM.querySelectorAllDeep('slot', from).forEach((slot) => {
            elements = elements.concat((slot as HTMLSlotElement).assignedElements())
        })
        return elements
    },

    /**
     * Retrouve le ou les éléments assignés dans le slotName
     *
     * @param {Element} from L'élément sur lequel la recherche est effectuée
     * @param {string} slotName Le nom du slot recherché
     * @returns {(Element | Element[])}
     */
    findAssignedElementBySlotName(from: Element, slotName: string): Element | Element[] {
        return SHADOWDOM.findAssignedElements(from).filter((element) => element.getAttribute('slot') === slotName)[0]
    },

    /**
     * Retrouve l'élément spécifié dans le selector en fonction du root ou du document
     *
     * @author Georgegriff@ (George Griffiths). License Apache-2.0. Adapdée à Typescript
     *
     * @param {string} selector Le sélecteur de recherche
     * @param {(Element | Document)} root L'élément sur lequel la recherche est effectuée ou le document
     * @returns {Element}
     */
    querySelectorDeep(selector: string, root: Element | Document = document): Element {
        return _querySelectorDeep(selector, false, root) as Element
    }
}

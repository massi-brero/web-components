export class CustomComponent extends HTMLElement {
    #mainComp
    static ID = 0

    constructor() {
        super()

        this.attachShadow({mode: 'open'})
        this.#mainComp = document.createElement('span')
        this.#mainComp.setAttribute('class', 'custom-camp')


        this.customStyle = ''
        this.__style = document.createElement('style')
        this.__style.textContent = ''

        this.shadowRoot.appendChild(this.__style)
        this.shadowRoot.appendChild(this.#mainComp)

        this.compName = ''
        this.compID = CustomComponent.ID
        CustomComponent.ID++
        this._attributes = {}
        this.isAttached = false
        console.log(`custom component got initiated: ${this.compID}`)
    }

    /**
     * Lifecycle method, called once the component is connected to the DOM
     */
    connectedCallback() {
        this.#setUpAccessors()
        this.#display()
        EventHandler.triggerEvent('show')

        for (let i = 0; i < this.childNodes.length; i++) {
            const child = this.childNodes[i]
            this.append(child)
        }
    }

    /**
     * Lifecycle method, called whenever an observed property changes
     */
    attributeChangedCallback(name, old, newName) {
        this.#display()
    }

    /**
     * Creates one property on this class for every
     * HTML property defined on the element
     */
    #setUpAccessors() {
        this.getAttributeNames().forEach(name => {
            const sanitizedName = this.#sanitizeName(name)

            if (this._attributes[sanitizedName] === undefined) {
                Object.defineProperty(this._attributes, sanitizedName, {
                    set: value => this.setAttribute(name, value),
                    get: _ => this.getAttribute(name)
                })
            }
        })
    }

    /**
     * Turns a string split with "-" into camel case notation
     */
    #sanitizeName(name) {
        const parts = name.split('-')
        return [parts.shift(), ...parts.map(n => n[0].toUpperCase() + n.slice(1))].join('')
    }

    #display(force = false) {
        if (force) {
            [...this.#mainComp.children].forEach(this.#mainComp.removeChild.bind(this.#mainComp))
        }

        if (this.isAttached) {
            console.log(`already rendered ${this.compName}`)
        }
        console.log(`displaying ${this.compName}`)
        this.__style.textContent = this.customStyle

        const rendered = this.#render()
        this.isAttached = true
        this.#mainComp.append(rendered)
    }

    /**
     * to be implemented by the child class
     *
     * @returns {null}
     */
    #render() {
        return null
    }
}


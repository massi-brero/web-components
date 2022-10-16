export class CustomComponent extends HTMLElement {
    #mainComp
    static ID = 0

    constructor() {
        super()
        this.#mainComp = document.createElement('span')
        this.#mainComp.setAttribute('class', 'custom-camp')
        this.attachShadow({mode: 'open'})

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


    connectedCallback() {
        this.#setUpAccessors()
        this.#display()

        for (let i = 0; i < this.childNodes.length; i++) {
            const child = this.childNodes[i]
            this.append(child)
        }
    }

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

    #sanitizeName(name) {
        const parts = name.split('-')
        return [parts.shift(), ...parts.map(n => n[0].toUpperCase() + n.slice(1))].join('')
    }

    #display(force = false) {
        const mainComponent = this.#mainComp
        if (force) {
            [...this.#mainComp.children].forEach(this.#mainComp.removeChild.bind(this.#mainComp))
        }

        if (this.isAttached) {
            console.log(`already rendered ${this.compName}`)
        }
        console.log(`displaying ${this.compName}`)
        this.__style.textContent = this.customStyle


        const rendered = this.render()
        this.isAttached = true
        this.#mainComp.append(rendered)
    }
}


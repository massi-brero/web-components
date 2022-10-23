import { CustomComponent } from '../CustomComponent.js'

export default class MBCard extends CustomComponent {
    static observedAttributes = []

    constructor() {
        super()

        this.compName = 'Card'

        this.customStyle = `
            .mb-card{
                padding: 10px;
                display: block;
                border: 3px solid #000;
            }
            .mb-card.with-shadow {
                box-shadow: 5px 10px #cbbaba
            }
            .centered {
                margin: 0 auto;
            }
            .w-80 {
                width: 80%;
            }
            .w-50 {
                width: 50%;
            }
            .w-70 {
                width: 70%;
            }
        `
    }

    render() {
        const wrapper = document.createElement('div')

        const elemClass = []
        if (this._attributes.withShadow !== null) {
            elemClass.push('with-shadow')
        }

        if (this._attributes.width !== null) {
            elemClass.push(`w-${this._attributes.width}`)
        }

        if (this._attributes.centered !== null) {
            elemClass.push('centered')
        }

        // not needed?
        //elemClass.push('mb-card')

        wrapper.innerHTML = `
          <div class="${elemClass.join(" ")}">
                <slot       ></slot>
          </div>  
        `
        this.logSuccess()
        return wrapper
    }
}

customElements.define('mb-card', MBCard)

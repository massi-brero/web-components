import { CustomComponent } from '../CustomComponent.js'

export default class MBTextInput extends CustomComponent {
    static observedAttributes = []

    constructor() {
        super()
        this.compName = 'Stack'
        this.customStyle = `
             .custom-comp{
                padding: 10px;
                display: block;
            }
            input {
                margin-left: 8px;
            }
        `
    }

    render() {
        const wrapper = document.createElement('div')
        const input = document.createElement('input')

        if (this._attributes.isPassword) {
            input.setAttribute('type', 'password')
        } else {
            //input.isDefaultNamespace
        }

        input.setAttribute('placeholder', this._attributes.placeholder || '')

        if (this._attributes.label) {
            const label = document.createElement('label')
            label.textContent = this._attributes.label
            label.appendChild(input)
            wrapper.appendChild(label)
        } else {
            wrapper.appendChild(input)
        }

        this.logSuccess()
        return wrapper
    }
}

customElements.define('mb-text-input', MBTextInput)

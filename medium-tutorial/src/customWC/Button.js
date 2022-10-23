import { CustomComponent } from '../CustomComponent.js'

export default class MBButton extends CustomComponent {
    static observedAttributes = []

    constructor() {
        super()
        this.compName = 'Button'
        this.customStyle = `
            .custom-comp {
                padding: 10px;
                display: block;
            }
            .legend {
                display: block;
            }
            button {
                margin: 5px;
                border: lightgrey 1px solid;
                padding: 8px;
                background-color: lightblue;
                border-radius: 4px;
            }
        `
    }

    render() {
        // the wrapper element
        const  wrapper = document.createElement('div')

        //the span element where the text goes
        const buttonElem = document.createElement('button')
        buttonElem.textContent = this._attributes['dataText']

        let clickHandler = this.getAttribute('onClick')
        if (typeof clickHandler === 'string') {
            clickHandler = eval(clickHandler)
        }

        buttonElem.addEventListener('click', clickHandler)
        wrapper.appendChild(buttonElem)

        return wrapper
    }
}

customElements.define('mb-button', MBButton)

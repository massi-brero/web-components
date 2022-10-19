import { CustomComponent } from '../CustomComponent'

export default class MBButton extends CustomComponent {
    static observedAttributes = []

    constructor() {
        super()
        this.compName = 'Button'
        this.compStyle = `
            .custom-comp {
                padding: 10px;
                display: block;
                color: red;
            }
            .legend {
                display: block;
            }
            button {
                margin: 5px;
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

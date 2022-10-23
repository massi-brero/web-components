import { CustomComponent } from '../CustomComponent.js'

export default class MBStack extends CustomComponent {
    static observedAttributes = []

    constructor() {
        super()
        this.compName = 'Stack'
        this.customStyle = `
            .mb-stack{
                display: flex;
            }
            .mb-stack.vertical {
                flex-direction: column;
            }
            .mb-stack.horizontal {
                flex-direction: row;
            }
        `
    }

    render() {
        const wrapper = document.createElement('div')

        const direction = this._attributes.dir
        const elemClasses = []

        switch (direction) {
            case 'horizontal':
                elemClasses.push('.mb-horizontal')
                break
            case 'vertical':
            default:
                elemClasses.push('.mb-vertical')
                break
        }
        elemClasses.push('mb-stack')

        wrapper.innerHTML = `
          <div class="${elemClasses.join(" ")}">
                <slot       ></slot>
          </div>  
        `

        this.logSuccess()
        return wrapper
    }
}

customElements.define('mb-stack', MBStack)

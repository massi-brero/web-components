import { CustomComponent } from './CustomComponent'

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


}

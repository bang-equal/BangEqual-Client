//Credit to https://github.com/MattTurnure/js-viewport

export class ViewportService {
    constructor() {
        this.types = ['4', '6', '8', '12', '16']
    }
    
    getType() {
        let len = this.types.length;
        let content;
        const doc = document.querySelectorAll('.site-wrapper')[0];


        if (typeof getComputedStyle === 'function') {
            content = getComputedStyle(doc, ':after').getPropertyValue('content');
            
            while (len--) {
                if (content.indexOf(this.types[len]) !== -1) {
                    return this.types[len];
                }
            }
        }

        return this.types[0];
    }
}
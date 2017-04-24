export class BaseElement {

    constructor() {
        this.el = null; //HTML DOM object
    }

    appendToElement(ele) {
        this.createElement();
        ele.append(this.el);
    }

    createElement() {
        let s = this.getElementString();
        this.el = document.createElement("div");
        this.el.innerHTML = s;
    }

    getElementString() {
        throw 'Please override getElementString in BaseElement';
    }

}
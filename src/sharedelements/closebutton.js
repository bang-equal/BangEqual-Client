export default class CloseButton {
  constructor(onclick, type) {
    this.el = document.createElement("img");
    this.el.className = "single-close-button";
    this.el.contentType = type;
    this.el.addEventListener("click", (e) => { this.closeClick(e); });
    this.clickfunc = onclick;

  }

  closeClick(evt) {
      this.clickfunc(evt);
  }

}
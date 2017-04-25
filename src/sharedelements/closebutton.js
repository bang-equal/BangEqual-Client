export default class CloseButton {
  constructor(onclick) {
    this.el = document.createElement('img');
    this.el.className = "close-button";
    this.el.addEventListener("click", (e) => { this.closeClick(e); });
    this.clickfunc = onclick;
  }

  closeClick(evt) {
      this.clickfunc(evt);
  }
}
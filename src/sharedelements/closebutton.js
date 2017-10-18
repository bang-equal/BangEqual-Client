export default class CloseButton {
  constructor(onclick, classname, title) {
    this.el = document.createElement("img");
    this.el.className = classname;
    this.el.id = title + "_close_button";
    this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.clickfunc = onclick;
    this.el.classList += " hide"; 
  }

  onClick(evt) {
      this.clickfunc(evt.currentTarget.id, evt.currentTarget.type);
      evt.stopPropagation();
  }
}
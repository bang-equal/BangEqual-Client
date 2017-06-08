import CloseButton from "../../sharedelements/closeButton";

export default class Filter {
  constructor(title, onclick, cancelclick, type) {
    this.title = title;
    this.el = document.createElement("div");
    this.el.className = "filter-item";
    this.el.id = title;
    this.clickfunc = onclick;
    this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render();
    this.el.type = type

    const cb = new CloseButton(cancelclick, type,"filter-close-button", title);
    this.el.appendChild(cb.el);
  }

  onClick(evt) {
    this.clickfunc(evt.currentTarget.id, evt.currentTarget.type);
  }

  render() {
    return `
        <h2>${this.title}</h2>     
  `;}
}
import CloseButton from "../../sharedelements/closeButton";

export default class Filter {
  constructor(title, onclick, cancelclick, backgroundColor) {
    this.title = title;
    this.el = document.createElement("li");
    this.el.className = "filter-item";
    this.el.id = title;
    this.clickfunc = onclick;
    this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.style.backgroundColor = backgroundColor;
    this.el.innerHTML = this.render();

    const cb = new CloseButton(cancelclick, "filter-close-button", title);
    this.el.appendChild(cb.el);
  }

  onClick(evt) {
    this.clickfunc(evt.currentTarget.id);
  }

  render() {
    return `
        <p>${this.title}</p>     
  `;}
}
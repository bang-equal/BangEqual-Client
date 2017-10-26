export default class MenuItem {
  constructor(title, onclick) {
    this.title = title;
    this.el = document.createElement("li");
    if (this.title != "Bang Equal") {
      this.el.className = "menu-wrapper";
    }
    this.el.id = title;
    this.clickfunc = onclick;
    this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
  }
  
  onClick(evt) {
    this.clickfunc(this.title);
  }

  render() {
    return `
      <p class="menu-item">${this.title}</p>
  `;}
}
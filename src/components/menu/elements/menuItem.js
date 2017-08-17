export default class MenuItem {
  constructor(title, onclick) {
    this.title = title;
    this.el = document.createElement("div");
    this.el.className = "menu-wrapper";
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
      <h2 class="menu-item">${this.title}</h2>
  `;}
}
export default class Menu {
  constructor() {
    this.el = document.getElementsByClassName('header-menu')[0];
   // this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
  }

 // onClick(evt) {
       // new Header("_");
    //}

  render() {
    return `
    <h2 class="branding">BangEqual</h2>
    <img class="menu-products"/>
    <img class="menu-articles"/>
    <img class="menu-games"/>
  `;}
}
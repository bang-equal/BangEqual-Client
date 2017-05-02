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
    <h2 class="menu">Shop</h2>
    <h2 class="menu" style="border-bottom: solid #FF7F50 5px;">Blog</h2>
    <h2 class="menu">Games</h2>
  `;}
}
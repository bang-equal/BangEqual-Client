export default class Jumbotron {
  constructor() {
    this.el = document.getElementsByClassName('header-jumbotron')[0];
   // this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
  }

 // onClick(evt) {
       // new Header("_");
    //}

  render() {
    return `
    <div class="jumbo-image">
        <img class="logo" />
    </div>
    <div class="jumbo-slideshow"></div>
  `;}
}
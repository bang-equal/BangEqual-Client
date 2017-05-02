export default class Jumbotron {
  constructor(mouthchar) {
    this.el = document.getElementsByClassName('header-jumbotron')[0];
    this.mouthchar = mouthchar;
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
        <h1 class="mouth">${this.mouthchar}</h1>
        <h2 class="branding">BangEqual</h2>
    </div>
    <div class="jumbo-slideshow"></div>
  `;}
}
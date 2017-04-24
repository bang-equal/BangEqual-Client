export default class Adbar {
  constructor() {
    this.el = document.getElementsByClassName('content-right')[0];
   // this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
  }

 // onClick(evt) {
       // new Header("_");
    //}

  render() {
    return `
    <div class="adbar">
        <img class="ad-one" />
        <img class="ad-two" />
    </div>
  `;}
}
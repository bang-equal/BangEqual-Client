export default class Jumbotron {
  constructor() {
    this.el = document.getElementsByClassName('header-jumbotron')[0];
    this.mouthchar = "#";
   // this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
  }

  

 // onClick(evt) {
       // new Header("_");
    //}

  render() {
    //let mouthcharfunc = () => {
      //let y = 0;
      //setTimeout(function () {
        //let chars = ["__", "0", "P", "----", "L", "V", "+"];
        //let mouthchar =  document.getElementsByClassName('mouth')[0];
        //mouthchar.textContent = chars[Math.floor(Math.random()*chars.length)];
        //mouthcharfunc();
      //}, 6000);
      //return y;  
    //};
    return `
    <div class="logo-wrapper">
      <img class="logo" />
      <h1 class="mouth">$</h1>
    </div>
    <div class="jumbo-slideshow">
      <h1 class="jumbo-text">Bang Equal</h1>
    </div>
  `;}
}
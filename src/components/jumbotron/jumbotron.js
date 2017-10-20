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
    <img class="face" />
  `;}
}
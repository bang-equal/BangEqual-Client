export default class HomePage {
  constructor() {
    this.el = document.createElement("div");
    this.el.className = "home-wrapper";
    this.el.innerHTML = this.render(); 
  }

  render() {
    return `
    <div class='home-item'>
    <div class='home-icon-wrapper'>
      <div class='home1-icon'></div>
    </div>
    <div class='home-text'>
      <div class='home-title'>Learn To Nerd</div>
      <p>We strive to simplify complexity and understand concepts at their core. Technology articles can quickly get confusing when too much banter is dedicated to vendor lock-in. Underneath it all are the same protocols and languages that have been used for a half century. Our articles help you actually get it.</p>
    </div>
    </div>

    <div class='home-item'>
    <div class='home-icon-wrapper'>
      <div class='home2-icon'></div>
    </div>
    <div class='home-text'>
      <div class='home-title'>Fashion Forward, Tech Savvy</div>
      <p>Are you looking to cultivate a look with a touch of Nerd? Just because you can parse JSON doesnt mean you cannot be stylish. Check out the Bang Equal shop today for apparel designs will highlight the true you.</p>
    </div>
    </div>
  `;}
}
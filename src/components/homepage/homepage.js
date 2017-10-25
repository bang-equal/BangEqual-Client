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
      <p>Lets simplify complexity and focus on understanding core concepts. Technology articles get confusing when too much banter is dedicated to vendor lock-in. Underneath it all are the same trusted protocols and languages. Learn once.</p>
    </div>
    </div>

    <div class='home-item'>
    <div class='home-icon-wrapper'>
      <div class='home2-icon'></div>
    </div>
    <div class='home-text'>
      <div class='home-title'>Fashion Forward, Tech Savvy</div>
      <p>Cultivating a look with a touch of Nerd? Just because you can parse JSON doesnt mean you cannot be stylish. Visit the Bang Equal shop for ideas on ways to highlight the real you.</p>
    </div>
    </div>
  `;}
}
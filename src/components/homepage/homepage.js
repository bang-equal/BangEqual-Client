export default class HomePage {
  constructor() {
    this.el = document.createElement("div");
    this.el.className = "homepage";
    this.el.innerHTML = this.render(); 
  }

  render() {
    return `
      <h1>We see the world through common lenses. Some of us are tech savy but not all, yet we share a passion for simplifying complexity and understanding concepts at their core. Keep us going by logging in and sharing your ideas.</h1>
  `;}
}
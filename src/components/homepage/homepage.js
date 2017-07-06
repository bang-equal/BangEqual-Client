export default class HomePage {
  constructor() {
    this.el = document.createElement("div");
    this.el.innerHTML = this.render(); 
  }

  render() {
    return `
      <h1>We are a community of like-minded individuals, who see the world through common lenses. Some of us tech savy, others entrepreneurial, yet we all share a passion for simplifying complexity and understanding concepts at their core. Help to peel away the layers.</h1>
  `;}
}
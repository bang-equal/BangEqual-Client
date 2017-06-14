export default class HomePage {
  constructor() {
    this.el = document.createElement("div");
    this.el.innerHTML = this.render(); 
  }

  render() {
    return `
      <h1>A community of like-minded individuals, seeing the world through bi-polar lenses. Some are tech savvy and reclusive, while others are entrepreneurial extroverts, all however, share a passion for simplifying complexity and understanding concepts at their core. Help to peel away the layers.</h1>
  `;}
}
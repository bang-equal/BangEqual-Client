export default class SingleView {
  constructor(data, type) {
    this.el = document.createElement("div");
    this.el.className = "single-wrapper";

    this.title = data.title;
    this.content = data.renderString; 
    this.author = data.author;
    this.topic = data.topic;
    this.tags = data.tags;
    //this.clickfunc = onclick;

    this.el.innerHTML = this.render();
  }

  //closeClick(evt) {
      //this.clickfunc(evt);
  //}

  render() {
    return `
      <div class="single-title"><h1>${this.title}</h1></div>
      <div class='single-author-bar'>
        <div>${this.author}</div>
        <div>${this.tags}</div>
      </div>
      <div class='single-content'>${this.content}</div>
    `;
  }
}
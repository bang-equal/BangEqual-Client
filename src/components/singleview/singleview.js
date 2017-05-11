export default class SingleView {
  constructor(data, onclick, type) {
    this.el = document.createElement("div");
    this.el.className = "single-view";

    this.title = data.title;
    this.content = data.content; 
    this.author = data.author;
    this.topic = data.topic;
    this.tags = data.tags;
    this.clickfunc = onclick;

    this.el.innerHTML = this.render();

    this.closebutton = document.createElement('img');
    this.closebutton.className = "close-button"
    this.closebutton.contentType = type;
    this.closebutton.addEventListener("click", (e) => { this.closeClick(e); });
    this.el.appendChild(this.closebutton);
  }

  closeClick(evt) {
      this.clickfunc(evt);
  }

  render() {
    return `
        <div class="single-wrapper">
        <h1 class='single-title'>${this.title}</h1>
        <div class='single-author-bar'>
          <div>${this.author}</div>
          <div>${this.tags}</div>
        </div>
        <div class='single-content'>${this.content}</div>
        </div>
    `;
  }
}
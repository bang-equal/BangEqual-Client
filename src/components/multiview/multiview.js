export default class MultiView {

  constructor(data, onclick, elementtype) {
    this.title = data.title;
    this.author = data.author;
    this.views = data.views;
    this.shares = data.shares;
    this.tags = data.tags;
    this.type = elementtype;
    this.topic = data.topic;
    this.content = elementtype === "articles" ? data.content.substring(0, 100) : data.content;
    this.el = document.createElement("div");
    this.el.className = "mini-article";
    this.el.id = data.id
    this.clickfunc = onclick;
    this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render();
  }

  onClick(evt) {
       this.clickfunc(evt.currentTarget.id, this.topic, this.type);
  }

  render() {
    return `
        <div class="article-stats-bar">
            <div>
                <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                <h5 style="margin-top:.5rem">${this.views}</h5>
            </div>
            <div>
                <i class="fa fa-share fa-lg" aria-hidden="true"></i>
                <h5 style="margin-top:.5rem">${this.shares}</h5>
            </div>              
        </div>
        <div class="article-preview">
            <div class="article-title">${this.title}</div>
            <div class="article-meta">
                <div class="article-author">by ${this.author}</div>
                <div class="article-tags">${this.tags}</div>
            </div>
            <div class="article-preview-body">${this.content}</div> 
        </div>      
    `;
   }
}
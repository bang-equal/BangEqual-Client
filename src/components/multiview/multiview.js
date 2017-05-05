export default class MultiView {

  constructor(title, content, id, author, views, shares, topics, onclick) {
    this.title = title;
    this.author = author;
    this.views = views;
    this.shares = shares;
    this.topics = topics;
    this.content = content;
    this.el = document.createElement("div");
    this.el.className = "mini-article";
    this.el.id = id
    this.clickfunc = onclick;
    this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render();
  }

  onClick(evt) {
       this.clickfunc(evt.currentTarget.id);
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
                    <div class="article-tags">${this.topics}</div>
                </div>
                <div class="article-preview-body">${this.content}</div> 
            </div>      
        `;
   }
}
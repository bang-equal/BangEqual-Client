export default class MultiView {

  constructor(title, content, id, onclick) {
    this.title = title;
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
                    <h5 style="margin-top:.5rem">4</h5>
                </div>
                <div>
                    <i class="fa fa-share fa-lg" aria-hidden="true"></i>
                    <h5 style="margin-top:.5rem">4</h5>
                </div>              
            </div>
            <div class="article-preview">
                <div class="article-title">${this.title}</div>
                <div class="article-meta">
                    <div class="article-author">by Author Tudor</div>
                    <div class="article-tags">tags</div>
                </div>
                <div class="article-preview-body">${this.content}</div> 
            </div>      
        `;
   }
}
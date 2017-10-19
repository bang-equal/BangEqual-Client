import * as articleservice from '../../services/article_service';

export default class SingleView {
  constructor(data, articleText) {
    this.el = document.createElement("div");
    this.el.className = "single-wrapper";
    this.title = data.articleTitle;
    this.author = data.articleAuthor;
    this.tags = data.articleTags;
    this.text = articleText;
    //this.clickfunc = onclick;
    this.el.innerHTML = this.render();
  }

  render() {   
    return `
      <div class="single-title"><h1>${this.title}</h1></div>
      <div class='single-author-bar'>
        <div>${this.author}</div>
        <div>${this.tags}</div>
      </div>
      <div class='single-content'>${this.text}</div>
    `;
  }
}
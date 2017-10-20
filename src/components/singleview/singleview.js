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
      <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&layout=button&size=large&mobile_iframe=false&width=73&height=28&appId" width="73" height="28" style="border:none;overflow:hidden;margin-bottom:1rem;" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
      <div class="single-title"><h1>${this.title}</h1></div>
      <div class='single-author-bar'>
        <div>${this.author}</div>
        <div>${this.tags}</div>
      </div>
      <div class='single-content'>${this.text}</div>
    `;
  }
}
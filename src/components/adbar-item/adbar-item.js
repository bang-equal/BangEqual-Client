export default class Adbar {
  constructor(data, onclick, elementtype) {
    this.title = data.title;
    this.author = data.author;
    this.views = data.views;
    this.shares = data.shares;
    this.topic = data.topic;
    this.clickfunc = onclick;
    this.content = elementtype === 'articles' ? data.content.substring(0, 100) : data.content;
    this.type = elementtype;

    this.el = document.createElement("div");
    this.el.className = "adbar-item";
    this.el.innerHTML = elementtype === 'articles' ? this.renderArticles() : this.renderDesigns(); 

    //this.content = document.createElement("div");
    //this.content.className = "adbar-content";
    //this.content.addEventListener("click", (e) => { this.onClick(e); });
    //this.content.innerHTML = elementtype === 'articles' ? data.content.substring(0, 100) : data.content;
    //this.content.id = data.id;
    //this.el.appendChild(this.content);
  }

  onClick(evt) {
    this.clickfunc(evt.currentTarget.id, this.topic, this.type);
  }

  renderArticles() {
    return `
      <div class="adbar-topic">${this.type}</div>
      <div class="adbar-author"><span style="color:white; padding-right:.5rem;">by</span>${this.author}</div>
      <div class="adbar-content adbar-content-articles">${this.content}</div>
      <div class="adbar-stats">
        <div>
            <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">${this.views}</h5>
        </div>
        <div>
            <i class="fa fa-share fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">${this.shares}</h5>  
        </div>              
      </div>      
  `;}

  renderDesigns() {
    return `
      <div class="adbar-content">${this.content}</div>
      <div class="adbar-stats">
        <div>
            <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">${this.views}</h5>
        </div>
        <div>
            <i class="fa fa-share fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">${this.shares}</h5>  
        </div>              
      </div>      
  `;}
}
export default class ContentBanner {
  constructor(type) {
    this.type = type;
    this.el = document.createElement("div");
    this.el.className = "content-banner-wrapper";
    this.el.innerHTML = this.render();
  }

  onClick(evt) {
      this.clickfunc(evt.currentTarget.id, evt.currentTarget.type);
      evt.stopPropagation();
  }

  render() {
    
  }
}
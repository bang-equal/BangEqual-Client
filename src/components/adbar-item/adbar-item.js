export default class Adbar {
  constructor(id, title, author, BLOB, sold, shares) {
    this.title = title;
    this.author = author;
    this.BLOB = BLOB;
    this.sold = sold;
    this.shares = shares;
    this.el = document.createElement("div");
    this.el.className = "mini-article5";
    this.el.id = id
   // this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
  }

 // onClick(evt) {
       // new Header("_");
    //}

  render() {
    return `
      <div class="adbar-item">
        ${this.BLOB}
      </div>
      <div class="adbar-stats">
        <div>
            <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">${this.sold}</h5>
        </div>
        <div>
            <i class="fa fa-share fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">${this.shares}</h5>  
        </div>              
      </div>      
  `;}
}
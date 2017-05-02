export default class Adbar {
  constructor() {
    this.el = document.getElementsByClassName('content-right')[0];
   // this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
  }

 // onClick(evt) {
       // new Header("_");
    //}

  render() {
    return `
      <div class="adbar-title">
        <h3>Code Revwz</h3>
      </div>
      <div class="adbar-item">
        <img class="ad-one" />
      </div>
      <div class="adbar-stats">
        <div>
            <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">4</h5>
        </div>
        <div>
            <i class="fa fa-share fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">2</h5>  
        </div>              
      </div>
      <div class="adbar-item">
        <img class="ad-two" />
      </div>
      <div class="adbar-stats">
        <div>
            <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">4</h5>
        </div>
        <div>
            <i class="fa fa-share fa-lg" aria-hidden="true"></i>
            <h5 style="margin-top:.5rem">2</h5>  
        </div>              
      </div>      
  `;}
}
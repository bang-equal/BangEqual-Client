import MenuItem from "./elements/menuItem";

export default class Menu {
  constructor(onclick) {
    this.el = document.getElementsByClassName('header-menu')[0];
    this.menuItemClick = onclick;
    this.el.innerHTML = this.render();
    this.createMenu();
    this.assignHamburgerClick(); 
  }

  createMenu(){
    let items = ["Home", "Articles", "OPP"];
    for(let mi of items) {
    let menuitem = new MenuItem(mi, this.menuItemClick);
    if( mi === "Home") {
        menuitem.el.classList.add("menu-wrapper-selected");
    }
    //Append to header menu
    this.el.appendChild(menuitem.el);

    }
  };

  assignHamburgerClick(){

    let h = document.getElementsByClassName('hamburger')[0];
    h.addEventListener("click", (e) => {
        this.doHamburgerClick();
    });    
  }

  doHamburgerClick(){



    let mw = document.getElementsByClassName('menu-wrapper'); 
    var i;
    for (i = 0; i < mw.length; i++) {
        if(!mw[i].classList.contains("hide")) {
            mw[i].classList.add("hide");
        }
        else {
            mw[i].classList.remove("hide");
        }
    }     
  }

  render() {
    return `
      <div class="mobile-menu">
        <img class="mobile-logo" />
        <h2>BangEqual</h2>
        <img class="hamburger" />
      </div>
  `;}
}
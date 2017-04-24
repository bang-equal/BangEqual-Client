import SubmitButton from "./elements/submitButton";

export default class Topmargin {
  constructor() {
    this.el = document.getElementsByClassName('header-topmargin')[0];
   // this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
    const submitButton = new SubmitButton();
  }
  

 // onClick(evt) {
       // new Header("_");
    //}

  render() {
    return `
    <form class="login-form">
      <input id="login-username" type="text" value="larry@ok.com">
      <input id="login-password" type="text" value="Abc123!">
      <div id="submit-wrapper"></div>
    </form>
  `;}
}
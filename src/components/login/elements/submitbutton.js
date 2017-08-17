import {submitLogin} from "../../../services/login_service";

export default class SubmitButton {
  constructor() {
    this.el = document.getElementById('submit-wrapper');
    this.el.addEventListener("click", (e) => { this.onClick(e); });
    this.el.innerHTML = this.render(); 
  }
  
  onClick(evt) {
      if ((document.getElementById('login-username').value != "") && (document.getElementById("login-password").value != "")) {
          var jsonData = {};
          jsonData["Email"] = document.getElementById('login-username').value;
          jsonData["PasswordHash"] = document.getElementById('login-password').value;
          submitLogin(jsonData);
      }    
  }

  render() {
    return `
    <button class="submit-button" type="button" >Submit</button>
  `;}
}
export default class Adbar {
  constructor(onclick) {
    this.el = document.getElementsByClassName('content-adbar1')[0];
    this.clickfunc = onclick;
  }

  onClick(evt) {
    this.clickfunc();
  }
}
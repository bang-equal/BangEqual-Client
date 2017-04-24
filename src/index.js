'use strict';

import {ViewportService} from "./services/viewport-service.js";
import Menu from "./components/Menu/menu";
import Jumbotron from "./components/jumbotron/jumbotron";
import Topmargin from "./components/topmargin/topmargin";
import Articles from "./components/articles/articles";
import Adbar from "./components/adbar/adbar";
import * as rest from './services/rest';


//let mouthcharfunc = () => {
    //let el = document.getElementsByClassName('mouth-char')[0];
    //var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
    //let x = chars.substr( Math.floor(Math.random() * 62), 1);

    //let el = document.getElementsByClassName('ba-header')[0];
    //el.innerHTML = '';
    //const header = new Header(x);
//}



const jumbotron = new Jumbotron();
const menu = new Menu();
const topmargin = new Topmargin();

const viewportServ = new ViewportService();
const adBar = new Adbar();
const elementsCount = parseInt(viewportServ.getType());
let articles;




//Make a get request for initial JSON data
//This is not a get all articles request
//More like get all articles, all sidebar data, etc

let url = "http://localhost:5000/blog/blogarticle";

rest.get(url, false).then(function(results){
    //Extract the data needed for each component
    //Build component here and pass specific data
    articles = new Articles(elementsCount, results);   
});






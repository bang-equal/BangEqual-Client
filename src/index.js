'use strict';

import {ViewportService} from "./services/viewport-service.js";
import Menu from "./components/Menu/menu";
import Jumbotron from "./components/jumbotron/jumbotron";
import Topmargin from "./components/topmargin/topmargin";
import MultiComponent from "./components/multicomponent/multicomponent";
import SingleView from "./components/singleview/singleview";
import Adbar from "./components/adbar/adbar";
import * as rest from './services/rest';
import * as articleservice from './services/article_service';


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

let singlepostid = 0;
let articleCache = [];
let lastCacheArticleId = '0';
let firstCacheArticleId = '0';
let chunkLength = '0'
let nextViewChunk = '0';
let chunkSize = '0';
let chunk = [];
let multview;
let singleview;

const centerContent =  document.getElementsByClassName('content-center')[0];

let showSingle = (e) => {
    singlepostid = parseInt(e);
    centerContent.innerHTML = '';

    if(singlepostid > 0) {
        articleservice.findById(singlepostid).then(function(newresults) {
            singleview = new SingleView(newresults, showMult);
            centerContent.appendChild(singleview.el);
        });       
    }
}

let showMult = (e) => {
    centerContent.innerHTML = '';
    displayChunk();
}

let fillArticleCache = () => {

    if(articleCache.length === 0) {
        travArticleCache();
    }
    else {
        if ( elementsCount !== chunkSize) {
            travArticleCache();
        }
    }
}

let travArticleCache = () => {

    articleservice.findAll().then(function(results) {

         //separate into blocks of articlesCount
        for (let r = 0; r < results.length; r += elementsCount ) {
            articleCache.push(results.slice(r, r + elementsCount));
        }

        chunkLength = articleCache.length;
        //get lastchunk
        let lastChunk = articleCache.slice(articleCache.length - 1);
        //get lastobject
        let lastobj = lastChunk[0];
        //get number of items in chunk
        chunkSize = lastobj.length;
        //get lastpostid
        lastCacheArticleId = lastobj[lastobj.length - 1].id;
        //chunks are blocks of articlesCount
        let chunk = articleCache[nextViewChunk];
        //id of first article in first chunk
        firstCacheArticleId = chunk[0].id;
        //draw all elements in current cache chunk

        displayChunk();
    });
 }

 let displayChunk = () => {
    for (let art of articleCache[nextViewChunk]) {
        //create multivew component
        multview = new MultiComponent(art.articleTitle, art.articleContent, art.articleId, showSingle);
        //append new multiview component to parent element
        centerContent.appendChild(multview.el); 
    }
 }


 fillArticleCache();









'use strict';

import {ViewportService} from "./services/viewport-service.js";
import Menu from "./components/Menu/menu";
import Jumbotron from "./components/jumbotron/jumbotron";
import Topmargin from "./components/topmargin/topmargin";
import MultiView from "./components/multiview/multiview";
import SingleView from "./components/singleview/singleview";
import AdbarItem from "./components/adbar-item/adbar-item";
import * as rest from './services/rest';
import * as articleservice from './services/article_service';
import * as designservice from './services/design_service';


let mouthcharfunc = () => {
    var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
    let x = chars.substr( Math.floor(Math.random() * 62), 1);

    return x
}
const jumbotron = new Jumbotron(mouthcharfunc());
const menu = new Menu();
const topmargin = new Topmargin();

const viewportServ = new ViewportService();
const mainCount = parseInt(viewportServ.getType());
const adbarCount = 2;

let singlepostid = 0;

let contentType = '';
let contentCache = [];
let lastContentCacheId = '0';
let firstContentCacheId = '0';
let contentChunkLength = '0'
let contentNextViewChunk = '0';
let contentChunkSize = '0';
let contentChunk = [];

let adbarType = '';
let adbarCache = [];
let lastAdbarCacheId = '0';
let firstAdbarCacheId = '0';
let adbarChunkLength = '0'
let adbarNextViewChunk = '0';
let adbarChunkSize = '0';
let adbarChunk = [];

let multview;
let singleview;
let adbaritem;

const main =  document.getElementsByClassName('content-main')[0];
const adbar =  document.getElementsByClassName('content-adbar')[0];

let showSingle = (e) => {
    singlepostid = parseInt(e);
    centerContent.innerHTML = '';

    if(singlepostid > 0) {
        articleservice.findById(singlepostid).then(function(newresults) {
            //Remove class that limits vertical space
            var el = document.getElementsByClassName('site-content')[0];
            if(el.classList) {
                if(el.classList.contains("site-content-multiview")) 
                    el.classList.remove("site-content-multiview");
            }
            singleview = new SingleView(newresults, showMult);
            content-main.appendChild(singleview.el);
        });       
    }
}

let showMult = (e) => {
    main.innerHTML = '';
    displayContentChunk();
}

let fillContentCache = () => {

    if(contentCache.length === 0 ) {
        travCache("content");
    }
    else {
        if ( mainCount !== contentChunkSize) {
            travCache("content");
        }
    }
}

let fillAdbarCache = () => {

    if(adbarCache.length === 0 ) {
        travCache("adbar");
    }
    else {
        if ( adbarCount !== adbarChunkSize) {
            travCache("adbar");
        }
    }
}

let travCache = (type) => {
    if(type === "adbar") {
        if(adbarType === "designs") {
             designservice.findAll().then(function(results) {

                     //separate into blocks of adbarCount
                    for (let r = 0; r < results.length; r += adbarCount ) {
                        adbarCache.push(results.slice(r, r + adbarCount));
                    }

                    adbarChunkLength = adbarCache.length;
                    //get lastchunk
                    let lastChunk = adbarCache.slice(adbarCache.length - 1);
                    //get lastobject
                    let lastobj = lastChunk[0];
                    //get number of items in chunk
                    adbarChunkSize = lastobj.length;
                    //get lastpostid
                    lastAdbarCacheId = lastobj[lastobj.length - 1].id;
                    //chunks are blocks of articlesCount
                    let chunk = adbarCache[adbarNextViewChunk];
                    //id of first article in first chunk
                    firstAdbarCacheId = chunk[0].id;
                    //draw all elements in current cache chunk

                    displayAdbarChunk();
            });
        }
    }
    else {
        switch(contentType) {
            case ("articles"):              
                articleservice.findAll().then(function(results) {

                    //separate into blocks of mainCount
                    for (let r = 0; r < results.length; r += mainCount ) {
                        contentCache.push(results.slice(r, r + mainCount));
                    }

                    contentChunkLength = contentCache.length;
                    //get lastchunk
                    let lastChunk = contentCache.slice(contentCache.length - 1);
                    //get lastobject
                    let lastobj = lastChunk[0];
                    //get number of items in chunk
                    contentChunkSize = lastobj.length;
                    //get lastpostid
                    lastContentCacheId = lastobj[lastobj.length - 1].id;
                    //chunks are blocks of articlesCount
                    let chunk = contentCache[contentNextViewChunk];
                    //id of first article in first chunk
                    firstContentCacheId = chunk[0].id;
                    //draw all elements in current cache chunk
                    displayContentChunk();
                });
                break;
            default:
                alert('hello from travcache');
        }
    }

 }

 let displayContentChunk = () => {

    //Limit amount of vertical space by adding multview class 
    var el = document.getElementsByClassName('site-content')[0];
    if(el.classList) {
        if(!el.classList.contains("site-content-multiview")) {
            el.classList.add("site-content-multiview");
        }
    }

    for (let ele of contentCache[contentNextViewChunk]) {
        //create multivew component
        //Here we are getting all content and only displaying 100 chars
        //Maybe move this to server
        let caption = "";
        caption = ele.articleContent.substring(0, 100);

        switch(contentType) {
            case("articles"):
                multview = new MultiView(ele.articleTitle, caption, ele.articleId, ele.articleAuthor,ele.articleViews, ele.articleShares, ele.articleTags, showSingle);
                break;
            default:
                alert('hello from displaycontentchunk');
        }
        //append new multiview component to parent element
        main.appendChild(multview.el); 
    }
 }

 let displayAdbarChunk = () => {

     for (let ele of adbarCache[adbarNextViewChunk]) {
            //create multivew component
            //Here we are getting all content and only displaying 100 chars
            //Maybe move this to server

            switch(adbarType) {
                case("designs"):
                    adbaritem = new AdbarItem(ele.designId, ele.designTitle, ele.designAuthor, ele.designBLOB, ele.designItemsSold, ele.designShares);
                    break;
                default:
                    alert('hello from displayadbarchunk');
        }
        //append new multiview component to parent element
        adbar.appendChild(adbaritem.el); 
    }
 }

contentType = "articles";
adbarType = "designs"
fillContentCache();
fillAdbarCache();










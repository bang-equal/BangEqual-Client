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


let mouthcharfunc = () => {
    var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
    let x = chars.substr( Math.floor(Math.random() * 62), 1);

    return x
}
const jumbotron = new Jumbotron(mouthcharfunc());
const menu = new Menu();
const topmargin = new Topmargin();

const viewportServ = new ViewportService();
const adBar = new AdbarItem();
const elementsCount = parseInt(viewportServ.getType());

let singlepostid = 0;
let elementCache = [];
let elementType = '';
let lastCacheId = '0';
let firstCacheId = '0';
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
            //Remove class that limits vertical space
            var el = document.getElementsByClassName('ba-content')[0];
            if(el.classList) {
                if(el.classList.contains("ba-content-multiview")) 
                    el.classList.remove("ba-content-multiview");
            }
            singleview = new SingleView(newresults, showMult);
            centerContent.appendChild(singleview.el);
        });       
    }
}

let showMult = (e) => {
    centerContent.innerHTML = '';
    displayChunk();
}

let fillCache = () => {

    if(elementCache.length === 0 || type !== elementType) {
        travCache();
    }
    else {
        if ( elementsCount !== chunkSize) {
            travCache();
        }
    }
}

let travCache = () => {

    switch(elementType) {
        case ("articles"):              
            articleservice.findAll().then(function(results) {

                //separate into blocks of elementCount
                for (let r = 0; r < results.length; r += elementsCount ) {
                    elementCache.push(results.slice(r, r + elementsCount));
                }

                chunkLength = elementCache.length;
                //get lastchunk
                let lastChunk = elementCache.slice(elementCache.length - 1);
                //get lastobject
                let lastobj = lastChunk[0];
                //get number of items in chunk
                chunkSize = lastobj.length;
                //get lastpostid
                lastCacheId = lastobj[lastobj.length - 1].id;
                //chunks are blocks of articlesCount
                let chunk = elementCache[nextViewChunk];
                //id of first article in first chunk
                firstCacheId = chunk[0].id;
                //draw all elements in current cache chunk
                displayChunk();
            });
            break;
        default:
            alert('hello');
    }

 }

 let displayChunk = () => {

    //Limit amount of vertical space by adding multview class 
    var el = document.getElementsByClassName('ba-content')[0];
    if(el.classList) {
        if(!el.classList.contains("ba-content-multiview")) {
            el.classList.add("ba-content-multiview");
        }
    }

    for (let ele of elementCache[nextViewChunk]) {
        //create multivew component
        //Here we are getting all content and only displaying 100 chars
        //Maybe move this to server
        let caption = "";
        caption = ele.articleContent.substring(0, 100);

        switch(elementType) {
            case("articles"):
                multview = new MultiView(ele.articleTitle, caption, ele.articleId, showSingle);
        }
        //append new multiview component to parent element
        centerContent.appendChild(multview.el); 
    }
 }

elementType = "articles";
 fillCache();









'use strict';

import {ViewportService} from "./services/viewport-service.js";
import Menu from "./components/Menu/menu";
import Jumbotron from "./components/jumbotron/jumbotron";
import Topmargin from "./components/topmargin/topmargin";
import MultiView from "./components/multiview/multiview";
import SingleView from "./components/singleview/singleview";
import AdbarItem from "./components/adbar-item/adbar-item";
import CloseButton from "./sharedelements/closeButton";
import * as rest from './services/rest';
import * as homeservice from './services/home_service';

const topmargin = new Topmargin();
const viewportServ = new ViewportService();
const sitecontent = document.getElementsByClassName('site-content')[0];
const main =  document.getElementsByClassName('content-main')[0];
const adbar =  document.getElementsByClassName('content-adbar')[0];
const menu =  document.getElementsByClassName('header-menu')[0];
const adbartitle =  document.getElementsByClassName('adbar-title')[0];
const jumbo =  document.getElementsByClassName('header-jumbotron')[0];
const contentclosebutton =  document.getElementsByClassName('content-closebutton')[0];
let close;

let dataCache = {};

let singlepostid = 0;
let multview;
let singleview;
let menuitem;
let adbaritem;


let initDataCache = () => {
    dataCache.contentCache = [];
    dataCache.contentChunkSize = '0';
    dataCache.contentCount = parseInt(viewportServ.getType());
    dataCache.contentNextViewChunk = '0';
    dataCache.contentFirstCacheId = '0';
    dataCache.contentLastCacheId = '0';
    dataCache.contentChunkLength = '0';
    dataCache.contentChunk = [];
    dataCache.contentType = '';

    dataCache.adbarCache = [];
    dataCache.adbarChunkSize = '0';
    dataCache.adbarCount = '2';
    dataCache.adbarNextViewChunk = '0';
    dataCache.adbarFirstCacheId = '0';
    dataCache.adbarLastCacheId = '0';
    dataCache.adbarChunkLength = '0';
    dataCache.adbarChunk = [];
    dataCache.adbarType = '';
}

let clearDataCache = (cacheType) => {

    dataCache[cacheType + "Cache"].length = 0; 
    dataCache[cacheType + "ChunkSize"] = '0';
    //dataCache.contentCount = parseInt(viewportServ.getType());
    dataCache[cacheType + "NextViewChunk"] = '0';
    dataCache[cacheType + "FirstCacheId"] = '0';
    dataCache[cacheType + "LastCacheId"] = '0';
    dataCache[cacheType + "ChunkLength"] = '0';
    dataCache[cacheType + "Chunk"].length = 0;
    dataCache[cacheType + "contentType"] = '';
}

let showSingle = (e, topic, type) => {
    singlepostid = parseInt(e);
    main.innerHTML = '';

    //Remove class that limits vertical space
    var el = document.getElementsByClassName('site-content')[0];
    if(el.classList) {
        if(el.classList.contains("site-content-multiview")) 
            el.classList.remove("site-content-multiview");
    }

    if(singlepostid && singlepostid > 0) {
        homeservice.findById(singlepostid).then(function(newresults) {
            singleview = new SingleView(newresults, type);
            main.appendChild(singleview.el);

            close = new CloseButton(showMult, type)
            contentclosebutton.appendChild(close.el);
            if(close.el) {
                localStorage.setItem("close", close.el.offsetTop);
            }
        });        
    }
    else {
        console.log('error in showSingle');
    }
}

let showMult = (e) => {

    if(e.currentTarget.contentType) {
        main.innerHTML = '';
        contentclosebutton.innerHTML = '';
        displayChunk("content", e.currentTarget.contentType);
    }
    else {
        console.log('error in showMult');
    }
}

let fillCache = (cacheType, elementType) => {
     
    if(!dataCache[cacheType + "Cache"] || dataCache[cacheType + "Cache"].length === 0 ) {
        travCache(cacheType, elementType);
    }
    else {
        if ( dataCache[cacheType + "Count"] !== dataCache[cacheType + "ChunkSize"]) {
            travCache(cacheType, elementType);
        }
    }
}

let travCache = (cacheType, elementType) => {

    homeservice.findByType(elementType).then(function(results) {           
            assignChunkValues(results, cacheType, elementType);
            displayChunk(cacheType, elementType);

            // Set object into storage
            localStorage.setItem(elementType, JSON.stringify(results));
    });
}

let assignChunkValues = (results, cacheType, elementType) => {

    //separate into blocks determined by viewportservice
    for (let r = 0; r < results.length; r += dataCache[cacheType + "Count"]  ) {
        dataCache[cacheType + "Cache"].push(results.slice(r, r + dataCache[cacheType + "Count"] ));
    }

    dataCache[cacheType + "ChunkLength"]  = dataCache[cacheType + "Cache"].length;
    //get lastchunk
    let lastChunk = dataCache[cacheType + "Cache"].slice(dataCache[cacheType + "Cache"].length - 1);
    //get lastobject
    let lastobj = lastChunk[0];
    //get number of items in chunk
    dataCache[cacheType + "ChunkSize"] = lastobj.length;
    //get lastpostid
    dataCache[cacheType + "LastCacheId"] = lastobj[lastobj.length - 1].id;
    //chunks are blocks of articlesCount
    let chunk = dataCache[cacheType + "Cache"][dataCache[cacheType + "NextViewChunk"]];
    //id of first article in first chunk
    dataCache[cacheType + "FirstCacheId"] = chunk[0].id;
    dataCache[cacheType + "Type"] = elementType;
}

let displayChunk = (cacheType, elementType) => {

    //Limit amount of vertical space by adding multview class 
    if(sitecontent.classList) {
        if(!sitecontent.classList.contains("site-content-multiview")) {
            sitecontent.classList.add("site-content-multiview");
        }
    }

    //Check if Cache needs to be rebuilt
    if(elementType !== dataCache[cacheType + "Type"]) {

        //Check localStorage first
        let ls = localStorage.getItem(elementType);
        ls = JSON.parse(ls);
        if(ls.length > 0) {
            clearDataCache(cacheType);
            assignChunkValues(ls, cacheType, elementType);
            displayChunk(cacheType, elementType);
        }
        else {
            fillCache(contentType, elementType);
        }
        return;
    }
   
   //Iterate through Cache
    for (let ele of dataCache[cacheType + "Cache"][dataCache[cacheType + "NextViewChunk"]]) {

        if(cacheType === "content") {
            //create multivew component
            //Here we are getting all content and only displaying 100 chars
            //Maybe let server do that work

            //Create individual components representing each item in cache
            multview = new MultiView(ele, showSingle, elementType);

            //append new multiview component to parent element
            main.appendChild(multview.el);
        }
        else if(cacheType === "adbar") {

            //Create individual components representing each item in cache
            adbaritem = new AdbarItem(ele, showSingle, elementType);
            adbar.appendChild(adbaritem.el);
        } 
    } 

    if(cacheType === "adbar") {
        adbartitle.innerHTML = '';
        if(elementType === "articles") {
            adbartitle.innerHTML = 'Last Blog Articles';
        }
        else if(elementType === "designs") {
            adbartitle.innerHTML = 'Recent Code Revwz';
        }
    }
}

let menuClick = (menuitem) => {

    main.innerHTML = '';
    adbar.innerHTML = '';

    //Remove selected css
    let menuitemselected =  document.getElementsByClassName('menu-wrapper-selected')[0];
    if(menuitemselected) {
        menuitemselected.classList.remove("menu-wrapper-selected");
    }

    //Add selected css
    let menuitemnext =  document.getElementById(menuitem);
    if(menuitemnext) {
        menuitemnext.classList.add("menu-wrapper-selected");
    }

    switch(menuitem) {
        case "Blog":
            displayChunk('content', 'article');
            displayChunk('adbar', 'design');  
            break;  
        case "Code Rev":
            displayChunk('content', 'design');
            displayChunk('adbar', 'article');  
            break;
        default:
            console.log('error in menuclick');
    }   
}

let createMenu = () => {
    let items = ["Blog", "Code Rev", "About Us"];
    for(let mi of items) {
        menuitem = new Menu(mi, menuClick);
        if( mi=== "Blog") {
            menuitem.el.classList.add("menu-wrapper-selected");
        }
        menu.appendChild(menuitem.el);
    }
}

const jumbotron = new Jumbotron();

initDataCache();
createMenu();
fillCache("content", "article");
fillCache("adbar", "design");

//Initialize scroll event listener vars
let ticking = false
let windowScroll = 0;
let menuOffset = 0;
let closeOffset = 0;

//Detect original distance b/w nav and top and
//Save value in localstorage
localStorage.setItem("menuoffset", menu.offsetTop);

//Scroll eventlistener creates sticky header
const onScroll = () => {

    windowScroll = window.pageYOffset;
    menuOffset = localStorage.getItem("menuoffset");
    closeOffset = localStorage.getItem("close");
    //Event throttled by requestAnimationFrame as recommended by Mozilla Foundation  https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    if (!ticking) {
        window.requestAnimationFrame(function() {
        
        //If window has scrolled below menuoffset
        if(windowScroll >= menuOffset) {
            if(menu.className === "header-menu") {
                menu.className = "header-menu sticky-header";
            }
        }
        else if(menuOffset > windowScroll){
            if(menu.className === "header-menu sticky-header") {
                menu.className = "header-menu";
            }
        }
        
        if(windowScroll >= closeOffset - 1 && closeOffset) {
            if(close && close.el.className === "single-close-button") {
                close.el.className = "single-close-button sticky-button";
            }
        }
        else if(closeOffset && closeOffset + 1 > windowScroll) {
            if(close && close.el.className === "single-close-button sticky-button") {
                close.el.className = "single-close-button";
            }
        }

        ticking = false;
        });
    }
    ticking = true;

}
document.addEventListener("scroll", onScroll);













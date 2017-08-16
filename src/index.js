'use strict';

import {ViewportService} from "./services/viewport-service.js";
import Menu from "./components/Menu/menu";
import HomePage from "./components/HomePage/homepage";
import Jumbotron from "./components/jumbotron/jumbotron";
import Topmargin from "./components/topmargin/topmargin";
import MultiView from "./components/multiview/multiview";
import SingleView from "./components/singleview/singleview";
import AdbarItem from "./components/adbar-item/adbar-item";
import Filter from "./components/filter-item/filter-item";
import CloseButton from "./sharedelements/closeButton";
import ContentBanner from "./sharedelements/contentbanner"
import * as rest from './services/rest';
import * as homeservice from './services/home_service';
import * as helperservice from './services/helper';

const topmargin = new Topmargin();
const viewportServ = new ViewportService();
const cs = parseInt(viewportServ.getType());
const sitecontent = document.getElementsByClassName('site-content')[0];
const main =  document.getElementsByClassName('main-wrapper')[0];
const adbar =  document.getElementsByClassName('content-adbar')[0];
const menu =  document.getElementsByClassName('header-menu')[0];
const stickymenu =  document.getElementsByClassName('sticky-menu')[0];
const adbartitle =  document.getElementsByClassName('adbar-title')[0];
const jumbo =  document.getElementsByClassName('header-jumbotron')[0];
const filter =  document.getElementsByClassName('main-filter')[0];
const header =  document.getElementsByClassName('site-header')[0];
const sw = document.getElementsByClassName('site-wrapper')[0];
const mw = document.getElementsByClassName('menu-wrapper');
const hamburger = document.getElementsByClassName('hamburger')[0];

let close;
let banner;
let singlepostid = 0;
let multview;
let singleview;
let menuitem;
let adbaritem;
let filteritem;
let homepage;

const showHomeResults = (results, type) => {

    if(results.length > 0) {

            //Display first collection of results
            for (let ele of results[0]) {
                //Create individual components representing each object in collection
                multview = new MultiView(ele, showSingle, type);

                //append new multiview component to parent element
                main.appendChild(multview.el);
            }
        }
        else {
            console.log('error in showhomeresults');
    }
}

let showSingle = (e, topic, type) => {
    singlepostid = parseInt(e);
    main.innerHTML = '';

    if(filter.className === "main-filter") {
        filter.className = "main-filter invisible";
    }

    if(singlepostid && singlepostid > 0) {

        homeservice.findById(singlepostid).then(function(results) {

            singleview = new SingleView(results, type);
            main.appendChild(singleview.el);
        });        
    }
    else {
        console.log('error in showSingle');
    }
}

let showMult = (id, type) => {

    main.innerHTML = '';

    //Show results filter
    if(filter.className === "main-filter invisible") {
        filter.className = "main-filter";
    }

    //Display results saved in localStorage
    let ls;
    ls = localStorage.getItem(type + 'filtered');
    if(!ls) {
        ls = localStorage.getItem(type);
    }

    //Get data from server
    if(!ls){
        homeservice.findByType(type, cs).then(function(results) {
            showHomeResults(results, type);
        });
    }

    if(ls) {     
        ls = JSON.parse(ls);
        showHomeResults(ls, type);
    }  
    else {
        console.log('error in showmult');
    } 
}

let selectMenu = (menuitem) => {
    //Only show site header in Home Page
    if(menuitem === "Home") {
        if(header.classList.contains("hide")) {
            header.classList.remove("hide");
        }
        //Hide stickymenu if large screen only
        if(!stickymenu.classList.contains("hide") &&
            cs > 5) {
            stickymenu.classList.add("hide");
        }
    }
    //Hide header and sticky menu to top of page
    else {
        if(!header.classList.contains("hide")) {
            header.classList.add("hide");
        }
        if(stickymenu.classList.contains("hide")) {
            stickymenu.classList.remove("hide");
        }
    }

    //Remove selected css from menu item
    let menuitemselected =  document.getElementsByClassName('menu-wrapper-selected')[0];
    if(menuitemselected) {
        menuitemselected.classList.remove("menu-wrapper-selected");
    }

    //Add selected css to menu item
    let menuitemnext =  document.getElementById(menuitem);
    if(menuitemnext) {
        menuitemnext.classList.add("menu-wrapper-selected");
    }
}

let menuClick = (menuitem) => {

    main.innerHTML = '';
    filter.innerHTML = '';
    

    switch(menuitem) {
        case "Home":
            if(filter.classList) {
                if(!filter.classList.contains("hide")) 
                    filter.classList.add("hide");
            }
            selectMenu(menuitem);
            homepage = new HomePage();
            main.appendChild(homepage.el);      
            break;  
        case "Articles":
            //Remove class that limits vertical space
            if(sw.classList) {
                if(sw.classList.contains("home")) 
                    sw.classList.remove("home");
            }
            if(filter.classList) {
                if(filter.classList.contains("hide")) 
                    filter.classList.remove("hide");
            }
            selectMenu(menuitem);
            createFilter('article');
            showMult('','article'); 
            break;  
        case "OPP":
            if(filter.classList) {
                if(!filter.classList.contains("hide")) 
                    filter.classList.add("hide");
            }
            selectMenu(menuitem);
            banner = new ContentBanner('privacy');
            filter.appendChild(banner.el);
            showMult('','privacy');
            break;
        default:
            homepage = new HomePage();
            main.appendChild(homepage.el);  
    }

    if(cs < 5) 
        hamburgerClick();

    helperservice.fadeIn(sw);
}

let filterClick = (filteritem, type) => {
    //Clear items in multview
    main.innerHTML = '';

    //Add selected css
    let filter_item_selected =  document.getElementById(filteritem + "_close_button");
    if(filter_item_selected && filter_item_selected.classList.contains("hide")) {
        filter_item_selected.classList.remove("hide");
        filter_item_selected.classList.add("show");
    }

    homeservice.findByTopic(filteritem, cs, type).then(function(results) {   

        //Retrieve two collections of results
        //Display first collection
        for (let ele of results[0]) {
            //Create individual components representing each object in collection
            multview = new MultiView(ele, showSingle, 'article');

            //append new multiview component to parent element
            main.appendChild(multview.el);
        }

        // Save both collections into local storage
        localStorage.setItem(type + 'filtered', JSON.stringify(results));
    });
}

let cancelClick = (filteritem, type) => {

    //Clear items in multview
    main.innerHTML = '';

    //Clear Filtered Local Storage
    localStorage.removeItem(type + "filtered");

    //Remove selected css
    let filter_item_selected =  document.getElementById(filteritem);
    if(filter_item_selected && filter_item_selected.classList.contains("show")) {
        filter_item_selected.classList.remove("show");
        filter_item_selected.classList.add("hide");
    }

    showMult('', type);
}

let createMenu = () => {
    let items = ["Home", "Articles", "OPP"];
    for(let mi of items) {
        menuitem = new Menu(mi, menuClick);
        if( mi === "Home") {
            menuitem.el.classList.add("menu-wrapper-selected");
        }
        //Append to header menu
        menu.appendChild(menuitem.el);
        //Clone menuitem element
        let cn = menuitem.el.cloneNode(true);
        //Attach a click handler because cloning skips does not
        cn.addEventListener("click", (e) => { menuClick(e.currentTarget.id)});
        //Append cloned element to sticky menu
        stickymenu.appendChild(cn);
    }

    if(stickymenu.classList) {
        if(!stickymenu.classList.contains("hide") && cs > 5) 
            stickymenu.classList.add("hide");
    }
}

let createFilter = (type) => {

     //Display results saved in localStorage
    let ls;
    ls = localStorage.getItem(type + 'topics');
    if(!ls) {  
        //Query server for string list of all topics
        homeservice.getAllTopics(type).then(function(results) {           
            
            for(let r of results) {
                filteritem = new Filter(r, filterClick, cancelClick, type);
                filter.appendChild(filteritem.el);
            }

            // Persist results in local storage
            localStorage.setItem(type + 'topics', JSON.stringify(results));
        });
    }
    else {
        ls = JSON.parse(ls);
        if(ls.length > 0) {

            for(let r of ls) {
                filteritem = new Filter(r, filterClick, cancelClick, type);
                filter.appendChild(filteritem.el);
            }
        }
    }
}

let hamburgerClick = () => {
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

const jumbotron = new Jumbotron();

localStorage.clear();
hamburger.addEventListener("click", (e) => { 
   hamburgerClick();
});
createMenu();
menuClick();

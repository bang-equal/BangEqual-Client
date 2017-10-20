'use strict';

import {ViewportService} from "./services/viewport-service.js";
import Menu from "./components/Menu/menu";
import HomePage from "./components/HomePage/homepage";
import Jumbotron from "./components/jumbotron/jumbotron";
import Login from "./components/login/login";
import MultiView from "./components/multiview/multiview";
import SingleView from "./components/singleview/singleview";
import AdbarItem from "./components/adbar-item/adbar-item";
import Filter from "./components/filter-item/filter-item";
import CloseButton from "./sharedelements/closeButton";
import ContentBanner from "./sharedelements/contentbanner"
import * as rest from './services/rest';
import * as articleservice from './services/article_service';
import * as helperservice from './services/helper';

const login = new Login();
const viewportServ = new ViewportService();
const cs = parseInt(viewportServ.getType());
const sitecontent = document.getElementsByClassName('site-content')[0];
const main =  document.getElementsByClassName('main-wrapper')[0];
const adbar =  document.getElementsByClassName('content-adbar1')[0];
const adbartitle =  document.getElementsByClassName('adbar-title')[0];
const ht =  document.getElementsByClassName('header-topmargin')[0];
const jumbo =  document.getElementsByClassName('header-jumbotron')[0];
const filter =  document.getElementsByClassName('main-filter')[0];
const header =  document.getElementsByClassName('site-header')[0];
const hm = document.getElementsByClassName('header-menu')[0];
const sw = document.getElementsByClassName('site-wrapper')[0];
const sh = document.getElementsByClassName('site-header')[0];
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

const showHomeResults = (results) => {

    if(results.length > 0) {

            //Display first collection of results
            for (let ele of results[0]) {
                //Create individual components representing each object in collection
                multview = new MultiView(ele, showSingle);
                
                    //append new multiview component to parent element
                main.appendChild(multview.el); 
            }
        }
        else {
            console.log('error in showhomeresults');
    }
}

let showSingle = (e) => {
    main.innerHTML = '';

    if(filter.className === "main-filter") {
        filter.className = "main-filter invisible";
    }

    articleservice.getArticleTextById(e.articleIdFK).then(function(results) {
        singleview = new SingleView(e, results.articleText);
        main.appendChild(singleview.el);
    });
}

let showMult = () => {

    main.innerHTML = '';

    //Show results filter
    if(filter.className === "main-filter invisible") {
        filter.className = "main-filter";
    }

    //Display results saved in localStorage
    let ls;
    ls = localStorage.getItem('filtered');
    if(!ls) {
        ls = localStorage.getItem('all');
    }

    //Get data from server
    if(!ls){
        articleservice.getArticles(cs).then(function(results) {
            localStorage.setItem('all', JSON.stringify(results));
            showHomeResults(results);
        });
    }

    if(ls) {     
        ls = JSON.parse(ls);
        showHomeResults(ls);
    }  
    else {
        console.log('error displaying results');
    } 
}

let selectMenu = (menuitem) => {

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
        case "Bang Equal":
            if(filter.classList) {
                if(!filter.classList.contains("hide")) 
                    filter.classList.add("hide");
            }
            if(sh.classList) {
                if(sh.classList.contains("remove-image")) 
                        sh.classList.remove("remove-image");
            }
            selectMenu(menuitem);
            homepage = new HomePage();
            main.appendChild(homepage.el);      
            break;  
        case "Articles":
            //Remove class that limits vertical space
            if(filter.classList) {
                if(filter.classList.contains("hide")) 
                    filter.classList.remove("hide");
            }

            selectMenu(menuitem);
            createFilter();
            showMult(); 
            break;  
        case "OPP":
            if(filter.classList) {
                if(!filter.classList.contains("hide")) 
                    filter.classList.add("hide");
            }
            selectMenu(menuitem);
            banner = new ContentBanner('privacy');
            filter.appendChild(banner.el);
            showMult();
            break;
        default:
            homepage = new HomePage();
            contentmain.appendChild(homepage.el);  
    }

    //Only small screens
    
    //Close menu after hamburger click
    if(cs < 6 ) {
        let mw1 = document.getElementsByClassName('menu-wrapper'); 
        var i;
        for (i = 0; i < mw1.length; i++) {
            if(!mw1[i].classList.contains("hide")) {
                mw1[i].classList.add("hide");
            }
            else {
                mw1[i].classList.remove("hide");
            }
        }
    }
    else if(menuitem !== "Bang Equal") {
         if(jumbo.classList) {
            if(!jumbo.classList.contains("hide")) 
                jumbo.classList.add("hide");
        }

        if(ht.classList) {
            if(!ht.classList.contains("hide")) 
                    ht.classList.add("hide");
        }

        if(hm.classList) {
            if(!hm.classList.contains("sticky-menu")) 
                    hm.classList.add("sticky-menu");
        }

        if(sh.classList) {
            if(!sh.classList.contains("remove-image")) 
                    sh.classList.add("remove-image");
        }
    }
    else {
            if(jumbo.classList) {
                if(jumbo.classList.contains("hide")) 
                    jumbo.classList.remove("hide");
            }

            if(ht.classList) {
                if(ht.classList.contains("hide")) 
                    ht.classList.remove("hide");
            }

            if(hm.classList) {
                if(hm.classList.contains("sticky-menu")) 
                    hm.classList.remove("sticky-menu");
            }
    }     
    
    helperservice.fadeIn(sw);
}

let filterClick = (filteritem) => {
    //Clear items in multview
    main.innerHTML = '';

    //Add selected css
    let filter_item_selected =  document.getElementById(filteritem + "_close_button");
    if(filter_item_selected && filter_item_selected.classList.contains("hide")) {
        filter_item_selected.classList.remove("hide");
        filter_item_selected.classList.add("show");
    }

    articleservice.getArticlesByTag(cs, filteritem).then(function(results) {   

        //Retrieve two collections of results
        //Display first collection
        for (let ele of results[0]) {
            //Create individual components representing each object in collection
            multview = new MultiView(ele, showSingle);

            //append new multiview component to parent element
            main.appendChild(multview.el);
        }

        // Save both collections into local storage
        localStorage.setItem('filtered', JSON.stringify(results));
    });
}

let cancelClick = (filteritem) => {

    //Clear items in multview
    main.innerHTML = '';

    //Clear Filtered Local Storage
    localStorage.removeItem("filtered");

    //Remove selected css
    let filter_item_selected =  document.getElementById(filteritem);
    if(filter_item_selected && filter_item_selected.classList.contains("show")) {
        filter_item_selected.classList.remove("show");
        filter_item_selected.classList.add("hide");
    }

    showMult();
}

let createFilter = () => {

     //Display results saved in localStorage
    let ls;
    ls = localStorage.getItem('topics');
    if(!ls) {  
        //Query server for string list of all topics
        articleservice.getArticlesTagsAll().then(function(results) {           
            
            for(let r of results) {
                filteritem = new Filter(r, filterClick, cancelClick);
                filter.appendChild(filteritem.el);
            }

            // Persist results in local storage
            localStorage.setItem('topics', JSON.stringify(results));
        });
    }
    else {
        ls = JSON.parse(ls);
        if(ls.length > 0) {

            for(let r of ls) {
                filteritem = new Filter(r, filterClick, cancelClick);
                filter.appendChild(filteritem.el);
            }
        }
    }
}

const jumbotron = new Jumbotron();
const menu = new Menu(menuClick);

localStorage.clear();

menuClick("Bang Equal");

'use strict';

//Import Services
import * as rest from './services/rest';
import * as articleservice from './services/article_service';
import * as helperservice from './services/helper';
import {ViewportService} from "./services/viewport-service.js";

//Import Modules
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

//Init Components
const jumbotron = new Jumbotron();
const adbar = new AdbarItem();
const login = new Login();

//Init Services
const viewportServ = new ViewportService();
const cs = parseInt(viewportServ.getType());

//Declare UI Elements
const main =  document.getElementsByClassName('main-wrapper')[0];
const filter =  document.getElementsByClassName('main-filter')[0];
const hm = document.getElementsByClassName('header-menu')[0];
const sw = document.getElementsByClassName('site-wrapper')[0];
const sh = document.getElementsByClassName('site-header')[0];
const hamburger = document.getElementsByClassName('hamburger')[0];

//Init Vars
let banner;
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
            console.log('error in showhomeresults: results length equal 0');
    }
}

let showSingle = (e) => {
    main.innerHTML = '';

    if(filter.classList) {
        if(!filter.classList.contains("hide")) 
            filter.classList.add("hide");
    }

    history.pushState('single', "", "#/singleid=" + e.articleIdFK);

    articleservice.getArticleTextById(e.articleIdFK).then(function(results) {
        singleview = new SingleView(e, results.articleText);
        main.appendChild(singleview.el);
    });

     //Find a record in local storage with same infoid
     let storageChunksAll = JSON.parse(localStorage.getItem('all'));
     for (let i = 0; i < storageChunksAll.length; i++) {
         let storageChunkSingle = storageChunksAll[i];
         for (let ii = 0; ii < storageChunkSingle.length; ii++) {
             if(storageChunkSingle[ii].articleInfoId == e.articleIdFK) {
                //Found record now add to its view count
                storageChunkSingle[ii].articleViews++;
             }
             else {
                 //record not found in local storage, get record from server
             }
         }
     }

     // Persist modifications in local storage
     localStorage.setItem('all', JSON.stringify(storageChunksAll));
}

let showMult = () => {

    main.innerHTML = '';
    let backgroundColor;
    backgroundColor = '#db4437';

    //Display results saved in localStorage ls
    let ls;
    //Attempt to grab filtered results
    ls = localStorage.getItem('filtered');
    if(!ls) {
        //If no filtered, attempt to grab all results
        ls = localStorage.getItem('all');
    }

    //If local storage empty,Get data from server
    if(!ls){
        articleservice.getArticles(cs).then(function(results) {
            localStorage.setItem('all', JSON.stringify(results));
            console.log(results);
            showHomeResults(results);
            //Query server for string list of all topics
            articleservice.getArticlesTagsAll().then(function(results1) {           
                
                for(let r of results1) {
                    filteritem = new Filter(r, filterClick, cancelClick, backgroundColor);
                    filter.appendChild(filteritem.el);
                }

                // Persist results in local storage
                localStorage.setItem('topics', JSON.stringify(results1));
            });
        });
    }

    //Serialize local storage results and render them
    if(ls !== null) {     
        ls = JSON.parse(ls);
        showHomeResults(ls);

        //Display results saved in localStorage ls
        let ls1;
        //Attempt to grab filtered results
        ls1 = localStorage.getItem('topics');

        if(ls1 !== null) {
            ls1 = JSON.parse(ls1);
            for (let r of ls1) {
                filteritem = new Filter(r, filterClick, cancelClick, backgroundColor);
                filter.appendChild(filteritem.el);
            }
        }

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

    let currentState = history.state;
	let nextState;

    if (menuitem  === 'pop') {
			nextState = currentState;
	}  
	else {
			nextState = menuitem;
	}

    switch(nextState) {
        case "Bang Equal":
            //Do not show filter on home screen
            if(filter.classList) {
                if(!filter.classList.contains("hide")) 
                    filter.classList.add("hide");
            }
            //Ensure show full header with jumbotron
            if(sh.classList) {
                if(sh.classList.contains("shrink-header")) 
                        sh.classList.remove("shrink-header");
            }

            homepage = new HomePage();
            main.appendChild(homepage.el);   
            break;  

        case "Articles":
            //show filter only on large screens
            //TODO: make mobile filter with scroll
            if(filter.classList && cs > 5) {
                if(filter.classList.contains("hide")) 
                    filter.classList.remove("hide");
            }

            //shrink site header to convert to sticky menu
            if(sh.classList && cs > 5) {
                if(!sh.classList.contains("shrink-header")) 
                        sh.classList.add("shrink-header");
            }

            //createFilter();
            showMult();   
            break; 

        case "Shop":
            if(filter.classList) {
                if(!filter.classList.contains("hide")) 
                    filter.classList.add("hide");
            }
            //shrink site header to convert to sticky menu
            if(sh.classList && cs > 5) {
                if(!sh.classList.contains("shrink-header")) 
                        sh.classList.add("shrink-header");
            }

            banner = new ContentBanner('privacy');
            filter.appendChild(banner.el);
            showMult();  
            break;

        default:
                //Do not show filter on home screen
                if(filter.classList) {
                if(!filter.classList.contains("hide")) 
                    filter.classList.add("hide");
            }
            //Ensure show full header with jumbotron
            if(sh.classList) {
                if(sh.classList.contains("shrink-header")) 
                        sh.classList.remove("shrink-header");
            }
            history.replaceState("Bang Equal", "", "#/Bang Equal");
            homepage = new HomePage();
            main.appendChild(homepage.el);   
            break;    
    }
    //Add selected css to menu item
    selectMenu(nextState);

    //Save new page so that we can respond to back button		
    history.pushState(nextState, "", "#/" + nextState);
    

    //Small screens
    //Close menu after hamburger click
    if(cs < 6 ) {
        let mw = document.getElementsByClassName('menu-wrapper'); 
        for (let i = 0; i < mw.length; i++) {
            if(!mw[i].classList.contains("hide")) {
                mw[i].classList.add("hide");
            }
            else {
                mw[i].classList.remove("hide");
            }
        }
    }
    //Large screens
    else if(nextState !== "Bang Equal") {
        //Convert menu to sticky
        if(hm.classList) {
            if(!hm.classList.contains("sticky-menu")) 
                    hm.classList.add("sticky-menu");
        }
    }
    else {
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
    filter.innerHTML = '';

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

const menu = new Menu(menuClick);
//Need this on page load for popstate to work after first page click
history.replaceState("", "", "");
//capture when the back button pressed on browser
window.addEventListener('popstate', function(e) {menuClick('pop');});

localStorage.clear();

menuClick("Bang Equal");

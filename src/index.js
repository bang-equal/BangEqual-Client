'use strict';

import {ViewportService} from "./services/viewport-service.js";
import Menu from "./components/Menu/menu";
import Jumbotron from "./components/jumbotron/jumbotron";
import Topmargin from "./components/topmargin/topmargin";
import MultiView from "./components/multiview/multiview";
import SingleView from "./components/singleview/singleview";
import AdbarItem from "./components/adbar-item/adbar-item";
import Filter from "./components/filter-item/filter-item";
import CloseButton from "./sharedelements/closeButton";
import * as rest from './services/rest';
import * as homeservice from './services/home_service';

const topmargin = new Topmargin();
const viewportServ = new ViewportService();
const cs = parseInt(viewportServ.getType());
const sitecontent = document.getElementsByClassName('site-content')[0];
const main =  document.getElementsByClassName('main')[0];
const adbar =  document.getElementsByClassName('content-adbar')[0];
const menu =  document.getElementsByClassName('header-menu')[0];
const adbartitle =  document.getElementsByClassName('adbar-title')[0];
const jumbo =  document.getElementsByClassName('header-jumbotron')[0];
const contentclosebutton =  document.getElementsByClassName('closebutton')[0];
const filter =  document.getElementsByClassName('main-filter')[0];

let close;
let singlepostid = 0;
let multview;
let singleview;
let menuitem;
let adbaritem;
let filteritem;


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

        homeservice.findById(singlepostid).then(function(results) {

            singleview = new SingleView(results, type);
            main.appendChild(singleview.el);

            close = new CloseButton(showMult, type, "single-close-button", "");
            if(close.el.classList.contains("hide")) {
                close.el.classList.remove("hide");
                close.el.classList.add("show");
            }

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

let showMult = (id, type) => {

    main.innerHTML = '';
    contentclosebutton.innerHTML = '';

    //Limit amount of vertical space by adding multview class 
    if(sitecontent.classList) {
        if(!sitecontent.classList.contains("site-content-multiview")) {
            sitecontent.classList.add("site-content-multiview");
        }
    }

    //Display results saved in localStorage
    let ls;
    ls = localStorage.getItem(type + 'filtered');
    if(!ls) {
        ls = localStorage.getItem(type);
    }
    
    ls = JSON.parse(ls);
    if(ls.length > 0) {

        //Display first collection of results
        for (let ele of ls[0]) {
            //Create individual components representing each object in collection
            multview = new MultiView(ele, showSingle, 'article');

            //append new multiview component to parent element
            main.appendChild(multview.el);
        }
    }
    else {
        console.log('error in showmult');
    }
}

let menuClick = (menuitem) => {

    main.innerHTML = '';
    adbar.innerHTML = '';
    filter.innerHTML = '';

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

    let ls;

    switch(menuitem) {
        case "Blog":
            createFilter('article');
            //Display results saved in localStorage
            ls = localStorage.getItem('article');
            if(!ls) {
                homeservice.findByType('article', cs).then(function(results) {           
        
                    //Limit amount of vertical space by adding multview class 
                    if(sitecontent.classList) {
                        if(!sitecontent.classList.contains("site-content-multiview")) {
                            sitecontent.classList.add("site-content-multiview");
                        }
                    }

                    //Display first collection of results
                    for (let ele of results[0]) {
                        //Create individual components representing each object in collection
                        multview = new MultiView(ele, showSingle, 'article');

                        //append new multiview component to parent element
                        main.appendChild(multview.el);
                    }

                    // Persist results in local storage
                    localStorage.setItem('article', JSON.stringify(results));
                });
            }
            else {
                    ls = JSON.parse(ls);
                    if(ls.length > 0) {

                        //Display first collection of results
                        for (let ele of ls[0]) {
                            //Create individual components representing each object in collection
                            multview = new MultiView(ele, showSingle, 'article');

                            //append new multiview component to parent element
                            main.appendChild(multview.el);
                        }
                    }
            }
            break;  
        case "Code Revue":
            createFilter('design');
             //Display results saved in localStorage
            ls = localStorage.getItem('design');
            if(!ls) {
                homeservice.findByType('design', cs).then(function(results) {           
        
                    //Limit amount of vertical space by adding multview class 
                    if(sitecontent.classList) {
                        if(!sitecontent.classList.contains("site-content-multiview")) {
                            sitecontent.classList.add("site-content-multiview");
                        }
                    }

                    //Display first collection of results
                    for (let ele of results[0]) {
                        //Create individual components representing each object in collection
                        multview = new MultiView(ele, showSingle, 'design');

                        //append new multiview component to parent element
                        main.appendChild(multview.el);
                    }

                    // Persist results in local storage
                    localStorage.setItem('design', JSON.stringify(results));
                });
            }
            else {
                    ls = JSON.parse(ls);
                    if(ls.length > 0) {

                        //Display first collection of results
                        for (let ele of ls[0]) {
                            //Create individual components representing each object in collection
                            multview = new MultiView(ele, showSingle, 'design');

                            //append new multiview component to parent element
                            main.appendChild(multview.el);
                        }
                    }
            } 
            break;
        default:
            console.log('error in menuclick');
    }   
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

        //Limit amount of vertical space by adding multview class 
        if(sitecontent.classList) {
            if(!sitecontent.classList.contains("site-content-multiview")) {
                sitecontent.classList.add("site-content-multiview");
            }
        }

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

      //Limit amount of vertical space by adding multview class 
    if(sitecontent.classList) {
        if(!sitecontent.classList.contains("site-content-multiview")) {
            sitecontent.classList.add("site-content-multiview");
        }
    }

    //Remove selected css
    let filter_item_selected =  document.getElementById(filteritem);
    if(filter_item_selected && filter_item_selected.classList.contains("show")) {
        filter_item_selected.classList.remove("show");
        filter_item_selected.classList.add("hide");
    }

     //Display results saved in localStorage
    let ls = localStorage.getItem(type);
    ls = JSON.parse(ls);
    if(ls.length > 0) {

        //Display first collection of results
        for (let ele of ls[0]) {
            //Create individual components representing each object in collection
            multview = new MultiView(ele, showSingle, 'article');

            //append new multiview component to parent element
            main.appendChild(multview.el);
        }
    }
    else {
        console.log('error in showmult');
    }
}

let getHomeData = (filteritem, type) => {
    //Clear items in multview
    main.innerHTML = '';

    //Clear Filtered Local Storage
    localStorage.removeItem(type + "filtered");

      //Limit amount of vertical space by adding multview class 
    if(sitecontent.classList) {
        if(!sitecontent.classList.contains("site-content-multiview")) {
            sitecontent.classList.add("site-content-multiview");
        }
    }

    //Remove selected css
    let filter_item_selected =  document.getElementById(filteritem);
    if(filter_item_selected && filter_item_selected.classList.contains("show")) {
        filter_item_selected.classList.remove("show");
        filter_item_selected.classList.add("hide");
    }

     //Display results saved in localStorage
    let ls = localStorage.getItem(type);
    ls = JSON.parse(ls);
    if(ls.length > 0) {

        //Display first collection of results
        for (let ele of ls[0]) {
            //Create individual components representing each object in collection
            multview = new MultiView(ele, showSingle, 'article');

            //append new multiview component to parent element
            main.appendChild(multview.el);
        }
    }
    else {
        console.log('error in showmult');
    }
}

let createMenu = () => {
    let items = ["Blog", "Code Revue", "About"];
    for(let mi of items) {
        menuitem = new Menu(mi, menuClick);
        if( mi=== "Blog") {
            menuitem.el.classList.add("menu-wrapper-selected");
        }
        menu.appendChild(menuitem.el);
    }
}

let createFilter = (type) => {

     //Display results saved in localStorage
    let ls;
    ls = localStorage.getItem(type + 'topics');
    if(!ls) {  
        console.log('here');
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
        console.log('yo');
        ls = JSON.parse(ls);
        if(ls.length > 0) {

            for(let r of ls) {
                filteritem = new Filter(r, filterClick, cancelClick, type);
                filter.appendChild(filteritem.el);
            }
        }
    }
}

const jumbotron = new Jumbotron();

//Function that shows character in mouth of logo
//Will continue until page scroll down past menu
let timerId;
let mouthCharFunc = (trigger) => {
    
    if(trigger)
    {
        window.clearTimeout(timerId);
        timerId = setTimeout(function () {
            let chars = ["__", "0", "P", "----", "L", "V", "+"];
            let mouthchar =  document.getElementsByClassName('mouth')[0];
            mouthchar.textContent = chars[Math.floor(Math.random()*chars.length)];
            mouthCharFunc(true);
        }, 6000);
    }
    else {
        window.clearTimeout(timerId);
    }
};
mouthCharFunc(true);

localStorage.clear();
createMenu();
createFilter('article');

homeservice.findByType('article', cs).then(function(results) {           
    
    //Limit amount of vertical space by adding multview class 
    if(sitecontent.classList) {
        if(!sitecontent.classList.contains("site-content-multiview")) {
            sitecontent.classList.add("site-content-multiview");
        }
    }

    //Display first collection of results
    for (let ele of results[0]) {
        //Create individual components representing each object in collection
        multview = new MultiView(ele, showSingle, 'article');

        //append new multiview component to parent element
        main.appendChild(multview.el);
    }

    // Persist results in local storage
    localStorage.setItem('article', JSON.stringify(results));
});

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
                //Pause timeout function changing logo mouth
                mouthCharFunc(false);
            }
        }
        else if(menuOffset > windowScroll){
            if(menu.className === "header-menu sticky-header") {
                menu.className = "header-menu";
                //Resume timeout function changing logo mouth
                mouthCharFunc(true);
            }
        }
      
        //Ensures that close button on singleview always visible
        if(windowScroll >= closeOffset - 1 && closeOffset) {
            if(close && close.el.classList.contains("single-close-button")) {
                close.el.classList.add("sticky-button");
            }
        }
        else if(closeOffset && closeOffset + 1 > windowScroll) {
            if(close && close.el.classList.contains("sticky-button")) {
                close.el.classList.remove("sticky-button");
            }
        }

        ticking = false;
        });
    }
    ticking = true;

}
document.addEventListener("scroll", onScroll);

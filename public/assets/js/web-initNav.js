(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {

    'use strict';

    $(document).ready(function () {
        var navItem1 = '<span class="side-menu-search-container">'
            + '<a href="#side-menu-toggle" class="menu-toggle"><i id="unstick-icon" class="pull-left fa fa-navicon fa-2x"></i></a>'
            + '<div id="sidemenu-searchField"></div>'
            + '</span>';
        $("#side-menu").mmenu({
            //Options
            extensions: ["iconbar", "theme-is-light-blue", "border-none"]
            , searchfield: {
                add: true,
                addTo: "#sidemenu-searchField",
                placeholder: "Menu Search",
                showSubPanels: false
            }
            , navbar: {
                add: true,
                title: 'Menu'
            }
            //,offCanvas: false
            //,offCanvas: {
            //  position: "front",
            //  ,zposition: "next"
            //}
            //navbars: true
          //, counters: true
          , autoHeight: true
          , navbars: [{
              position: "top",
              content: [navItem1, 'prev', "breadcrumbs"],
              height: 2
          }]
        }, {
            //Configuration
            offCanvas: {
                menuWrapperSelector: "#content-wrapper-outer",
                pageNodetype: "div",
                pageSelector: "#content-wrapper-outer #content-wrapper-inner >"
            }
          , navbars: { breadcrumbSeparator: "&gt;" /*> separetor*/ }
        });
        var API = $("#side-menu").data("mmenu");
        //Add chevron 
        //$(".mm-breadcrumbs").prepend('<a class="mm-prev mm-btn" href="#mm-1"></a>')
        //API.open();
        $("a[href$='#side-menu-toggle'], button[href$='#side-menu-toggle']").click(function () {
            if ($("#side-menu").hasClass("mm-opened")) {
                //Close the menu
                API.close();
                //$('#content').removeClass("bg-overlay");
            } else {
                //Open the menu
                API.open();
                //$('#content').addClass("bg-overlay");
            }
        });
        $("nav#side-menu").on("mouseenter","", function () {
            API.open();
        });
        $("nav#side-menu").on("mouseleave", "", function () {
            API.close();
        });
    });

}());
},{}]},{},[1]);

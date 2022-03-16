// ==UserScript==
// @name         PeaceMaker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @run-at       document-end
// @author       You
// @include      https://*
// @icon         https://static.xx.fbcdn.net/rsrc.php/yb/r/hLRJ1GG_y0J.ico
// @grant        none
// ==/UserScript==

const hideSupport= ()=>{
    document.querySelector("a[href$='support-ukraine']").parentElement.style.display='none'
}

let isPeaceMaker= false

isPeaceMaker=!!document.querySelector("a[href$='support-ukraine']")

if(isPeaceMaker){
    console.log('Peace Maker, What a joke!')
    hideSupport()

    history.pushState = new Proxy(history.pushState, {
        apply: function (target, thisBinding, args) {
            setTimeout(hideSupport,10)
            return target.apply(thisBinding, args);
        },
    });
}


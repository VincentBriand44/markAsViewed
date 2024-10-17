
// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Mark as viewed on AdKami from Crunchyroll
// @author       Kanon
// @source       https://github.com/VincentBriand44/markAsViewed
// @downloadURL  https://raw.githubusercontent.com/VincentBriand44/markAsViewed/refs/heads/main/dist/markAsViewed.user.js
// @updateURL    https://raw.githubusercontent.com/VincentBriand44/markAsViewed/refs/heads/main/dist/markAsViewed.user.js
// @match        https://www.crunchyroll.com*
// @match        http*://adkami.com/anime*?kaddon*
// @match        http*://*.adkami.com/anime*?kaddon*
// @match        http*://adkami.com/video?search=*&kaddon=*
// @match        http*://*.adkami.com/video?search=*&kaddon=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=crunchyroll.com
// @grant        none
// ==/UserScript==

"use strict";(()=>{var mergeObjects=objects=>{let acc={};for(let curr of objects)Object.assign(acc,curr),acc.aggregateRating=acc.aggregateRating||curr.aggregateRating,acc.partOfSeason=acc.partOfSeason||curr.partOfSeason,acc.partOfSeries=acc.partOfSeries||curr.partOfSeries,acc.potentialAction=acc.potentialAction||curr.potentialAction,acc.thumbnailUrl=Array.isArray(acc.thumbnailUrl)?[...acc.thumbnailUrl,...Array.isArray(curr.thumbnailUrl)?curr.thumbnailUrl:[curr.thumbnailUrl]]:[acc.thumbnailUrl,...Array.isArray(curr.thumbnailUrl)?curr.thumbnailUrl:[curr.thumbnailUrl]];return acc};var addButton=()=>{let titleContainer=document.querySelector(".current-media-parent-ref");if(!titleContainer)return;let buttonA=document.createElement("a");buttonA.id="kaddon-button",buttonA.textContent="Marquer comme vu",buttonA.style.cursor="pointer",titleContainer.append(buttonA),buttonA.addEventListener("click",()=>handleClick(0));let buttonB=document.createElement("a");buttonB.id="kaddon-button",buttonB.textContent="(-1)",buttonB.style.cursor="pointer",buttonB.style.marginLeft=".25rem",titleContainer.append(buttonB),buttonB.addEventListener("click",()=>handleClick(-1))},handleClick=step=>{let obj=document.querySelectorAll('script[type="application/ld+json"]'),parsed=Array.from(obj).map(script=>{try{return JSON.parse(script.innerText)}catch(error){return console.error("Erreur lors du parsing JSON:",error),null}}).filter(item=>item!==null),merged=mergeObjects(parsed),title=merged.partOfSeries?.name,episode=merged.episodeNumber,season=merged.partOfSeason?.seasonNumber;console.log("\u{1F680} ~ handleClick ~ merged:",merged),!(!title||!season)&&window.open(`https://www.adkami.com/video?search=${title}${episode?`&kaddon=${episode+step}/1/2/${season}`:""}`)},mutationCallback=mutationsList=>{for(let _ of mutationsList){if(!document.querySelector(".show-title-link")||document.querySelector("#kaddon-button"))return;addButton()}},observer=new MutationObserver(mutationCallback),config={childList:!0,subtree:!0},goToEpisode=()=>{let list=document.querySelectorAll(".video-item-list");if(list.length===1){let url=list[0].querySelector(".top a"),args=location.search.split("kaddon=")[1];window.location.href=`${url?.href}/${args}/?kaddon`;return}list.forEach(item=>{let anchor=item.querySelector(".top a"),args=location.search.split("kaddon=")[1];anchor?.href&&(anchor.href=`${anchor.href}/${args}/?kaddon`)})};(()=>{switch(location.host){case"www.crunchyroll.com":{observer.observe(document.body,config);break}case"www.adkami.com":{if(location.pathname==="/video"){goToEpisode();return}let watchlist=document.querySelector("#watchlist-actuel")??document.querySelector("#watchlist_end");if(!watchlist)return;watchlist.click(),setTimeout(()=>window.close(),1e3)}}})();})();

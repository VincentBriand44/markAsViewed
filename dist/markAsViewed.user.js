
// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Mark as viewed on AdKami from Crunchyroll
// @author       Kanon
// @source       https://github.com/VincentBriand44/markAsViewed
// @downloadURL  https://raw.githubusercontent.com/VincentBriand44/markAsViewed/refs/heads/main/dist/markAsViewed.user.js
// @updateURL    https://raw.githubusercontent.com/VincentBriand44/markAsViewed/refs/heads/main/dist/markAsViewed.user.js
// @match        http*://*.crunchyroll.com/*
// @match        http*://*.animationdigitalnetwork.com/video/*
// @match        http*://*.netflix.com/watch/*
// @match        http*://*.adkami.com/anime*?kaddon*
// @match        http*://*.adkami.com/video?search=*&kaddon=*
// @match        http*://anime-sama.fr/catalogue/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=crunchyroll.com
// @grant        none
// ==/UserScript==

"use strict";(()=>{var buttonInject=(position,handleClick2)=>{let element=document.querySelector(position);if(!element)throw new Error("button inject failed");let container=document.createElement("div");container.innerHTML=`
    <div id="kaddon-div">
      <a id="kaddon-button">Marquer comme vu</a>
      <a id="kaddon-button-">(-1)</a>
    </div>

    <style>
      #kaddon-div {
        display: flex;
        gap: .25rem;
        cursor: pointer;
        padding-left: .5rem;
        font-size: 16px;
      }
      #kaddon-div a:hover {
        color: blue;
      }
    </style>
  `,element.after(container),document.querySelector("#kaddon-button")?.addEventListener("click",()=>handleClick2(0)),document.querySelector("#kaddon-button-")?.addEventListener("click",()=>handleClick2(-1))},button_default=buttonInject;var goToEpisode=()=>{let list=document.querySelectorAll(".video-item-list");if(list.length===1){let url=list[0].querySelector(".top a"),args=location.search.split("kaddon=")[1];window.location.href=`${url?.href}/${args}/?kaddon`;return}list.forEach(item=>{let anchor=item.querySelector(".top a"),args=location.search.split("kaddon=")[1];anchor?.href&&(anchor.href=`${anchor.href}/${args}/?kaddon`)})},goToEpisode_default=goToEpisode;var mergeObjects=objects=>{let acc={};for(let curr of objects)Object.assign(acc,curr),acc.aggregateRating=acc.aggregateRating||curr.aggregateRating,acc.partOfSeason=acc.partOfSeason||curr.partOfSeason,acc.partOfSeries=acc.partOfSeries||curr.partOfSeries,acc.potentialAction=acc.potentialAction||curr.potentialAction,acc.thumbnailUrl=Array.isArray(acc.thumbnailUrl)?[...acc.thumbnailUrl,...Array.isArray(curr.thumbnailUrl)?curr.thumbnailUrl:[curr.thumbnailUrl]]:[acc.thumbnailUrl,...Array.isArray(curr.thumbnailUrl)?curr.thumbnailUrl:[curr.thumbnailUrl]];return acc};var integration=()=>{let obj=document.querySelectorAll('script[type="application/ld+json"]'),parsed=Array.from(obj).map(script=>{try{return JSON.parse(script.innerText)}catch(error){return console.error("Erreur lors du parsing JSON:",error),null}}).filter(item=>item!==null),merged=mergeObjects(parsed),title=merged.partOfSeries?.name,episode=Number(merged.episodeNumber??1),season=merged.partOfSeason?.seasonNumber??1;if(!title||!season)throw new Error("data not found");return{episode,season,title}},adn_default={integration,position:"h1",mutation:"h1 > span"};var integration2=()=>{let episodeElement=document.querySelector("#selectEpisodes"),seasonElement=document.querySelector("#avOeuvre"),title=document.querySelector("#titreOeuvre")?.textContent,episode=Number(episodeElement?.value?.split(" ")[1]),season=Number.parseInt(seasonElement?.textContent?.split(" ")[1]??"");if(!title||!season)throw new Error("data not found");return{episode,season,title}},animesama_default={integration:integration2,position:"#printLastEpisode",mutation:"#titreOeuvre"};var integration3=()=>{let obj=document.querySelectorAll('script[type="application/ld+json"]'),parsed=Array.from(obj).map(script=>{try{return JSON.parse(script.innerText)}catch(error){return console.error("Erreur lors du parsing JSON:",error),null}}).filter(item=>item!==null),merged=mergeObjects(parsed),title=merged.partOfSeries?.name,episode=Number(merged.episodeNumber)??0,season=merged.partOfSeason?.seasonNumber;if(!title||!season)throw new Error("data not found");return{episode,season,title}},crunchyroll_default={integration:integration3,position:".current-media-parent-ref",mutation:".show-title-link"};var integration4=()=>{let titleElement=document.querySelector('div[data-uia="video-title"]'),episodeElement=Number(titleElement?.querySelectorAll("span")[0]?.textContent?.split("E")[0]),title=titleElement?.querySelector("h4")?.textContent,episode=episodeElement??1,season=Number(titleElement?.querySelector("h4")?.textContent??1);if(!title||!season)throw new Error("data not found");return{episode,season,title}},netflix_default={integration:integration4,position:'div[data-uia="video-title"]',mutation:'div[data-uia="video-title"]'};var hostIntegration=host2=>{switch(console.log("\u{1F680} ~ host:",host2),host2){case"www.adkami.com":return;case"www.crunchyroll.com":return crunchyroll_default;case"animationdigitalnetwork.com":return adn_default;case"www.netflix.com":return netflix_default;case"anime-sama.fr":return animesama_default}throw new Error("invalid website")},integrations_default=hostIntegration;var{host}=location,website=integrations_default(host),handleClick=step=>{if(!website)return;let{episode,season,title}=website.integration();window.open(`https://www.adkami.com/video?search=${title}${episode?`&kaddon=${episode+step}/1/2/${season}`:""}`)},mutationCallback=mutationsList=>{if(!website)return;let mutationElement=document.querySelector(website.mutation);for(let _ of mutationsList){if(!mutationElement||document.querySelector("#kaddon-button")||!website?.position)return;button_default(website?.position,handleClick)}},observer=new MutationObserver(mutationCallback),config={childList:!0,subtree:!0};(()=>{if(host==="www.adkami.com"){if(location.pathname==="/video"){goToEpisode_default();return}let watchlist=document.querySelector("#watchlist-actuel")??document.querySelector("#watchlist_end");if(!watchlist)return;watchlist.click(),setTimeout(()=>window.close(),1e3);return}observer.observe(document.body,config)})();})();

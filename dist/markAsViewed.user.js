
// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      1.4.0
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

"use strict";(()=>{var markAsView_icon_check_1_default='<?xml version="1.0" encoding="UTF-8"?><svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1011 998.52"><path d="M409.4,419.23l-150.66-3.44c-6.28-.14-11.34-5.22-11.46-11.5l-.89-46.39c-.13-6.56,5.16-11.95,11.73-11.95h151.54c6.48,0,11.73,5.25,11.73,11.73v49.83c0,6.58-5.42,11.88-12,11.73Z" fill="#eaeaea" stroke="#1d1d1b" stroke-miterlimit="10"/><path d="M506.43,477.03l79.84-.24c4.96-.02,8.98-4.04,8.98-9V160.08c0-4.97-4.03-9-9-9h-87.84c-2.03,0-4.01.69-5.6,1.95l-103.79,82.42c-3.41,2.71-4.39,7.47-2.33,11.31l29.53,54.93c2.62,4.87,8.96,6.25,13.37,2.91,12.83-9.72,37.33-28.67,53.02-40.84,5.91-4.58,14.51-.38,14.52,7.1l.29,197.17c0,4.98,4.05,9,9.03,8.99Z" fill="#eaeaea" stroke="#1d1d1b" stroke-miterlimit="10"/><path d="M1003.91,357.4L399.45,990.65c-10,10.48-26.96,9.67-35.93-1.71l-229.93-291.83c-7.47-9.48-6.67-23.04,1.87-31.57l86.34-86.34c10-10,26.45-9.13,35.34,1.86l136.58,168.71c8.94,11.05,25.51,11.85,35.48,1.72L969.71,201.97c14.94-15.19,40.79-4.61,40.79,16.7v122.29c0,6.12-2.36,12.01-6.59,16.44Z" fill="#eaeaea" stroke="#1d1d1b" stroke-miterlimit="10"/><path d="M289.45,980.5H20.23c-10.9,0-19.73-8.83-19.73-19.73V20.23C.5,9.33,9.33.5,20.23.5h940.54c10.9,0,19.73,8.83,19.73,19.73v132.1c0,5.23-2.08,10.25-5.78,13.95l-60.54,60.54c-12.43,12.43-33.68,3.63-33.68-13.95v-92.65c0-10.89-8.82-19.72-19.72-19.72-236.26,0-504.31,0-740.57,0-10.89,0-19.72,8.82-19.72,19.72,0,108.52,0,632.03,0,740.56,0,10.9,8.83,19.72,19.73,19.72,41.69,0,78.18,0,120.78,0,6,0,11.67,2.73,15.41,7.41l48.43,60.54c10.33,12.92,1.14,32.05-15.41,32.05Z" fill="#eaeaea" stroke="#1d1d1b" stroke-miterlimit="10"/><path d="M538.15,880.5c100.95,0,222.93,0,325.16,0,9.5,0,17.19-7.7,17.19-17.2v-336.16c0-4.28,1.59-8.4,4.47-11.57l65.61-72.17c10.57-11.63,29.92-4.15,29.92,11.57v508.33c0,9.5-7.7,17.2-17.2,17.2h-484.19c-14.89,0-22.74-17.63-12.78-28.7l59.05-65.61c3.26-3.62,7.9-5.69,12.78-5.69Z" fill="#eaeaea" stroke="#1d1d1b" stroke-miterlimit="10"/></svg>';var markAsView_icon_check_default='<?xml version="1.0" encoding="UTF-8"?><svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1011 998.52"><path d="M1003.91,357.4L399.45,990.65c-10,10.48-26.96,9.67-35.93-1.71l-229.93-291.83c-7.47-9.48-6.67-23.04,1.87-31.57l86.34-86.34c10-10,26.45-9.13,35.34,1.86l136.58,168.71c8.94,11.05,25.51,11.85,35.48,1.72L969.71,201.97c14.94-15.19,40.79-4.61,40.79,16.7v122.29c0,6.12-2.36,12.01-6.59,16.44Z" fill="#eaeaea" stroke="#1d1d1b" stroke-miterlimit="10"/><path d="M289.45,980.5H20.23c-10.9,0-19.73-8.83-19.73-19.73V20.23C.5,9.33,9.33.5,20.23.5h940.54c10.9,0,19.73,8.83,19.73,19.73v132.1c0,5.23-2.08,10.25-5.78,13.95l-60.54,60.54c-12.43,12.43-33.68,3.63-33.68-13.95v-92.65c0-10.89-8.82-19.72-19.72-19.72-236.26,0-504.31,0-740.57,0-10.89,0-19.72,8.82-19.72,19.72,0,108.52,0,632.03,0,740.56,0,10.9,8.83,19.72,19.73,19.72,41.69,0,78.18,0,120.78,0,6,0,11.67,2.73,15.41,7.41l48.43,60.54c10.33,12.92,1.14,32.05-15.41,32.05Z" fill="#eaeaea" stroke="#1d1d1b" stroke-miterlimit="10"/><path d="M538.15,880.5c100.95,0,222.93,0,325.16,0,9.5,0,17.19-7.7,17.19-17.2v-336.16c0-4.28,1.59-8.4,4.47-11.57l65.61-72.17c10.57-11.63,29.92-4.15,29.92,11.57v508.33c0,9.5-7.7,17.2-17.2,17.2h-484.19c-14.89,0-22.74-17.63-12.78-28.7l59.05-65.61c3.26-3.62,7.9-5.69,12.78-5.69Z" fill="#eaeaea" stroke="#1d1d1b" stroke-miterlimit="10"/></svg>';var episodeSaved,buttonCheck=({integration:integration5})=>{let{episode}=integration5();return episodeSaved===episode?!0:(episodeSaved=episode,!1)},buttonInject=({position,integration:integration5})=>{let{episode,season,title}=integration5(),element=document.querySelector(position);if(!element)throw new Error("Button injection failed");let getEpisodeUrl=ep=>{let url=`https://www.adkami.com/video?search=${encodeURIComponent(title)}`;return season!==null&&ep!==null&&ep>0&&(url+=`&kaddon=${ep}/1/2/${season}`),url},buttons=[{id:"kaddon-button",icon:markAsView_icon_check_default,step:0},{id:"kaddon-button-minus",icon:markAsView_icon_check_1_default,step:-1}],container=document.createElement("div");container.style.display="flex",container.style.gap=".25rem",container.style.paddingLeft=".5rem";for(let button of buttons){let buttonElement=document.createElement("a");buttonElement.id=button.id,buttonElement.href=getEpisodeUrl(episode+button.step),buttonElement.target="_blank",buttonElement.style.cursor="pointer",buttonElement.style.height="1rem",buttonElement.style.width="1rem",buttonElement.innerHTML=button.icon,container.appendChild(buttonElement)}element.after(container)};var goToEpisode=()=>{let list=document.querySelectorAll(".video-item-list"),args=location.search.split("kaddon=")[1];if(list.length>1)for(let item of Array.from(list)){let anchor=item.querySelector(".top a");anchor?.href&&(anchor.href=`${anchor.href}/${args}/?kaddon`)}else{let anchor=list[0].querySelector(".top a");anchor?.href&&(window.location.href=`${anchor.href}/${args}/?kaddon`);return}},goToEpisode_default=goToEpisode;var mergeObjects=objects=>{let acc={};for(let curr of objects)Object.assign(acc,curr),acc.aggregateRating=acc.aggregateRating||curr.aggregateRating,acc.partOfSeason=acc.partOfSeason||curr.partOfSeason,acc.partOfSeries=acc.partOfSeries||curr.partOfSeries,acc.potentialAction=acc.potentialAction||curr.potentialAction,acc.thumbnailUrl=Array.isArray(acc.thumbnailUrl)?[...acc.thumbnailUrl,...Array.isArray(curr.thumbnailUrl)?curr.thumbnailUrl:[curr.thumbnailUrl]]:[acc.thumbnailUrl,...Array.isArray(curr.thumbnailUrl)?curr.thumbnailUrl:[curr.thumbnailUrl]];return acc};var integration=()=>{let obj=document.querySelectorAll('script[type="application/ld+json"]'),parsed=Array.from(obj).map(script=>{try{return JSON.parse(script.innerText)}catch(error){return console.error("Erreur lors du parsing JSON:",error),null}}).filter(item=>item!==null),merged=mergeObjects(parsed),title=merged.partOfSeries?.name,episode=Number(merged.episodeNumber??1),season=merged.partOfSeason?.seasonNumber??1;if(!title||!season)throw new Error("data not found");return{episode,season,title}},adn_default={integration,position:"h1",mutation:"h1 > span"};var integration2=()=>{let episodeElement=document.querySelector("#selectEpisodes"),seasonElement=document.querySelector("#avOeuvre"),title=document.querySelector("#titreOeuvre")?.textContent,episode=Number(episodeElement?.value?.split(" ")[1]),season=Number.parseInt(seasonElement?.textContent?.split(" ")[1]??"");if(!title||!season)throw new Error("data not found");return{episode,season,title}},animesama_default={integration:integration2,position:"#printLastEpisode",mutation:"#selectEpisodes"};var integration3=()=>{let obj=document.querySelectorAll('script[type="application/ld+json"]'),parsed=Array.from(obj).map(script=>{try{return JSON.parse(script.innerText)}catch(error){return console.error("Erreur lors du parsing JSON:",error),null}}).filter(item=>item!==null),merged=mergeObjects(parsed),title=merged.partOfSeries?.name,episode=Number(merged.episodeNumber)??0,season=merged.partOfSeason?.seasonNumber;if(!title||!season)throw new Error("data not found");return{episode,season,title}},crunchyroll_default={integration:integration3,position:".current-media-parent-ref",mutation:".show-title-link"};var integration4=()=>{let titleElement=document.querySelector('div[data-uia="video-title"]'),episodeElement=Number(titleElement?.querySelectorAll("span")[0]?.textContent?.split("E")[1]),seasonElement=document.querySelector('div[data-uia="pause-ad-title-display-info-container"] > div > span')?.innerHTML.split("&nbsp;:&nbsp;")[0],title=titleElement?.querySelector("h4")?.textContent,episode=episodeElement??1,season=Number(seasonElement?.startsWith("S")?seasonElement.split("S")[1]:1);if(!title||!season)throw new Error("data not found");return{episode,season,title}},netflix_default={integration:integration4,position:'div[data-uia="video-title"]',mutation:'div[data-uia="video-title"]'};var hostIntegration=host=>{switch(host){case"www.adkami.com":return;case"www.crunchyroll.com":return crunchyroll_default;case"animationdigitalnetwork.com":return adn_default;case"www.netflix.com":return netflix_default;case"anime-sama.fr":return animesama_default}throw new Error("invalid website")},integrations_default=hostIntegration;var website=integrations_default(location.host),mutationCallback=()=>{!website||!document.querySelector(website.mutation)||!website.position||buttonCheck(website)||(document.querySelector("#kaddon-div")?.remove(),buttonInject(website))},observer=new MutationObserver(mutationCallback),config={childList:!0,subtree:!0,attributes:!0};(()=>{if(location.host==="www.adkami.com"){if(location.pathname==="/video"){goToEpisode_default();return}let watchlist=document.querySelector("#watchlist-actuel, #watchlist_end");watchlist&&(watchlist.click(),setTimeout(()=>window.close(),1e3));return}observer.observe(document.body,config)})();})();

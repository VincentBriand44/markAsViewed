
// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      1.2.1
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

"use strict";(()=>{var episodeSaved,buttonCheck=({integration:integration5})=>{let{episode}=integration5();return episodeSaved===episode?!0:(episodeSaved=episode,!1)},buttonInject=({position,integration:integration5})=>{let{episode,season,title}=integration5(),element=document.querySelector(position);if(!element)throw new Error("Button injection failed");let getEpisodeUrl=ep=>{let url=`https://www.adkami.com/video?search=${encodeURIComponent(title)}`;return season!==null&&ep!==null&&ep>0&&(url+=`&kaddon=${ep}/1/2/${season}`),url},episodeUrl=getEpisodeUrl(episode),previousEpisodeUrl=getEpisodeUrl(episode-1),container=document.createElement("div");container.innerHTML=`
		<div id="kaddon-div">
			<a id="kaddon-button" href="${episodeUrl}" target="_blank">Marquer comme vu</a>
			<a id="kaddon-button-minus" href="${previousEpisodeUrl}" target="_blank">(-1)</a>
		</div>
	`;let style=document.createElement("style");style.textContent=`
		#kaddon-div {
			display: flex;
			gap: .25rem;
			padding-left: .5rem;
			font-size: 16px;
		}
		#kaddon-div a {
			cursor: pointer;
		}
		#kaddon-div a:hover {
			color: blue;
		}
	`,document.head.appendChild(style),element.after(container)};var goToEpisode=()=>{let list=document.querySelectorAll(".video-item-list"),args=location.search.split("kaddon=")[1];if(list.length!==1)return;let anchor=list[0].querySelector(".top a");anchor?.href&&(window.location.href=`${anchor.href}/${args}/?kaddon`)},goToEpisode_default=goToEpisode;var mergeObjects=objects=>{let acc={};for(let curr of objects)Object.assign(acc,curr),acc.aggregateRating=acc.aggregateRating||curr.aggregateRating,acc.partOfSeason=acc.partOfSeason||curr.partOfSeason,acc.partOfSeries=acc.partOfSeries||curr.partOfSeries,acc.potentialAction=acc.potentialAction||curr.potentialAction,acc.thumbnailUrl=Array.isArray(acc.thumbnailUrl)?[...acc.thumbnailUrl,...Array.isArray(curr.thumbnailUrl)?curr.thumbnailUrl:[curr.thumbnailUrl]]:[acc.thumbnailUrl,...Array.isArray(curr.thumbnailUrl)?curr.thumbnailUrl:[curr.thumbnailUrl]];return acc};var integration=()=>{let obj=document.querySelectorAll('script[type="application/ld+json"]'),parsed=Array.from(obj).map(script=>{try{return JSON.parse(script.innerText)}catch(error){return console.error("Erreur lors du parsing JSON:",error),null}}).filter(item=>item!==null),merged=mergeObjects(parsed),title=merged.partOfSeries?.name,episode=Number(merged.episodeNumber??1),season=merged.partOfSeason?.seasonNumber??1;if(!title||!season)throw new Error("data not found");return{episode,season,title}},adn_default={integration,position:"h1",mutation:"h1 > span"};var integration2=()=>{let episodeElement=document.querySelector("#selectEpisodes"),seasonElement=document.querySelector("#avOeuvre"),title=document.querySelector("#titreOeuvre")?.textContent,episode=Number(episodeElement?.value?.split(" ")[1]),season=Number.parseInt(seasonElement?.textContent?.split(" ")[1]??"");if(!title||!season)throw new Error("data not found");return{episode,season,title}},animesama_default={integration:integration2,position:"#printLastEpisode",mutation:"#selectEpisodes"};var integration3=()=>{let obj=document.querySelectorAll('script[type="application/ld+json"]'),parsed=Array.from(obj).map(script=>{try{return JSON.parse(script.innerText)}catch(error){return console.error("Erreur lors du parsing JSON:",error),null}}).filter(item=>item!==null),merged=mergeObjects(parsed),title=merged.partOfSeries?.name,episode=Number(merged.episodeNumber)??0,season=merged.partOfSeason?.seasonNumber;if(!title||!season)throw new Error("data not found");return{episode,season,title}},crunchyroll_default={integration:integration3,position:".current-media-parent-ref",mutation:".show-title-link"};var integration4=()=>{let titleElement=document.querySelector('div[data-uia="video-title"]'),episodeElement=Number(titleElement?.querySelectorAll("span")[0]?.textContent?.split("E")[1]),seasonElement=document.querySelector('div[data-uia="pause-ad-title-display-info-container"] > div > span')?.innerHTML.split("&nbsp;:&nbsp;")[0],title=titleElement?.querySelector("h4")?.textContent,episode=episodeElement??1,season=Number(seasonElement?.startsWith("S")?seasonElement.split("S")[1]:1);if(!title||!season)throw new Error("data not found");return{episode,season,title}},netflix_default={integration:integration4,position:'div[data-uia="video-title"]',mutation:'div[data-uia="video-title"]'};var hostIntegration=host=>{switch(host){case"www.adkami.com":return;case"www.crunchyroll.com":return crunchyroll_default;case"animationdigitalnetwork.com":return adn_default;case"www.netflix.com":return netflix_default;case"anime-sama.fr":return animesama_default}throw new Error("invalid website")},integrations_default=hostIntegration;var website=integrations_default(location.host),mutationCallback=()=>{!website||!document.querySelector(website.mutation)||!website.position||buttonCheck(website)||(document.querySelector("div#kaddon-div")?.remove(),buttonInject(website))},observer=new MutationObserver(mutationCallback),config={childList:!0,subtree:!0,attributes:!0};(()=>{if(location.host==="www.adkami.com"){if(location.pathname==="/video"){goToEpisode_default();return}let watchlist=document.querySelector("#watchlist-actuel, #watchlist_end");watchlist&&(watchlist.click(),setTimeout(()=>window.close(),1e3));return}observer.observe(document.body,config)})();})();

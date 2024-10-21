
// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      1.1.2
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

"use strict";
(() => {
  // src/lib/button.ts
  var buttonInject = (position, handleClick2) => {
    const element = document.querySelector(position);
    if (!element) throw new Error("button inject failed");
    const container = document.createElement("div");
    container.innerHTML = `
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
  `;
    element.after(container);
    const buttonA = document.querySelector("#kaddon-button");
    buttonA?.addEventListener("click", () => handleClick2(0));
    const buttonB = document.querySelector("#kaddon-button-");
    buttonB?.addEventListener("click", () => handleClick2(-1));
  };
  var button_default = buttonInject;

  // src/lib/goToEpisode.ts
  var goToEpisode = () => {
    const list = document.querySelectorAll(".video-item-list");
    if (list.length === 1) {
      const url = list[0].querySelector(".top a");
      const args = location.search.split("kaddon=")[1];
      window.location.href = `${url?.href}/${args}/?kaddon`;
      return;
    }
    list.forEach((item) => {
      const anchor = item.querySelector(".top a");
      const args = location.search.split("kaddon=")[1];
      if (!anchor?.href) return;
      anchor.href = `${anchor.href}/${args}/?kaddon`;
    });
  };
  var goToEpisode_default = goToEpisode;

  // src/lib/utils.ts
  var mergeObjects = (objects) => {
    const acc = {};
    for (const curr of objects) {
      Object.assign(acc, curr);
      acc.aggregateRating = acc.aggregateRating || curr.aggregateRating;
      acc.partOfSeason = acc.partOfSeason || curr.partOfSeason;
      acc.partOfSeries = acc.partOfSeries || curr.partOfSeries;
      acc.potentialAction = acc.potentialAction || curr.potentialAction;
      acc.thumbnailUrl = Array.isArray(acc.thumbnailUrl) ? [
        ...acc.thumbnailUrl,
        ...Array.isArray(curr.thumbnailUrl) ? curr.thumbnailUrl : [curr.thumbnailUrl]
      ] : [
        acc.thumbnailUrl,
        ...Array.isArray(curr.thumbnailUrl) ? curr.thumbnailUrl : [curr.thumbnailUrl]
      ];
    }
    return acc;
  };

  // src/lib/integrations/adn.ts
  var integration = () => {
    const obj = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    const parsed = Array.from(obj).map((script) => {
      try {
        return JSON.parse(script.innerText);
      } catch (error) {
        console.error("Erreur lors du parsing JSON:", error);
        return null;
      }
    }).filter((item) => item !== null);
    const merged = mergeObjects(parsed);
    const title = merged.partOfSeries?.name;
    const episode = Number(merged.episodeNumber ?? 1);
    const season = merged.partOfSeason?.seasonNumber ?? 1;
    if (!title || !season) throw new Error("data not found");
    return {
      episode,
      season,
      title
    };
  };
  var adn_default = {
    integration,
    position: "h1",
    mutation: "h1 > span"
  };

  // src/lib/integrations/animesama.ts
  var integration2 = () => {
    const episodeElement = document.querySelector("#selectEpisodes");
    const seasonElement = document.querySelector("#avOeuvre");
    const title = document.querySelector("#titreOeuvre")?.textContent;
    const episode = Number(episodeElement?.value?.split(" ")[1]);
    const season = Number.parseInt(
      seasonElement?.textContent?.split(" ")[1] ?? ""
    );
    if (!title || !season) throw new Error("data not found");
    return {
      episode,
      season,
      title
    };
  };
  var animesama_default = {
    integration: integration2,
    position: "#printLastEpisode",
    mutation: "#titreOeuvre"
  };

  // src/lib/integrations/crunchyroll.ts
  var integration3 = () => {
    const obj = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    const parsed = Array.from(obj).map((script) => {
      try {
        return JSON.parse(script.innerText);
      } catch (error) {
        console.error("Erreur lors du parsing JSON:", error);
        return null;
      }
    }).filter((item) => item !== null);
    const merged = mergeObjects(parsed);
    const title = merged.partOfSeries?.name;
    const episode = Number(merged.episodeNumber) ?? 0;
    const season = merged.partOfSeason?.seasonNumber;
    if (!title || !season) throw new Error("data not found");
    return {
      episode,
      season,
      title
    };
  };
  var crunchyroll_default = {
    integration: integration3,
    position: ".current-media-parent-ref",
    mutation: ".show-title-link"
  };

  // src/lib/integrations/netflix.ts
  var integration4 = () => {
    const titleElement = document.querySelector(
      'div[data-uia="video-title"]'
    );
    const episodeElement = Number(
      titleElement?.querySelectorAll("span")[0]?.textContent?.split("E")[0]
    );
    const title = titleElement?.querySelector("h4")?.textContent;
    const episode = episodeElement ?? 1;
    const season = Number(titleElement?.querySelector("h4")?.textContent ?? 1);
    if (!title || !season) throw new Error("data not found");
    return {
      episode,
      season,
      title
    };
  };
  var netflix_default = {
    integration: integration4,
    position: 'div[data-uia="video-title"]',
    mutation: 'div[data-uia="video-title"]'
  };

  // src/lib/integrations/index.ts
  var hostIntegration = (host2) => {
    console.log("\u{1F680} ~ host:", host2);
    switch (host2) {
      case "www.adkami.com": {
        return void 0;
      }
      case "www.crunchyroll.com": {
        return crunchyroll_default;
      }
      case "animationdigitalnetwork.com": {
        return adn_default;
      }
      case "www.netflix.com": {
        return netflix_default;
      }
      case "anime-sama.fr": {
        return animesama_default;
      }
    }
    throw new Error("invalid website");
  };
  var integrations_default = hostIntegration;

  // src/index.ts
  var { host } = location;
  var website = integrations_default(host);
  var handleClick = (step) => {
    if (!website) return;
    const { episode, season, title } = website.integration();
    window.open(
      `https://www.adkami.com/video?search=${title}${episode ? `&kaddon=${episode + step}/1/2/${season}` : ""}`
    );
  };
  var mutationCallback = (mutationsList) => {
    if (!website) return;
    const mutationElement = document.querySelector(website.mutation);
    for (const _ of mutationsList) {
      if (!mutationElement) return;
      const button = document.querySelector("#kaddon-button");
      if (button || !website?.position) return;
      button_default(website?.position, handleClick);
    }
  };
  var observer = new MutationObserver(mutationCallback);
  var config = { childList: true, subtree: true };
  (() => {
    if (host === "www.adkami.com") {
      if (location.pathname === "/video") {
        goToEpisode_default();
        return;
      }
      const watchlist = document.querySelector("#watchlist-actuel") ?? document.querySelector("#watchlist_end");
      if (!watchlist) return;
      watchlist.click();
      setTimeout(() => window.close(), 1e3);
      return;
    }
    observer.observe(document.body, config);
  })();
})();

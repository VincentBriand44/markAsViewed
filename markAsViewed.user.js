// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      v1.0.3
// @description  Mark as viewed on AdKami from Crunchyroll
// @author       Kanon
// @match        https://www.crunchyroll.com/*
// @match        https://www.adkami.com/video?search=*&kaddon=*
// @match        https://www.adkami.com/anime*?kaddon*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=crunchyroll.com
// @grant        none
// ==/UserScript==
const addButton = () => {
    const titleContainer = document.querySelector(".current-media-parent-ref");
    if (!titleContainer)
        return;
    const button = document.createElement("a");
    button.id = "kaddon-button";
    button.textContent = "Marquer comme vu";
    button.style.cursor = "pointer";
    titleContainer.append(button);
    button.addEventListener("click", () => handleClick());
};
const handleClick = () => {
    const obj = document.querySelectorAll('script[type="application/ld+json"]');
    if (obj.length < 2)
        return;
    let parsed = null;
    Array.from(obj).some((item) => {
        try {
            const itemParse = JSON.parse(item.innerText);
            if (itemParse.partOfSeries) {
                parsed = itemParse;
                return true; // Arrête la boucle si nous avons trouvé un élément valide
            }
        }
        catch (error) {
            console.error("Erreur lors de l'analyse JSON:", error);
        }
        return false;
    });
    if (parsed === null)
        return;
    const title = parsed.partOfSeries.name;
    const episode = parsed.episodeNumber;
    const season = parsed.partOfSeason.seasonNumber;
    if (!title || !episode || !season)
        return;
    window.open(`https://www.adkami.com/video?search=${title}&kaddon=${episode}/1/2/${season}`);
};
const mutationCallback = (mutationsList) => {
    mutationsList.forEach(() => {
        if (!document.querySelector(".show-title-link"))
            return;
        const button = document.querySelector("#kaddon-button");
        if (button)
            return;
        addButton();
    });
};
const observer = new MutationObserver(mutationCallback);
const config = { childList: true, subtree: true };
const goToEpisode = () => {
    const list = document.querySelectorAll(".video-item-list");
    if (list.length !== 1)
        return;
    const url = list[0].querySelector(".top a");
    const args = location.search.split("kaddon=")[1];
    window.location.href = `${url?.href}/${args}/?kaddon`;
};
(() => {
    switch (location.host) {
        case "www.crunchyroll.com": {
            observer.observe(document.body, config);
            break;
        }
        case "www.adkami.com": {
            if (location.pathname === "/video") {
                goToEpisode();
                return;
            }
            const watchlist = document.querySelector("#watchlist-actuel") ??
                document.querySelector("#watchlist_end");
            if (!watchlist)
                return;
            watchlist.click();
            setTimeout(() => window.close(), 1000);
        }
    }
})();
export { };

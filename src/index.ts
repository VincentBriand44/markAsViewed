// ==UserScript==
// @name         Mark as viewed
// @namespace    http://tampermonkey.net/
// @version      v1.0.4
// @description  Mark as viewed on AdKami from Crunchyroll
// @author       Kanon
// @match        https://www.crunchyroll.com/*
// @match        https://www.adkami.com/video?search=*&kaddon=*
// @match        https://www.adkami.com/anime*?kaddon*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=crunchyroll.com
// @grant        none
// ==/UserScript==

import type { ItemParse } from "./types";
import { mergeObjects } from "./utils";

const addButton = () => {
	const titleContainer = document.querySelector(".current-media-parent-ref");

	if (!titleContainer) return;

	const button = document.createElement("a");

	button.id = "kaddon-button";
	button.textContent = "Marquer comme vu";
	button.style.cursor = "pointer";
	titleContainer.append(button);

	button.addEventListener("click", () => handleClick());
};

const handleClick = () => {
	const obj: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
		'script[type="application/ld+json"]',
	);

	const parsed: ItemParse[] = Array.from(obj)
		.map((script) => {
			try {
				return JSON.parse(script.innerText) as ItemParse;
			} catch (error) {
				console.error("Erreur lors du parsing JSON:", error);
				return null;
			}
		})
		.filter((item): item is ItemParse => item !== null);

	const merged: ItemParse = mergeObjects(parsed);

	const title = merged.partOfSeries?.name;
	const episode = merged.episodeNumber;
	const season = merged.partOfSeason?.seasonNumber;

	if (!title || !episode || !season) return;

	window.open(
		`https://www.adkami.com/video?search=${title}&kaddon=${episode}/1/2/${season}`,
	);
};

const mutationCallback: MutationCallback = (mutationsList) => {
	mutationsList.forEach(() => {
		if (!document.querySelector(".show-title-link")) return;

		const button = document.querySelector("#kaddon-button");

		if (button) return;

		addButton();
	});
};

const observer = new MutationObserver(mutationCallback);
const config = { childList: true, subtree: true };

const goToEpisode = () => {
	const list: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(".video-item-list");

	if (list.length !== 1) return;

	const url: HTMLAnchorElement | null = list[0].querySelector(".top a");
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

			const watchlist: HTMLButtonElement | null =
				document.querySelector("#watchlist-actuel") ??
				document.querySelector("#watchlist_end");

			if (!watchlist) return;

			watchlist.click();
			setTimeout(() => window.close(), 1000);
		}
	}
})();

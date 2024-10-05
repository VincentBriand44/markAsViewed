import type { ItemParse } from "./types";
import { mergeObjects } from "./utils";

const addButton = () => {
	const titleContainer = document.querySelector(".current-media-parent-ref");

	if (!titleContainer) return;

	const buttonA = document.createElement("a");

	buttonA.id = "kaddon-button";
	buttonA.textContent = "Marquer comme vu";
	buttonA.style.cursor = "pointer";
	titleContainer.append(buttonA);

	buttonA.addEventListener("click", () => handleClick(0));

	const buttonB = document.createElement("a");

	buttonB.id = "kaddon-button";
	buttonB.textContent = "(-1)";
	buttonB.style.cursor = "pointer";
	buttonB.style.marginLeft = ".25rem";
	titleContainer.append(buttonB);

	buttonB.addEventListener("click", () => handleClick(-1));
};

const handleClick = (step: number) => {
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
	console.log("🚀 ~ handleClick ~ merged:", merged);

	if (!title || !season) return;

	window.open(
		`https://www.adkami.com/video?search=${title}${episode ? `&kaddon=${episode + step}/1/2/${season}` : ""}`,
	);
};

const mutationCallback: MutationCallback = (mutationsList) => {
	for (const _ of mutationsList) {
		if (!document.querySelector(".show-title-link")) return;

		const button = document.querySelector("#kaddon-button");
		if (button) return;

		addButton();
	}
};

const observer = new MutationObserver(mutationCallback);
const config = { childList: true, subtree: true };

const goToEpisode = () => {
	const list: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(".video-item-list");

	if (list.length === 1) {
		const url: HTMLAnchorElement | null = list[0].querySelector(".top a");
		const args = location.search.split("kaddon=")[1];

		window.location.href = `${url?.href}/${args}/?kaddon`;
		return;
	}
	// biome-ignore lint/complexity/noForEach: <explanation>
	list.forEach((item) => {
		const anchor: HTMLAnchorElement | null = item.querySelector(".top a");
		const args = location.search.split("kaddon=")[1];

		if (!anchor?.href) return;
		anchor.href = `${anchor.href}/${args}/?kaddon`;
	});
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

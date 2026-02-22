import { animeInject, buttonCheck, episodeInject } from "./lib/buttonIntegration";
import goTo from "./lib/goTo";
import episodeIntegration from "./lib/integrations";
import { MUTATION_DEBOUNCE_DELAY, WINDOW_CLOSE_DELAY } from "./lib/utils";

const website = episodeIntegration(location.host);

let mutationTimeout: ReturnType<typeof setTimeout> | null = null;

const mutationCallback: MutationCallback = () => {
	if (!website) return;

	if (mutationTimeout) {
		clearTimeout(mutationTimeout);
	}

	mutationTimeout = setTimeout(() => {
		const container = document.querySelector("#kaddon-container");
		let seasonState = false;

		if (!website.episodeMutation) return;

		let mutationElement = document.querySelector(website.episodeMutation);

		if (!mutationElement && website.animeMutation) {
			mutationElement = document.querySelector(website.animeMutation);
			seasonState = true;
		}

		if (!mutationElement || (buttonCheck({ data: website.data, seasonState }) && container)) return;

		container?.remove();

		seasonState ? animeInject(website) : episodeInject(website);
	}, MUTATION_DEBOUNCE_DELAY);
};

const observer = new MutationObserver(mutationCallback);
const config = { childList: true, subtree: true, attributes: true };

(() => {
	if (location.host === "www.adkami.com") {
		if (location.pathname === "/video") {
			goTo();
			return;
		}

		const locationSearch = location.search;

		if (locationSearch.includes("kaddon-title")) {
			const title = locationSearch.split("kaddon-title=")[1];
			const url = location.pathname.split("/")[2];

			GM.setValue(decodeURIComponent(title), url);
		}

		if (locationSearch.includes("kaddon-info")) return;

		const watchlist = document.querySelector<HTMLButtonElement>(
			"#watchlist-actuel, #watchlist_end",
		);

		if (watchlist) {
			const title = document.querySelector<HTMLHeadingElement>("h1.title-header-video");

			const { pathname } = window.location;
			const episode = pathname.split("/")[3];

			if (!title || !title.textContent?.includes(episode)) return;

			watchlist.click();
			setTimeout(() => window.close(), WINDOW_CLOSE_DELAY);
		}

		return;
	}

	observer.observe(document.body, config);
})();

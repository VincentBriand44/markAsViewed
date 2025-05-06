import { buttonCheck, buttonInject } from "./lib/button";
import goToEpisode from "./lib/goToEpisode";
import hostIntegration from "./lib/integrations";

const website = hostIntegration(location.host);

const mutationCallback: MutationCallback = () => {
	if (!website) return;

	const container = document.querySelector("#kaddon-container");

	const mutationElement = document.querySelector(website.mutation);

	if (
		!mutationElement ||
		!website.position ||
		(buttonCheck(website) && container)
	)
		return;

	container?.remove();

	buttonInject(website);
};

const observer = new MutationObserver(mutationCallback);
const config = { childList: true, subtree: true, attributes: true };

(() => {
	if (location.host === "www.adkami.com") {
		if (location.pathname === "/video") {
			goToEpisode();

			return;
		}

		if (location.search.includes("kaddon-info")) return;

		const watchlist = document.querySelector<HTMLButtonElement>(
			"#watchlist-actuel, #watchlist_end",
		);

		if (watchlist) {
			const title = document.querySelector<HTMLHeadingElement>(
				"h1.title-header-video",
			);

			const { pathname } = window.location;

			const episode = pathname.split("/")[3];

			if (!title || !title.textContent?.includes(episode)) return;

			watchlist.click();
			setTimeout(() => window.close(), 1000);
		}

		return;
	}

	observer.observe(document.body, config);
})();

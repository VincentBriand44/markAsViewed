import buttonInject from "./lib/button";
import goToEpisode from "./lib/goToEpisode";
import hostIntegration from "./lib/integrations";

const website = hostIntegration(location.host);

const mutationCallback: MutationCallback = () => {
	if (!website) return;

	const mutationElement = document.querySelector(website.mutation);
	const button = document.querySelector("#kaddon-button");

	if (!mutationElement || !website.position || button) return;

	buttonInject(website);
};

const observer = new MutationObserver(mutationCallback);
const config = { childList: true, subtree: true };

(() => {
	if (location.host === "www.adkami.com") {
		if (location.pathname === "/video") {
			goToEpisode();
			return;
		}

		const watchlist = document.querySelector<HTMLButtonElement>(
			"#watchlist-actuel, #watchlist_end",
		);
		if (watchlist) {
			watchlist.click();
			setTimeout(() => window.close(), 1000);
		}

		return;
	}

	observer.observe(document.body, config);
})();

import buttonInject from "./components/button";
import goToEpisode from "./components/goToEpisode";
import hostIntegration from "./integrations";

const { host } = location;
const website = hostIntegration(host);

const handleClick = (step: number) => {
  if (!website) return

	const { episode, season, title } = website.integration();

	window.open(
		`https://www.adkami.com/video?search=${title}${episode ? `&kaddon=${episode + step}/1/2/${season}` : ""}`,
	);
};

const mutationCallback: MutationCallback = (mutationsList) => {
  if (!website) return

  const mutationElement = document.querySelector(website.mutation)
  
  for (const _ of mutationsList) {
    if (!mutationElement) return;
    
		const button = document.querySelector("#kaddon-button");
		if (button || !website?.position) return;

		buttonInject(website?.position, handleClick);
	}
};

const observer = new MutationObserver(mutationCallback);
const config = { childList: true, subtree: true };

(() => {
	if (host === "www.adkami.com") {
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

		return;
	}

	observer.observe(document.body, config);
})();

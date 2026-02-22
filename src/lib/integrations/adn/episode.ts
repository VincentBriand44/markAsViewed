import type { Data } from "../../types";
import { extractIntegrationData, parseJsonLdData } from "../../utils";

const data = (): Data => {
	const parsed = parseJsonLdData();
	let bypass: undefined | string;

  if (location.pathname.split('/video/')[1].split('/')[1] === undefined) {
		bypass = document
			.querySelector('head>meta[property="og:title"]')
			?.attributes[1].value.split(" - Anime en streaming")[0];

    if (!bypass) throw new Error("not found title");
	}

	return extractIntegrationData(parsed, bypass);
};

export default {
	data,
	episodePosition: "h1",
	episodeMutation: 'div[data-testid="player-content"]',

	animePosition: 'div[data-testid="vod-rating"]',
	animeMutation: "h1",
};

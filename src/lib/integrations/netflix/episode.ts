import type { Data } from "../../types";

const data = (): Data => {
	if (location.pathname.includes("/title/")) {
		const bypass = document.querySelector(".about-header > h3 > strong")?.textContent;

		if (!bypass) throw new Error("data not found");

		return { title: bypass, episode: 0, season: 0 };
	}

	const titleElement: HTMLSelectElement | null = document.querySelector(
		'div[data-uia="video-title"]',
	);
	const episodeElement = Number(
		titleElement?.querySelectorAll("span")[0]?.textContent?.split("E")[1],
	);
	const seasonElement = document
		.querySelector('div[data-uia="pause-ad-title-display-info-container"] > div > span')
		?.innerHTML.split("&nbsp;:&nbsp;")[0];

	const title = titleElement?.querySelector("h4")?.textContent;
	const episode = episodeElement ?? 1;
	const season = Number(seasonElement?.startsWith("S") ? seasonElement.split("S")[1] : 1);

	if (!title || !season) throw new Error("data not found");

	return {
		episode,
		season,
		title,
	};
};

export default {
	data,
	episodePosition: 'div[data-uia="video-title"]',
	episodeMutation: 'div[data-uia="video-title"]',

	animePosition: 'div[data-uia="mini-modal-controls"] > div:last-child',
	animeMutation: 'div[data-uia="mini-modal-controls"]',
};

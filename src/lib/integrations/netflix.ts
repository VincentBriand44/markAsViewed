import type { IntegrationData } from "../types";

const integration = (): IntegrationData => {
	const titleElement: HTMLSelectElement | null = document.querySelector(
		'div[data-uia="video-title"]',
	);
	const episodeElement = Number(
		titleElement?.querySelectorAll("span")[0]?.textContent?.split("E")[1],
	);
	const seasonElement = document
		.querySelector(
			'div[data-uia="pause-ad-title-display-info-container"] > div > span',
		)
		?.innerHTML.split("&nbsp;:&nbsp;")[0];
	console.log("🚀 ~ integration ~ seasonElement:", seasonElement);

	const title = titleElement?.querySelector("h4")?.textContent;
	console.log("🚀 ~ integration ~ title:", title);
	const episode = episodeElement ?? 1;
	console.log("🚀 ~ integration ~ episode:", episode);
	const season = Number(
		seasonElement?.startsWith("S") ? seasonElement.split("S")[1] : 1,
	);
	console.log("🚀 ~ integration ~ season:", season);

	if (!title || !season) throw new Error("data not found");

	return {
		episode,
		season,
		title,
	};
};

export default {
	integration,
	position: 'div[data-uia="video-title"]',
	mutation: 'div[data-uia="video-title"]',
};

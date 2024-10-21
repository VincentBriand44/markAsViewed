import type { IntegrationData } from "../types";

const integration = (): IntegrationData => {
	const titleElement: HTMLSelectElement | null = document.querySelector(
		'div[data-uia="video-title"]',
	);
	const episodeElement = Number(
		titleElement?.querySelectorAll("span")[0]?.textContent?.split("E")[0],
	);

	const title = titleElement?.querySelector("h4")?.textContent;
	const episode = episodeElement ?? 1;
	const season = Number(titleElement?.querySelector("h4")?.textContent ?? 1);

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

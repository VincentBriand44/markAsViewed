import type { IntegrationData } from "../types";

const integration = (): IntegrationData => {
	const episodeElement: HTMLSelectElement | null =
		document.querySelector("#selectEpisodes");
	const seasonElement = document.querySelector("#avOeuvre");

	const title = document.querySelector("#titreOeuvre")?.textContent;
	const episode = Number(episodeElement?.value?.split(" ")[1]);
	const season = Number.parseInt(
		seasonElement?.textContent?.split(" ")[1] ?? "",
		10,
	);

	if (!title || !season) throw new Error("data not found");

	return {
		episode,
		season,
		title,
	};
};

export default {
	integration,
	position: "#printLastEpisode",
	mutation: "#selectEpisodes",
};

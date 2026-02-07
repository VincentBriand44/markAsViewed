import type { Data } from "../../types";

const data = (): Data => {
	const episodeElement: HTMLSelectElement | null = document.querySelector("#selectEpisodes");
	const seasonElement = document.querySelector("#avOeuvre");

	const title = document.querySelector("#titreOeuvre")?.textContent;
	const episode = Number(episodeElement?.value?.split(" ")[1]);
	const season = Number.parseInt(seasonElement?.textContent?.split(" ")[1] ?? "", 10);

  console.log(title, season)
  
	if (!title) throw new Error("data not found");

	return {
		episode,
		season,
		title,
	};
};

export default {
	data,
	episodePosition: "#printLastEpisode",
	episodeMutation: "#selectEpisodes",

  animePosition: '#addVu',
  animeMutation: '#addVu'
};

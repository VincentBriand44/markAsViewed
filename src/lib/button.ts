import type { Website } from "./types";

let episodeSaved: number | null | undefined = undefined;

const buttonCheck = ({ integration }: Website): boolean => {
	const { episode } = integration();

	if (episodeSaved === episode) return true;

	episodeSaved = episode;
	return false;
};

const buttonInject = ({ position, integration }: Website) => {
	const { episode, season, title } = integration();
	const element = document.querySelector(position);

	if (!element) throw new Error("Button injection failed");

	const getEpisodeUrl = (ep: number | null) => {
		let url = `https://www.adkami.com/video?search=${encodeURIComponent(title)}`;
		if (season !== null && ep !== null && ep > 0) {
			url += `&kaddon=${ep}/1/2/${season}`;
		}
		return url;
	};

	const episodeUrl = getEpisodeUrl(episode);
	const previousEpisodeUrl = getEpisodeUrl(episode - 1);

	const container = document.createElement("div");
	container.innerHTML = `
		<div id="kaddon-div">
			<a id="kaddon-button" href="${episodeUrl}" target="_blank">Marquer comme vu</a>
			<a id="kaddon-button-minus" href="${previousEpisodeUrl}" target="_blank">(-1)</a>
		</div>
	`;

	const style = document.createElement("style");
	style.textContent = `
		#kaddon-div {
			display: flex;
			gap: .25rem;
			padding-left: .5rem;
			font-size: 16px;
		}
		#kaddon-div a {
			cursor: pointer;
		}
		#kaddon-div a:hover {
			color: blue;
		}
	`;

	document.head.appendChild(style);
	element.after(container);
};

export { buttonCheck, buttonInject };

import iconBack from "../assets/markAsView-icon_check-1.svg";
import icon from "../assets/markAsView-icon_check.svg";
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
			<a id="kaddon-button" href="${episodeUrl}" target="_blank" style="height: 16px; width: 16px;">
				${icon}
			</a>
			<a id="kaddon-button-minus" href="${previousEpisodeUrl}" target="_blank" style="height: 16px; width: 16px;">
				${iconBack}
			</a>
		</div>
	`;
	element.after(container);

	if (document.getElementById("kaddon-style")) return;

	const style = document.createElement("style");
	style.id = "kaddon-style";
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
};

export { buttonCheck, buttonInject };

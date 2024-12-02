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

	const buttons = [
		{
			id: "kaddon-button",
			icon,
			step: 0,
		},
		{
			id: "kaddon-button-minus",
			icon: iconBack,
			step: -1,
		},
	];

	const container = document.createElement("div");
	container.id = "kaddon-container";
	container.style.display = "flex";
	container.style.gap = ".25rem";
	container.style.paddingLeft = ".5rem";

	for (const button of buttons) {
		const buttonElement = document.createElement("a");
		buttonElement.id = button.id;
		buttonElement.href = getEpisodeUrl(episode + button.step);
		buttonElement.target = "_blank";

		buttonElement.style.cursor = "pointer";
		buttonElement.style.height = "1rem";
		buttonElement.style.width = "1rem";

		buttonElement.innerHTML = button.icon;

		container.appendChild(buttonElement);
	}

	element.after(container);
};

export { buttonCheck, buttonInject };

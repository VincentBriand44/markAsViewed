import iconCheck from "../assets/markAsView-icon_check.svg";
import iconBack from "../assets/markAsView-icon_check-1.svg";
import iconInfo from "../assets/markAsView-icon_info.svg";

import type { Data, Website } from "./types";

interface Button {
	id: string;
	icon: string;
	step: number;
	info?: boolean;
}

let lastIntegrationCall: Data | null = null;

const buttonCheck = ({ data }: Website): boolean => {
	const currentData = data();

	if (
		lastIntegrationCall &&
		lastIntegrationCall.episode === currentData.episode &&
		lastIntegrationCall.season === currentData.season &&
		lastIntegrationCall.title === currentData.title
	) {
		return true;
	}

	lastIntegrationCall = currentData;
	return false;
};

const buttonInject = ({ episodePosition, data }: Website) => {
	try {
		const { episode, season, title } = lastIntegrationCall || data();
		const element = document.querySelector(episodePosition);

		if (!element) {
			console.warn(`Élément non trouvé pour l'injection: ${episodePosition}`);
			return;
		}

		const getEpisodeUrl = (ep: number | null, info = false) => {
			let url = `https://www.adkami.com/video?search=${encodeURIComponent(title)}`;
			if (season !== null && ep !== null) {
				url += `&kaddon=${ep > 0 ? ep : 1}/1/2/${season}`;
			}

			if (info) {
				url += "&kaddon-info";
			}

			return url;
		};

		const buttons: Button[] = [
			{
				id: "kaddon-button",
				icon: iconCheck,
				step: 0,
			},
			{
				id: "kaddon-button-minus",
				icon: iconBack,
				step: -1,
			},
			{
				id: "kaddon-button-info",
				icon: iconInfo,
				step: 0,
				info: true,
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
			buttonElement.href = getEpisodeUrl(episode + button.step, button.info);
			buttonElement.target = "_blank";

			buttonElement.style.cursor = "pointer";
			buttonElement.style.height = "1rem";
			buttonElement.style.width = "1rem";

			buttonElement.innerHTML = button.icon;

			container.appendChild(buttonElement);
		}

		element.after(container);
	} catch (error) {
		console.error("Erreur lors de l'injection du bouton:", error);
	}
};

export { buttonCheck, buttonInject };

import iconBack from "../assets/markAsView-icon_check-1.svg";
import iconCheck from "../assets/markAsView-icon_check.svg";
import iconInfo from "../assets/markAsView-icon_info.svg";

import type { Data, Website } from "./types";

interface Button {
	id: string;
	icon: string;
	step: number;
	info?: boolean;
}

let lastIntegrationCall: Data | null = null;

interface ButtonCheckArgs {
	data: Website["data"];
	seasonState: boolean;
}

const buttonCheck = ({ data, seasonState }: ButtonCheckArgs): boolean => {
	const currentData = data();

	if (
		seasonState ||
		(lastIntegrationCall &&
			lastIntegrationCall.episode === currentData.episode &&
			lastIntegrationCall.season === currentData.season &&
			lastIntegrationCall.title === currentData.title)
	) {
		return true;
	}

	lastIntegrationCall = currentData;
	return false;
};

const episodeInject = async ({ episodePosition, data }: Website) => {
	try {
		if (!lastIntegrationCall) lastIntegrationCall = data();

		const { episode, season, title } = lastIntegrationCall;
		const element = document.querySelector(episodePosition);

		if (!element) {
			console.warn(`Élément non trouvé pour l'injection: ${episodePosition}`);
			return;
		}

		const getEpisodeUrl = async (step: number | null, info = false) => {
      let url = `https://www.adkami.com/video?search=${encodeURIComponent(title)}`;

      const titleSaved = await GM.getValue(title)

			if (titleSaved) {
        url = `${titleSaved.toString()}/`
			}

			if (season !== null && step !== null) {
				const ep = episode + step;

        if (!titleSaved) url += '&kaddon='

				url += `${ep > 0 ? ep : 1}/1/2/${season}`;

        if (titleSaved && !info) url += '?kaddon'
			}

			if (info && !titleSaved) {
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

		await buttonInject({ buttons, getEpisodeUrl, element });
	} catch (error) {
		console.error("Erreur lors de l'injection du bouton:", error);
	}
};

const animeInject = async ({ animePosition, data }: Website) => {
	try {
		if (animePosition === undefined) return;

		const { title } = data();
		const element = document.querySelector(animePosition);

		if (!element) {
			console.warn(`Élément non trouvé pour l'injection: ${animePosition}`);
			return;
		}

		const getEpisodeUrl = () =>
			`https://www.adkami.com/video?search=${encodeURIComponent(title)}&kaddon=1/1/2/1&kaddon-info`;

		const buttons: Button[] = [
			{
				id: "kaddon-button-info",
				icon: iconInfo,
				step: 0,
				info: true,
			},
		];

		await buttonInject({ buttons, getEpisodeUrl, element });
	} catch (error) {
		console.error("Erreur lors de l'injection du bouton:", error);
	}
};

interface ButtonInjectArgs {
	buttons: Button[];
	getEpisodeUrl: (step: number | null, info: boolean) => string | Promise<string>;
	element: Element;
}

const buttonInject = async ({ buttons, getEpisodeUrl, element }: ButtonInjectArgs) => {
	const container = document.createElement("div");
	container.id = "kaddon-container";
	container.style.display = "flex";
	container.style.gap = ".25rem";
	container.style.paddingLeft = ".5rem";

	for (const button of buttons) {
		const buttonElement = document.createElement("a");
		buttonElement.id = button.id;
		buttonElement.href = await Promise.resolve(getEpisodeUrl(button.step, button.info ?? false));
		buttonElement.target = "_blank";

		buttonElement.style.cursor = "pointer";
		buttonElement.style.height = "1rem";
		buttonElement.style.width = "1rem";

		buttonElement.innerHTML = button.icon;

		container.appendChild(buttonElement);
	}

	element.after(container);
};

export { animeInject, buttonCheck, episodeInject };

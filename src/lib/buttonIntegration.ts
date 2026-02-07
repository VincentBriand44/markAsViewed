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
  data: Website['data']
  seasonState: boolean
}

const buttonCheck = ({data, seasonState}: ButtonCheckArgs): boolean => {
	const currentData = data();

	if (
    seasonState ||
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

const episodeInject = ({ episodePosition, data }: Website) => {
	try {
    if (!lastIntegrationCall) lastIntegrationCall =  data()
		
    const { episode, season, title } = lastIntegrationCall;
		const element = document.querySelector(episodePosition);

		if (!element) {
			console.warn(`Élément non trouvé pour l'injection: ${episodePosition}`);
			return;
		}

		const getEpisodeUrl = (step: number | null, info = false) => {
      let url = `https://www.adkami.com/video?search=${encodeURIComponent(title)}`;
			if (season !== null && step !== null) {
        const ep = episode + step
				
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

    buttonInject({buttons, getEpisodeUrl, element})
		
	} catch (error) {
		console.error("Erreur lors de l'injection du bouton:", error);
	}
};

const animeInject = ({ animePosition, data }: Website) => {
  try {
    if (animePosition === undefined) return
		
    const { title } = data();
		const element = document.querySelector(animePosition);

		if (!element) {
			console.warn(`Élément non trouvé pour l'injection: ${animePosition}`);
			return;
		}

		const getEpisodeUrl = () => `https://www.adkami.com/video?search=${encodeURIComponent(title)}&kaddon=1/1/2/1&kaddon-info`;

		const buttons: Button[] = [
			{
				id: "kaddon-button-info",
				icon: iconInfo,
				step: 0,
				info: true,
			},
		];

    buttonInject({buttons, getEpisodeUrl, element})
		
	} catch (error) {
		console.error("Erreur lors de l'injection du bouton:", error);
	}
}

interface ButtonInjectArgs {
  buttons: Button[],
  getEpisodeUrl: (step: number | null, info: boolean) => string | string,
  element: Element
}

const buttonInject = ({buttons, getEpisodeUrl, element}: ButtonInjectArgs) => {
  const container = document.createElement("div");
  container.id = "kaddon-container";
  container.style.display = "flex";
  container.style.gap = ".25rem";
  container.style.paddingLeft = ".5rem";

  for (const button of buttons) {
    const buttonElement = document.createElement("a");
    buttonElement.id = button.id;
    buttonElement.href = getEpisodeUrl(button.step, button.info ?? false);
    buttonElement.target = "_blank";

    buttonElement.style.cursor = "pointer";
    buttonElement.style.height = "1rem";
    buttonElement.style.width = "1rem";

    buttonElement.innerHTML = button.icon;

    container.appendChild(buttonElement);
  }

  element.after(container);
}

export { animeInject, buttonCheck, episodeInject };

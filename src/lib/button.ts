import iconBack from "../assets/markAsView-icon_check-1.svg";
import iconCheck from "../assets/markAsView-icon_check.svg";
import iconInfo from "../assets/markAsView-icon_info.svg";

import type { IntegrationData, Website } from "./types";

/**
 * Interface pour définir un bouton d'action
 */
interface Button {
	id: string;
	icon: string;
	step: number;
	info?: boolean;
}

// Variables de cache pour optimiser les performances
let lastIntegrationCall: IntegrationData | null = null;

/**
 * Vérifie si les boutons doivent être injectés
 * Utilise un cache pour éviter les appels répétés
 */
const buttonCheck = ({ integration }: Website): boolean => {
	const currentData = integration();

	// Cache les données pour éviter les appels répétés
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

/**
 * Injecte les boutons "Mark as Viewed" dans le DOM
 * @param position - Sélecteur CSS de l'élément parent
 * @param integration - Fonction d'intégration pour récupérer les données
 */
const buttonInject = ({ position, integration }: Website) => {
	try {
		// Utilise les données mises en cache si disponibles
		const { episode, season, title } = lastIntegrationCall || integration();
		const element = document.querySelector(position);

		if (!element) {
			console.warn(`Élément non trouvé pour l'injection: ${position}`);
			return;
		}

		/**
		 * Génère l'URL AdKami pour un épisode donné
		 * @param ep - Numéro d'épisode
		 * @param info - Si true, ajoute le paramètre kaddon-info
		 * @returns URL complète vers AdKami
		 */
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

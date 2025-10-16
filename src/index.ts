import { buttonCheck, buttonInject } from "./lib/button";
import goToEpisode from "./lib/goToEpisode";
import hostIntegration from "./lib/integrations";
import { MUTATION_DEBOUNCE_DELAY, WINDOW_CLOSE_DELAY } from "./lib/utils";

/**
 * Script principal pour l'intégration "Mark as Viewed"
 * Permet de marquer automatiquement des épisodes comme vus sur AdKami
 * depuis d'autres plateformes de streaming (Crunchyroll, Netflix, ADN, Anime-Sama)
 */

// Détermine l'intégration à utiliser selon le site actuel
const website = hostIntegration(location.host);

let mutationTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Callback pour observer les mutations du DOM
 * Injecte les boutons "Mark as Viewed" quand les éléments cibles sont détectés
 */
const mutationCallback: MutationCallback = () => {
	if (!website) return;

	// Debounce les mutations pour éviter les appels trop fréquents
	if (mutationTimeout) {
		clearTimeout(mutationTimeout);
	}

	mutationTimeout = setTimeout(() => {
		const container = document.querySelector("#kaddon-container");
		const mutationElement = document.querySelector(website.mutation);

		// Vérifie si l'injection est nécessaire
		if (!mutationElement || !website.position || (buttonCheck(website) && container)) return;

		// Supprime l'ancien container et injecte les nouveaux boutons
		container?.remove();
		buttonInject(website);
	}, MUTATION_DEBOUNCE_DELAY);
};

const observer = new MutationObserver(mutationCallback);
const config = { childList: true, subtree: true, attributes: true };

/**
 * Initialise le script selon le site actuel
 */
(() => {
	// Logique spécifique pour AdKami
	if (location.host === "www.adkami.com") {
		// Redirection vers l'épisode spécifique
		if (location.pathname === "/video") {
			goToEpisode();
			return;
		}

		// Évite l'exécution sur les pages d'information
		if (location.search.includes("kaddon-info")) return;

		// Marque automatiquement l'épisode comme vu
		const watchlist = document.querySelector<HTMLButtonElement>(
			"#watchlist-actuel, #watchlist_end",
		);

		if (watchlist) {
			const title = document.querySelector<HTMLHeadingElement>("h1.title-header-video");

			const { pathname } = window.location;
			const episode = pathname.split("/")[3];

			if (!title || !title.textContent?.includes(episode)) return;

			watchlist.click();
			setTimeout(() => window.close(), WINDOW_CLOSE_DELAY);
		}

		return;
	}

	// Pour les autres sites, observe les mutations du DOM
	observer.observe(document.body, config);
})();

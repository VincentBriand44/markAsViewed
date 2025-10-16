import type { IntegrationData, ItemParse } from "./types";

// Constantes pour les sélecteurs JSON-LD
export const JSON_LD_SELECTOR = 'script[type="application/ld+json"]';

// Constantes pour les délais
export const MUTATION_DEBOUNCE_DELAY = 100;
export const WINDOW_CLOSE_DELAY = 1000;

export const mergeObjects = (objects: ItemParse[]): ItemParse => {
	const acc: ItemParse = {} as ItemParse;

	for (const curr of objects) {
		Object.assign(acc, curr);

		acc.aggregateRating = acc.aggregateRating || curr.aggregateRating;
		acc.partOfSeason = acc.partOfSeason || curr.partOfSeason;
		acc.partOfSeries = acc.partOfSeries || curr.partOfSeries;
		acc.potentialAction = acc.potentialAction || curr.potentialAction;

		acc.thumbnailUrl = Array.isArray(acc.thumbnailUrl)
			? [
					...acc.thumbnailUrl,
					...(Array.isArray(curr.thumbnailUrl) ? curr.thumbnailUrl : [curr.thumbnailUrl]),
				]
			: [
					acc.thumbnailUrl,
					...(Array.isArray(curr.thumbnailUrl) ? curr.thumbnailUrl : [curr.thumbnailUrl]),
				];
	}

	return acc;
};

/**
 * Parse les données JSON-LD depuis les scripts de la page
 */
export const parseJsonLdData = (): ItemParse[] => {
	const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(JSON_LD_SELECTOR);

	return Array.from(scripts)
		.map((script) => {
			try {
				return JSON.parse(script.innerText) as ItemParse;
			} catch (error) {
				console.error("Erreur lors du parsing JSON:", error);
				return null;
			}
		})
		.filter((item): item is ItemParse => item !== null);
};

/**
 * Extrait les données d'intégration depuis les objets JSON-LD parsés
 */
export const extractIntegrationData = (parsed: ItemParse[]): IntegrationData => {
	const merged: ItemParse = mergeObjects(parsed);

	const title = merged.partOfSeries?.name;
	const episode = Number(merged.episodeNumber ?? 1);
	const season = merged.partOfSeason?.seasonNumber ?? 1;

	if (!title || !season) {
		throw new Error("Données d'intégration non trouvées dans le JSON-LD");
	}

	return {
		episode,
		season,
		title,
	};
};

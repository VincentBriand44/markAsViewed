import type { IntegrationData, ItemParse } from '../types';
import { mergeObjects } from '../utils';

const integration = (): IntegrationData => {
	const obj: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
		'script[type="application/ld+json"]',
	);

	const parsed: ItemParse[] = Array.from(obj)
		.map((script) => {
			try {
				return JSON.parse(script.innerText) as ItemParse;
			} catch (error) {
				console.error('Erreur lors du parsing JSON:', error);
				return null;
			}
		})
		.filter((item): item is ItemParse => item !== null);

	const merged: ItemParse = mergeObjects(parsed);

	const title = merged.partOfSeries?.name;
	const episode = Number(merged.episodeNumber) ?? 0;
	const season = merged.partOfSeason?.seasonNumber;

	if (!title || !season) throw new Error('data not found');

	return {
		episode,
		season,
		title,
	};
};

export default {
	integration,
	position: '.current-media-parent-ref',
	mutation: '.show-title-link',
};

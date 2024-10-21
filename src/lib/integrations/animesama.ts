import type { IntegrationData } from '../types';

const integration = (): IntegrationData => {
	const episodeElement: HTMLSelectElement | null =
		document.querySelector('#selectEpisodes');
	const seasonElement = document.querySelector('#avOeuvre');

	const title = document.querySelector('#titreOeuvre')?.textContent;
	console.log('🚀 ~ integration ~ title:', title);
	const episode = Number.parseInt(episodeElement?.value?.split(' ')[1] ?? '0');
	console.log('🚀 ~ integration ~ episode:', episode);
	const season = Number.parseInt(
		seasonElement?.textContent?.split(' ')[1] ?? '',
	);
	console.log('🚀 ~ integration ~ season:', season);

	if (!title || !season) throw new Error('data not found');

	return {
		episode,
		season,
		title,
	};
};

export default {
	integration,
	position: '#printLastEpisode',
	mutation: '#titreOeuvre',
};

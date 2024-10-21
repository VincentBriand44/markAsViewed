import type { IntegrationData } from '../types';
import adn from './adn';
import animesama from './animesama';
import crunchyroll from './crunchyroll';
import netflix from './netflix';

interface HostIntegration {
	integration: () => IntegrationData;
	position: string;
	mutation: string;
}

const hostIntegration = (
	host: Location['host'],
): HostIntegration | undefined => {
	console.log('🚀 ~ host:', host);
	switch (host) {
		case 'www.adkami.com': {
			return undefined;
		}
		case 'www.crunchyroll.com': {
			return crunchyroll;
		}
		case 'animationdigitalnetwork.com': {
			return adn;
		}
		case 'www.netflix.com': {
			return netflix;
		}
		case 'anime-sama.fr': {
			return animesama;
		}
	}

	throw new Error('invalid website');
};

export default hostIntegration;

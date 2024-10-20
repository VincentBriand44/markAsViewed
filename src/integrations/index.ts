import type { IntegrationData } from "../types";
import crunchyroll from "./crunchyroll";

interface HostIntegration {
	integration: () => IntegrationData;
	position: string;
	mutation: string;
}

const hostIntegration = (
	host: Location["host"],
): HostIntegration | undefined => {
	switch (host) {
		case "www.adkami.com": {
			return undefined;
		}
		case "www.crunchyroll.com": {
			return crunchyroll;
		}
		// case 'animationdigitalnetwork.com': {
		//   return adn
		// }
		// case 'www.netflix.com': {
		//   return netflix
		// }
		// case 'anime-sama.fr': {
		//   return animesama
		// }
	}

	throw new Error("invalid website");
};

export default hostIntegration;

import type { Website } from "../types";
import adn from "./adn";
import animesama from "./animesama";
import crunchyroll from "./crunchyroll";
import netflix from "./netflix";

const hostIntegration = (host: Location["host"]): Website | undefined => {
	switch (host) {
		case "www.adkami.com": {
			return undefined;
		}
		case "www.crunchyroll.com": {
			return crunchyroll;
		}
		case "animationdigitalnetwork.com": {
			return adn;
		}
		case "www.netflix.com": {
			return netflix;
		}
		case "anime-sama.fr": {
			return animesama;
		}
		default: {
			console.warn(`Site non supporté: ${host}`);
			return undefined;
		}
	}
};

export default hostIntegration;

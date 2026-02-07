import type { Website } from "../types";
import adn from "./adn/episode";
import animesama from "./animesama/episode";
import crunchyroll from "./crunchyroll/episode";
import netflix from "./netflix/episode";

const episodeIntegration = (host: Location["host"]): Website | undefined => {
	switch (true) {
		case host === "www.adkami.com": {
			return undefined;
		}
		case host === "www.crunchyroll.com": {
			return crunchyroll;
		}
		case host === "animationdigitalnetwork.com": {
			return adn;
		}
		case host === "www.netflix.com": {
			return netflix;
		}
		case host.startsWith("anime-sama."): {
			return animesama;
		}
		default: {
			console.warn(`Site non supporté: ${host}`);
			return undefined;
		}
	}
};

export default episodeIntegration;

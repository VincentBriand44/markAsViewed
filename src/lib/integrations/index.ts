import type { Website } from "../types";
import adn from "./adn";
import animesama from "./animesama";
import crunchyroll from "./crunchyroll";
import netflix from "./netflix";

const hostIntegration = (host: Location["host"]): Website | undefined => {
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

export default hostIntegration;

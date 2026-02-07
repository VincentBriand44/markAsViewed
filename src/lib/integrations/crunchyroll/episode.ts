import type { Data } from "../../types";
import { extractIntegrationData, parseJsonLdData } from "../../utils";

const data = (): Data => {
	const parsed = parseJsonLdData();
	return extractIntegrationData(parsed);
};

export default {
	data,
	episodePosition: ".current-media-parent-ref",
	episodeMutation: ".show-title-link",
};

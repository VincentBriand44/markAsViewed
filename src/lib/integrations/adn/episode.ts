import type { Data } from "../../types";
import { extractIntegrationData, parseJsonLdData } from "../../utils";

const data = (): Data => {
	const parsed = parseJsonLdData();
	return extractIntegrationData(parsed);
};

export default {
	data,
	episodePosition: "h1",
	episodeMutation: "h1 > span",
};

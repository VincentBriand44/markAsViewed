import type { IntegrationData } from "../types";
import { extractIntegrationData, parseJsonLdData } from "../utils";

const integration = (): IntegrationData => {
	const parsed = parseJsonLdData();
	return extractIntegrationData(parsed);
};

export default {
	integration,
	position: ".current-media-parent-ref",
	mutation: ".show-title-link",
};

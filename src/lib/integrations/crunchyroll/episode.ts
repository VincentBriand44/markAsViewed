import type { Data } from "../../types";
import { extractIntegrationData, parseJsonLdData } from "../../utils";

const data = (): Data => {
	const parsed = parseJsonLdData();
  let bypass: undefined | string = undefined

  if (location.pathname.includes('/series/')) {
    bypass = document.querySelector('head>meta[property="og:title"]')?.attributes[1].value.split('Watch ')[1]

    if (!bypass) throw new Error('not found title')
  }

  return extractIntegrationData(parsed, bypass);
};

export default {
	data,
	episodePosition: ".current-media-parent-ref",
	episodeMutation: ".show-title-link",

  animePosition: ".bottom-actions-wrapper",
  animeMutation: ".bottom-actions-wrapper"
};

export interface ItemParse {
	"@context": string | unknown[];
	"@id"?: string;
	name: string;
	"@type": string;
	datePublished?: string;
	url?: string;
	thumbnailUrl: string | string[];
	image?: string;
	aggregateRating?: {
		"@type": string;
		ratingValue: string;
		ratingCount: number;
		worstRating: number;
		bestRating: number;
	};
	episodeNumber?: number | string;
	partOfSeason?: {
		"@type": string;
		"@id": string;
		name: string;
		seasonNumber: number;
	};
	partOfSeries?: {
		"@type": string;
		"@id": string;
		name: string;
	};
	potentialAction?: {
		"@type": string;
		target: {
			url: string;
			actionPlatform: string;
			inLanguage: string;
		}[];
		actionAccessibilityRequirement?: {
			"@type": string;
			category: string;
			availabilityStarts: string;
			availabilityEnds: string;
		};
	};
	description?: string;
	duration?: string;
	uploadDate?: string;
}

export interface Data {
	episode: number;
	season: number;
	title: string;
}

export interface Website {
	data: () => Data;
  
	episodePosition: string;
	episodeMutation: string;

	animePosition?: string;
	animeMutation?: string;
}

export type Pos = Element | null;

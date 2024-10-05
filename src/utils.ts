import type { ItemParse } from "./types";

export const mergeObjects = (objects: ItemParse[]): ItemParse =>
	objects.reduce((acc, curr) => ({
		...acc,
		...curr,
		aggregateRating: acc.aggregateRating || curr.aggregateRating,
		partOfSeason: acc.partOfSeason || curr.partOfSeason,
		partOfSeries: acc.partOfSeries || curr.partOfSeries,
		potentialAction: acc.potentialAction || curr.potentialAction,
		thumbnailUrl: Array.isArray(acc.thumbnailUrl)
			? [
					...acc.thumbnailUrl,
					...(Array.isArray(curr.thumbnailUrl)
						? curr.thumbnailUrl
						: [curr.thumbnailUrl]),
				]
			: [
					acc.thumbnailUrl,
					...(Array.isArray(curr.thumbnailUrl)
						? curr.thumbnailUrl
						: [curr.thumbnailUrl]),
				],
	}));

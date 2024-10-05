import type { ItemParse } from "./types";

export const mergeObjects = (objects: ItemParse[]): ItemParse => {
	const acc: ItemParse = {} as ItemParse;

	for (const curr of objects) {
		Object.assign(acc, curr);

		acc.aggregateRating = acc.aggregateRating || curr.aggregateRating;
		acc.partOfSeason = acc.partOfSeason || curr.partOfSeason;
		acc.partOfSeries = acc.partOfSeries || curr.partOfSeries;
		acc.potentialAction = acc.potentialAction || curr.potentialAction;

		acc.thumbnailUrl = Array.isArray(acc.thumbnailUrl)
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
				];
	}

	return acc;
};

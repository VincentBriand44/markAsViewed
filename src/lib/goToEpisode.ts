const goToEpisode = () => {
	const list: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(".video-item-list");

	if (list.length === 1) {
		const url: HTMLAnchorElement | null = list[0].querySelector(".top a");
		const args = location.search.split("kaddon=")[1];

		window.location.href = `${url?.href}/${args}/?kaddon`;
		return;
	}
	// biome-ignore lint/complexity/noForEach: <explanation>
	list.forEach((item) => {
		const anchor: HTMLAnchorElement | null = item.querySelector(".top a");
		const args = location.search.split("kaddon=")[1];

		if (!anchor?.href) return;
		anchor.href = `${anchor.href}/${args}/?kaddon`;
	});
};

export default goToEpisode;

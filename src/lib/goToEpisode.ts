const goToEpisode = () => {
	const list = document.querySelectorAll<HTMLDivElement>(".video-item-list");
	const args = location.search.split("kaddon=")[1];

	if (list.length !== 1) return;

	const anchor = list[0].querySelector<HTMLAnchorElement>(".top a");
	if (anchor?.href) {
		window.location.href = `${anchor.href}/${args}/?kaddon`;
	}
	return;
};

export default goToEpisode;

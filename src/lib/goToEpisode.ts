const goToEpisode = () => {
	const list = document.querySelectorAll<HTMLDivElement>(".video-item-list");
	let args = location.search.split("kaddon=")[1];
	let info = false;

	if (args.includes("&kaddon-info")) {
		info = true;
		args = args.replace("&kaddon-info", "");
	}

	if (list.length === 0 && !info) {
		const searchInput =
			document.querySelector<HTMLInputElement>(".search-input");
		const searchButton = document.querySelector<HTMLButtonElement>(
			".video-search-button",
		);

		if (!searchInput || !searchButton) return;

		searchButton.addEventListener("click", (e) => {
			e.preventDefault();

			window.location.href = `https://www.adkami.com/video?search=${searchInput.value}&kaddon=${args}`;
		});
	}

	if (list.length > 1 && !info) {
		for (const item of Array.from(list)) {
			const anchor = item.querySelector<HTMLAnchorElement>(".top a");

			if (anchor?.href) {
				anchor.href = `${anchor.href}/${args}/?kaddon`;
			}
		}

		return;
	}

	const anchor = list[0].querySelector<HTMLAnchorElement>(".top a");

	if (anchor?.href) {
		window.location.href = `${anchor.href}/${args}/${info ? "" : "?kaddon"}`;
	}

	return;
};

export default goToEpisode;

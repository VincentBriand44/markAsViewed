const buttonInject = (
	position: string,
	handleClick: (step: number) => void,
) => {
	const element = document.querySelector(position);

	if (!element) throw new Error("button inject failed");

	const buttonA = document.createElement("a");

	buttonA.id = "kaddon-button";
	buttonA.textContent = "Marquer comme vu";
	buttonA.style.cursor = "pointer";
	element.append(buttonA);

	buttonA.addEventListener("click", () => handleClick(0));

	const buttonB = document.createElement("a");

	buttonB.id = "kaddon-button";
	buttonB.textContent = "(-1)";
	buttonB.style.cursor = "pointer";
	buttonB.style.marginLeft = ".25rem";
	element.append(buttonB);

	buttonB.addEventListener("click", () => handleClick(-1));
};

export default buttonInject;

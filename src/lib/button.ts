const buttonInject = (
	position: string,
	handleClick: (step: number) => void,
) => {
	const element = document.querySelector(position);

	if (!element) throw new Error('button inject failed');

	const container = document.createElement('div');
	container.innerHTML = `
    <div id="kaddon-div">
      <a id="kaddon-button">Marquer comme vu</a>
      <a id="kaddon-button-">(-1)</a>
    </div>

    <style>
      #kaddon-div {
        display: flex;
        gap: .25rem;
        cursor: pointer;
        padding-left: .5rem;
        font-size: 16px;
      }
      #kaddon-div a:hover {
        color: blue;
      }
    </style>
  `;
	element.after(container);

	const buttonA = document.querySelector('#kaddon-button');

	buttonA?.addEventListener('click', () => handleClick(0));

	const buttonB = document.querySelector('#kaddon-button-');

	buttonB?.addEventListener('click', () => handleClick(-1));
};

export default buttonInject;

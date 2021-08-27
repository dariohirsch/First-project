window.onload = () => {
	document.getElementById("button").onclick = () => {
		const canvas = document.querySelector("#canvas");

		app.init(canvas);
		const button = document.querySelector("#button");
		button.innerText = "Reset";
		button.onclick = () => {
			location.reload();
		};
	};
};

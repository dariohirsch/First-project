window.onload = () => {
	document.getElementById("button").onclick = () => {
		const canvas = document.querySelector("#canvas");
		app.init(canvas);
	};
};

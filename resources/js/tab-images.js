async function dockerImages() {
	let info = await Neutralino.os.execCommand('docker images --format=json'); 
	let str = info.stdOut.split("\n");
	let images = [];

	for (let key in str) {
		if (str[key].length != 0) {
			let img = JSON.parse(str[key]);
			images.push(img);
		}
	}

	let html = `
		<table id="img-table">
			<tr>
				<th>Repository</th>
				<th>Tag</th>
				<th>Image ID</th>
				<th>Created</th>
				<th>Size</th>
			</tr>`;

	images.forEach((img) => {
		html = html + `
			<tr>
				<td>${img["Repository"]}</td>
				<td>${img["Tag"]}</td>
				<td>${img["ID"]}</td>
				<td>${img["CreatedSince"]}</td>
				<td>${img["Size"]}</td>
			</tr>`;
	});

	document.querySelector("#content").innerHTML = html;
}

function imagesTab(el) {
	selNav(el);
	dockerImages();
	clearIntervals();
	interval = setInterval(dockerImages, 5000);
	activeIntervals.push(interval);
}

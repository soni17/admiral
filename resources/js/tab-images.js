async function dockerImages() {
	let info = await Neutralino.os.execCommand('docker images --format=json'); 
	let str = info.stdOut.replaceAll('}\n{' , '},{');
	let images = JSON.parse('[' + str + ']');

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

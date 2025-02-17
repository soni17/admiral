async function dockerContainers(){
	let info = await Neutralino.os.execCommand('docker ps --all --format=json'); 
	let str = info.stdOut.split("\n");
	let containers = [];

	for (let key in str) {
		if (str[key].length != 0) {
			let img = JSON.parse(str[key]);
			containers.push(img);
		}
	}

	let html = `
		<table id="img-table">
			<tr>
				<th>Container ID</th>
				<th>Image</th>
				<th>State</th>
				<th>Status</th>
				<th>Names</th>
			</tr>`;

	containers.forEach((img) => {
		html = html + `
			<tr>
				<td>${img["ID"]}</td>
				<td>${img["Image"]}</td>
				<td>${img["State"]}</td>
				<td>${img["Status"]}</td>
				<td>${img["Names"]}</td>
			</tr>`;
	});

	document.querySelector("#content").innerHTML = html;
}

function containersTab(el){
	selNav(el);
	dockerContainers();
	clearIntervals();
	interval = setInterval(dockerContainers, 5000);
	activeIntervals.push(interval);
}

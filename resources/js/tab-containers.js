async function dockerContainers(){
	let info = await Neutralino.os.execCommand('docker ps --all --format=json'); 
	let str = info.stdOut.replaceAll('}\n{' , '},{');
	let containers = JSON.parse('[' + str + ']');

	let html = `
		<table id="img-table">
			<tr>
				<th>Container ID</th>
				<th>Image</th>
				<th>State</th>
				<th>Status</th>
			</tr>`;

	containers.forEach((img) => {
		html = html + `
			<tr>
				<td>${img["ID"]}</td>
				<td>${img["Image"]}</td>
				<td><span status="${img["State"]}"></span>${img["State"]}</td>
				<td>${img["Status"]}</td>
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

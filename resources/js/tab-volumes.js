async function dockerVolumes(){
	let info = await Neutralino.os.execCommand('docker volume ls --format=json'); 
	let str = info.stdOut.replaceAll('}\n{' , '},{');
	let volumes = JSON.parse('[' + str + ']');

	let html = `
		<table id="img-table">
			<tr>
				<th>Name</th>
				<th>Scope</th>
				<th>Status</th>
				<th>Size</th>
			</tr>`;

	volumes.forEach((img) => {
		html = html + `
			<tr>
				<td>${img["Name"].substr(0,10)}</td>
				<td>${img["Scope"]}</td>
				<td>${img["Status"]}</td>
				<td>${img["Size"]}</td>
			</tr>`;
	});

	document.querySelector("#content").innerHTML = html;
}

function volumesTab(el){
	selNav(el);
	dockerVolumes();
	clearIntervals();
	interval = setInterval(dockerVolumes, 5000);
	activeIntervals.push(interval);
}

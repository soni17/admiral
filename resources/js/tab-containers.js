function stopContainer(id){
	Neutralino.os.execCommand(`docker stop ${id}`)
}

function startContainer(id){
	Neutralino.os.execCommand(`docker start ${id}`)
}

function restartContainer(id){
	Neutralino.os.execCommand(`docker restart ${id}`)
}

function deleteContainer(id){
	Neutralino.os.execCommand(`docker rm ${id}`)
}

function openTerminal(id){
	Neutralino.os.execCommand(`mate-terminal -- bash -c "docker exec -it ${id} bash"`);
}

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
				<th>Actions</th>
			</tr>`;

	containers.forEach((img) => {
		html = html + `
			<tr>
				<td>${img["ID"]}</td>
				<td>${img["Image"]}</td>
				<td><span status="${img["State"]}"></span>${img["State"]}</td>
				<td>${img["Status"]}</td>
				<td>
					<label class="dropdown">
						<div class="dd-button">Actions</div>
						<input type="checkbox" class="dd-input">
						<ul class="dd-menu">
							<li onclick="openTerminal('${img["ID"]}')">Open Terminal</li>
							<li onclick="stopContainer('${img["ID"]}')">Stop</li>
							<li onclick="startContainer('${img["ID"]}')">Start</li>
							<li onclick="restartContainer('${img["ID"]}')">Restart</li>
							<li onclick="deleteContainer('${img["ID"]}')">Delete</li>
		
						</ul>		
					</label>
				</td>
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

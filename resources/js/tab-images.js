function startNewContainer(id){
	Neutralino.os.execCommand(`docker run -dit ${id}`);
}

function removeImage(id){
	Neutralino.os.execCommand(`docker image rm ${id}`);
}

async function dockerImages() {
	let info = await Neutralino.os.execCommand('docker images --format=json'); 
	let str = info.stdOut.replaceAll('}\n{' , '},{');
	let images = JSON.parse('[' + str + ']');

	let html = `
		<table id="img-table">
			<tr>
				<th>Name</th>
				<th>Tag</th>
				<th>Created</th>
				<th>Size</th>
				<th>Actions</th>
			</tr>`;

	images.forEach((img) => {
		html = html + `
			<tr>
				<td>${img["Repository"]}</td>
				<td>${img["Tag"]}</td>
				<td>${img["CreatedSince"]}</td>
				<td>${img["Size"]}</td>
				<td>
					<label class="dropdown">
						<div class="dd-button">Actions</div>
						<input type="checkbox" class="dd-input">
						<ul class="dd-menu">
							<li onclick="startNewContainer('${img["Repository"]}')">Start Container</li>
							<li onclick="removeImage('${img["Repository"]}')">Delete Image</li>
						</ul>		
					</label>
				</td>
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

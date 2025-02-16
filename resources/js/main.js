function setTray() {
	// Tray menu is only available in window mode
	if (NL_MODE != "window") {
		console.log("INFO: Tray menu is only available in the window mode.");
		return;
	}

	// Define tray menu items
	let tray = {
		icon: "/resources/icons/trayIcon.png",
		menuItems: [
			{ id: "VERSION", text: "Get version" },
			{ id: "SEP", text: "-" },
			{ id: "QUIT", text: "Quit" },
		],
	};

	// Set the tray menu
	Neutralino.os.setTray(tray);
}

/*
    Function to handle click events on the tray menu items.
    This function performs different actions based on the clicked item's ID,
    such as displaying version information or exiting the application.
*/
function onTrayMenuItemClicked(event) {
	switch (event.detail.id) {
		case "VERSION":
			// Display version information
			Neutralino.os.showMessageBox(
				"Version information",
				`Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`
			);
			break;
		case "QUIT":
			// Exit the application
			Neutralino.app.exit();
			break;
	}
}

/*
    Function to handle the window close event by gracefully exiting the Neutralino application.
*/
function onWindowClose() {
	Neutralino.app.exit();
}

// Initialize Neutralino
Neutralino.init();

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

// Conditional initialization: Set up system tray if not running on macOS
if (NL_OS != "Darwin") {
	// TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
	setTray();
}

Neutralino.os.execCommand("docker --version").then((res) => {
	let docker = res.stdOut.split(" ")[2];
	docker = docker.substr(0, docker.length - 1);
	document.querySelector("#docker").innerText = docker;
});

function dockerImages() {
	Neutralino.os.execCommand("docker images --format json").then((res) => {
		let images = [];
		let str = res.stdOut.split("\n");

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
			</tr>
		`;

		images.forEach((img) => {
			html =
				html +
				`
				<tr>
					<td>${img["Repository"]}</td>
					<td>${img["Tag"]}</td>
					<td>${img["ID"]}</td>
					<td>${img["CreatedSince"]}</td>
					<td>${img["Size"]}</td>
				</tr>
			`;
		});

		document.querySelector("#content").innerHTML = html;
	});
}

function imagesTab() {
	setInterval(dockerImages, 5000);
}

function selNav(el) {
	navs = document.querySelectorAll("#sidenav a");
	navs.forEach((el) => el.classList.remove("selected"));
	el.classList.add("selected");
}

window.onload = () => {
	console.log(
		"    _____        _          __                              _           __      ______\n",
		"  / ___/___    (_)___ _   / /_  ___  ____ ___       _   __(_)___  ____/ /___  / / / /\n",
		"  \\__ \\/ _ \\  / / __ `/  / __ \\/ _ \\/ __ `__ \\_____| | / / / __ \\/ __  / __ \\/ / / / \n",
		" ___/ /  __/ / / /_/ /  / /_/ /  __/ / / / / /_____/ |/ / / / / / /_/ / /_/ /_/_/_/  \n",
		"/____/\\___/_/ /\\__,_/  /_.___/\\___/_/ /_/ /_/      |___/_/_/ /_/\\__,_/\\____(_|_|_)   \n",
		"         /___/                                                                       \n")
}


function toggleAccordion(element) {
	if (!element) {
		return
	}

	if(!element.classList.contains("active-acorddion")) {
		element.classList.add("active-acorddion")
		return
	}

	element.classList.remove("active-acorddion")
}
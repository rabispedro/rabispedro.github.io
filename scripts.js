window.onload = () => {
	const gameCanvas = document.getElementById("game-canvas")
	const gameContext = gameCanvas.getContext("2d")

	console.log(
		"    _____        _          __                              _           __      ______\n",
		"  / ___/___    (_)___ _   / /_  ___  ____ ___       _   __(_)___  ____/ /___  / / / /\n",
		"  \\__ \\/ _ \\  / / __ `/  / __ \\/ _ \\/ __ `__ \\_____| | / / / __ \\/ __  / __ \\/ / / / \n",
		" ___/ /  __/ / / /_/ /  / /_/ /  __/ / / / / /_____/ |/ / / / / / /_/ / /_/ /_/_/_/  \n",
		"/____/\\___/_/ /\\__,_/  /_.___/\\___/_/ /_/ /_/      |___/_/_/ /_/\\__,_/\\____(_|_|_)   \n",
		"         /___/                                                                       \n")

	draw(gameContext)
}


function toggleAccordion(element) {
	if (!element) {
		return
	}

	if (!element.classList.contains("active-acorddion")) {
		element.classList.add("active-acorddion")
		return
	}

	element.classList.remove("active-acorddion")
}

function selectExperience(element) {
	if (!element) {
		return
	}

	const nav = element.parentNode
	for (const button of nav.children) {
		button.classList.remove("ativo")
	}
	element.classList.add("ativo")

	const contentName = `conteudo-${element.id}`

	const div = document.getElementById("experience-list")
	for (const experience of div.children) {
		experience.classList.remove("selecionado")
	}

	const content = document.getElementById(contentName)
	content.classList.add("selecionado")
}



function draw(context) {
	context.shadowOffsetX = 1
	context.shadowOffsetY = 1
	context.shadowBlur = 0
	context.shadowColor = "#D01744"
	
	context.font = "16px Poppins"
	context.fillStyle = "#EAEAEA"
	context.fillText("MINIJOGO", 100, 20)

}


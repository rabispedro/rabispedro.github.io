window.onload = async () => {
	const githubIntervalId = setInterval(async () => {
		const repo = githubRepositories.findLast(() => true);
		const result = await populatePersonalProjects(repo);
		
		if (result) {
			githubRepositories.pop();
			githubState.retries = 5;
		} else {
			githubState.retries--;
		}
		
		if (githubRepositories.length === 0) {
			clearInterval(githubIntervalId);
			githubState.status = "success";
		} else if (githubState.retries === 0) {
			populatePersonalProjectsFallback();
			githubState.status = "fallback";
			console.info("Personal Projects Status: ", githubState.status);
			clearInterval(githubIntervalId);
		}
	}, 500);

	console.log(
		"    _____        _          __                              _           __      ______\n",
		"  / ___/___    (_)___ _   / /_  ___  ____ ___       _   __(_)___  ____/ /___  / / / /\n",
		"  \\__ \\/ _ \\  / / __ `/  / __ \\/ _ \\/ __ `__ \\_____| | / / / __ \\/ __  / __ \\/ / / / \n",
		" ___/ /  __/ / / /_/ /  / /_/ /  __/ / / / / /_____/ |/ / / / / / /_/ / /_/ /_/_/_/  \n",
		"/____/\\___/_/ /\\__,_/  /_.___/\\___/_/ /_/ /_/      |___/_/_/ /_/\\__,_/\\____(_|_|_)   \n",
		"         /___/                                                                       \n")
}

function capitalize(word) {
	return word
		.replaceAll("-", " ")
		.split(" ")
		.map(w => w[0].toLocaleUpperCase().concat(w.substr(1)))
		.join(" ");
}

const githubState = {
	retries: 5,
	status: "pending"
}

const baseGithubApiName = "https://api.github.com/repos/rabispedro";

const githubRepositories = [
	"ms-income", "ws-market-backend", "competitive-programming",
	"viva-sabor-api", "lexicom-api", "adiante",
	"tiny-c", "web2", "hackagis-2023"
];

async function fetchRepository(repositoryName) {
	const repository = await fetch(`${baseGithubApiName}/${repositoryName}`);
	const data = await repository.json();

	if (!repository.ok || repository.redirected) {
		return {
			"error": true,
			"statusCode": repository.status,
			"message": data.message ?? `Redirected: ${repository.redirected}`
		}
	}
	
	return {
		"error": false,
		"statusCode": data.statusCode,
		"url": data.url,
		"name": capitalize(data.name),
		"description": data.description
	};
}

async function populatePersonalProjects(repo) {
	const data = await fetchRepository(repo);

	if (data.error) {
		console.warn(data.message)
		return false;
	}

	clearPersonalProjectsLoading();

	const anchor = document.createElement("a");
	anchor.href = data.url;
	anchor.innerHTML = `<strong>${data.name}:</strong> ${data.description}`;
	anchor.target = "_blank";
	anchor.rel = "noopener noreferrer";
	
	const item = document.createElement("li");
	item.appendChild(anchor);
	
	const projectsList = document.getElementById("conteudo-projetos-pessoais");
	projectsList.appendChild(item);

	return true;
}

function clearPersonalProjectsLoading() {
	const projectProgressLoader = document.getElementById("conteudo-projetos-area");

	if (projectProgressLoader) {
		projectProgressLoader.remove();
	}
}

function populatePersonalProjectsFallback() {
	clearPersonalProjectsLoading();
	
	const projectsList = document.getElementById("conteudo-projetos-pessoais");
	projectsList.innerHTML = `
	<li>
		<a href="https://github.com/rabispedro/ms-income" target="_blank" rel="noopener noreferrer">
			<strong>MS Income:</strong> Caso de estudo de um sistema web em Microserviços
		</a>
	</li>
	<li>
		<a href="https://github.com/rabispedro/ws-market-backend" target="_blank"
			rel="noopener noreferrer">
			<strong>WS Market Backend:</strong> Backend de um projeto de mercado utilizando Spring Boot
		</a>
	</li>
	<li>
		<a href="https://github.com/rabispedro/competitive-programming" target="_blank"
			rel="noopener noreferrer">
			<strong>Competitive Programming:</strong> Compilado de resolução de exercícios de maratona de programação
		</a>
	</li>
	<li>
		<a href="https://github.com/rabispedro/viva-sabor-api" target="_blank"
			rel="noopener noreferrer">
			<strong>Viva Sabor API:</strong> API monolítica Viva Sabor para a plataforma de gastronomia do desafio
			Grão Direto
		</a>
	</li>
	<li>
		<a href="https://github.com/rabispedro/lexicom-api" target="_blank"
			rel="noopener noreferrer">
			<strong>Lexicom API:</strong> Backend para o Desafio Técnico da Flora Energia
		</a>
	</li>
	<li>
		<a href="https://github.com/rabispedro/adiante" target="_blank" rel="noopener noreferrer">
			<strong>Adiante:</strong> Projeto de Antecipação de Recebível para o desafio técnico da Size Fintech
		</a>
	</li>
	<li>
		<a href="https://github.com/rabispedro/tiny-c" target="_blank" rel="noopener noreferrer">
			<strong>Tiny C:</strong> Compilado de práticas de código em C baseado no livro homônimo
		</a>
	</li>
	<li>
		<a href="https://github.com/BrCME/web2" target="_blank" rel="noopener noreferrer">
			<strong>SAFIA:</strong> Sistema de Apoio e Facilitação de Integração de Atividades em Spring Boot MVC
		</a>
	</li>
	<li>
		<a href="https://github.com/rabispedro/hackagis-2023" target="_blank"
			rel="noopener noreferrer">
			<strong>HackaGIS 2023:</strong> Site Praça para entretenimento de pessoas da melhor idade
		</a>
	</li>
	`
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

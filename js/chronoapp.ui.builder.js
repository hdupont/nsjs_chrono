chronoapp.ui.builder = (function() {
	
	function buildTitle() {
		var title = document.createElement("h1");
		var titleText = document.createTextNode("Chrono");
		title.appendChild(titleText);
		
		return title;
	}
	
	function buildCommandsDescription() {
		
		function appendTextLi(ul, text) {
			var li = document.createElement("li");
			var liText = document.createTextNode(text);
			li.appendChild(liText);
			
			ul.appendChild(li);
		}
		
		var descriptionContainer = document.createElement("div");
		var description = document.createTextNode("Utilisez le chrono avec le clavier :");
		descriptionContainer.appendChild(description);
		
		var commandsDescription = document.createElement("ul");
		appendTextLi(commandsDescription, "Démarrer/Reprendre: 'Entrer' ou 'd'");
		appendTextLi(commandsDescription, "Pause: 'Espace' ou 'p'");
		appendTextLi(commandsDescription, "Stop: 'Suppr' ou 'Retour arrière'");
		descriptionContainer.appendChild(commandsDescription);
		
		return descriptionContainer;
	}
	
	function buildChronoDisplay() {
		var chronoDiv = document.createElement("div");
		chronoDiv.style.fontSize = "4em";
		chronoDiv.innerHTML = '<span id="minutes">00</span>:<span id="seconds">00</span>:<span id="milliseconds">00</span>';
		
		return chronoDiv;
	}
	
	function buildButtonsMenu() {
		
		function appendButton(div, buttonLabel, id, color) {
			var button = document.createElement("button");
			button.setAttribute("id", id);
			
			// Style des boutons
			button.style.backgroundColor = color; /* Green */
			button.style.border = "none";
			button.style.color = "white";
			button.style.padding = "15px 32px";
			button.style.textAlign = "center";
			button.style.textDecoration = "none";
			button.style.display = "inline-block";
			button.style.fontSize = "16px";
			button.style.marginRight = "5px";
			button.style.borderRadius = "8px";
			
			var buttonText = document.createTextNode(buttonLabel);
			button.appendChild(buttonText);
			
			div.appendChild(button);
		}
		
		var menuDiv = document.createElement("div");
		
		var description = document.createTextNode("Utilisez le chrono avec des boutons :");
		menuDiv.appendChild(description);
		
		var buttonsContainer = document.createElement("div");
		appendButton(buttonsContainer, "Démarrer", "start", "#4CAF50"); // vert
		appendButton(buttonsContainer, "Pause", "pause", "#FFA500"); // orange
		appendButton(buttonsContainer, "Stop", "stop", "#f44336"); // rouge
		menuDiv.appendChild(buttonsContainer);
		

		return menuDiv;
	}
	
	return {

		/**
		 * @return {element} Un element div contenant l'UI.
		 */
		buildDomElement: function() {
			var appUiContainer = document.createElement("div");
			appUiContainer.appendChild(buildTitle());
			appUiContainer.appendChild(buildChronoDisplay());
			appUiContainer.appendChild(buildCommandsDescription());
			appUiContainer.appendChild(buildButtonsMenu());
			
			return appUiContainer;
		}
	}
})();

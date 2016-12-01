chronoapp.ui.builder = (function() {
	
	function buildTitle() {
		var title = document.createElement("h1");
		var titleText = document.createTextNode("Chrono");
		title.appendChild(titleText);
		
		return title;
	}

	function buildDescription() {
		var descriptionContainer = document.createElement("div");
		descriptionContainer.style.marginBottom = "1em";
		var description = document.createTextNode("Le chrono peut aussi s'utiliser avec le clavier. Les touches sont indiquées dans les boutons.");
		descriptionContainer.appendChild(description);
		
		return descriptionContainer;
	}
	
	function buildChronoDisplay() {
		var chronoDiv = document.createElement("div");
		chronoDiv.style.fontSize = "4em";
		chronoDiv.innerHTML = '<span id="minutes">00</span>:<span id="seconds">00</span>:<span id="milliseconds">00</span>';
		
		return chronoDiv;
	}
	
	function buildButtonsMenu() {
		
		function addButtonLabel(button, label, sublabel) {
			var labelDiv = document.createElement("div");
			labelDiv.style.fontSize = "2em";
			labelDiv.innerHTML = label;
			
			var sublabelDiv = document.createElement("div");
			sublabelDiv.style.fontSize = "1em";
			sublabelDiv.innerHTML = sublabel;
			
			button.appendChild(labelDiv);
			button.appendChild(sublabelDiv);
		}
		
		function appendButton(buttonsContainer, id, color, label, sublabel) {
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
			
			addButtonLabel(button, label, sublabel);
			
			buttonsContainer.appendChild(button);
		}
		
		var buttonsContainer = document.createElement("div");
		appendButton(buttonsContainer, "start", "#4CAF50", "Démarrer", "\"Entrer\" ou \"d\""); // vert
		appendButton(buttonsContainer, "pause", "#FFA500", "Pause", "\"Espace\" ou \"p\""); // orange
		appendButton(buttonsContainer, "stop", "#f44336", "Stop", "\"Suppr\" ou \"Retour arrière\""); // rouge
		
		var menuDiv = document.createElement("div");
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
			appUiContainer.appendChild(buildDescription());
			appUiContainer.appendChild(buildButtonsMenu());
			
			return appUiContainer;
		}
	}
})();

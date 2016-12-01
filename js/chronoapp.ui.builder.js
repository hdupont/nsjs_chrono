chronoapp.ui.builder = (function() {
	
	function buildTitle() {
		var title = document.createElement("p");
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
		
		var commandsDescription = document.createElement("ul");
		appendTextLi(commandsDescription, "Démarrer/Reprendre: 'Entrer' ou 'd'");
		appendTextLi(commandsDescription, "Pause: 'Espace' ou 'p'");
		
		return commandsDescription;
	}
	
	function buildChronoDisplay() {
		var chronoDiv = document.createElement("div");
		chronoDiv.innerHTML = '<span id="minutes">00</span>:<span id="seconds">00</span>:<span id="milliseconds">00</span>';
		
		return chronoDiv;
	}
	
	function buildButtonsMenu() {
		
		function appendButton(div, buttonLabel, id) {
			var button = document.createElement("button");
			button.setAttribute("id", id);
			var buttonText = document.createTextNode(buttonLabel);
			button.appendChild(buttonText);
			
			div.appendChild(button);
		}
		
		var menuDiv = document.createElement("div");
		appendButton(menuDiv, "Démarrer", "start");
		appendButton(menuDiv, "Pause", "pause");
		appendButton(menuDiv, "Stop", "stop");

		return menuDiv;
	}
	
	return {

		/**
		 * @return {element} Un element div contenant l'UI.
		 */
		buildDomElement: function() {
			var appUiContainer = document.createElement("div");
			appUiContainer.appendChild(buildTitle());
			appUiContainer.appendChild(buildCommandsDescription());
			appUiContainer.appendChild(buildChronoDisplay());
			appUiContainer.appendChild(buildButtonsMenu());
			
			return appUiContainer;
		}
	}
})();

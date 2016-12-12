// --------
// class Ui
// --------
// Ui est l'interface web à travers laquelle l'utilisateur intéragit avec le
// chrono. 
//
// NB
// Ui est manipulé aux travers des getters qui attaquent directement le DOM.
// Cette mécanique a été instaurée pour être assuré que les écouteurs
// d'évènements soient ajoutés. En effet, on a la garantie qu'ils sont ajoutés
// aux éléments présent dans le DOM, mais rien n'est sur pour les éléments
// créés dynamiquement et ajouté au DOM par la suite.
// Pour être sur que les écouteurs sont effectivement ajoutés après l'insertion
// dans le DOM, les écouteurs sont ajoutés dans un callback passé à la fonction
// qui insère dans le DOM et qui appelle le callback une fois l'insertion 
// effectuée.
chronoapp.Ui = (function() {
	
	// static
	// ------
	
	// TODO finir de gérer les ids pour pouvoir avoir plusieurs
	// instance de chrono tournant en même dans une même page.
	var _instanceId = 0;
	var _IdPrefix = "chrn_";
	var _ids = {
		START_BUTTON: "startbutton",
		PAUSE_BUTTON: "pausebutton",
		STOP_BUTTON: "stopbutton",
		MINUTES_FIELD: "minutesfields",
		SECONDES_FIELD: "secondesfields",
		MILLISECONDES_FIELD: "millisecondesfields"
	};
	
	// public
	// ------

	function Ui(appNodeId) {
		this._appContainerId = appNodeId;
		this._instanceId = _instanceId++;
	}
	
	// NB
	// Pour mettre l'interface dans son état initiale (état stop), on a
	// choisi de simuler un click plutôt... que de faire autre chose...
	Ui.prototype.init = function() {
		_getStopButton().click();
	};
	
	Ui.prototype.appendToDom = function(callback) {
		var appNode = document.getElementById(this._appContainerId);
		var appUi = buildDomElement(this);
		appendUi(appNode, appUi);
		callback();
	}
	
	Ui.prototype.switchToStopState = function() {
		_setMinutesField("00");
		_setSecondsField("00");
		_setMillisecondesField("00");
		_showStartButton(this);
		_hidePauseButton(this);
		_hideStopButton(this);
	};
	
	Ui.prototype.switchToStartState = function() {
		_hideStartButton(this);
		_showPauseButton(this);
		_showStopButton(this);
	}
	
	Ui.prototype.switchToPauseState = function() {
		_showStartButton(this);
		_hidePauseButton(this);
		_showStopButton(this);
	};
	
	Ui.prototype.update = function(minutes, seconds, milliseconds) {
		
		// Retourne le nombre passé en paramètre sous la forme d'une chaine
		// d'au moins deux caractères.
		// @num {int} num Le nombre dont on souhaite obtenir une représentation
		// sous la forme d'une chaine d'au moins deux caractères.
		function _twoDigits(num) {
			return (num < 10) ? ("0" + num) : ("" + num) 
		}
		
		_setMinutesField( _twoDigits(minutes));
		_setSecondsField(_twoDigits(seconds));
		_setMillisecondesField(_twoDigits(milliseconds));
	};

	Ui.prototype.setTrigger = function(name, handler) {
		// TODO supprimer la répétition du nom des actions
		// Répétée ici et dans le controlleur.
		if (name === "startchrono") {
			this.setStartChronoTrigger(handler);
		}
		else if (name === "pausechrono") {
			this.setPauseChronoTrigger(handler);
		}
		else if (name === "stopchrono") {
			this.setStopChronoTrigger(handler);
		}
		else {
			throw new Error("Ui..setTrigger - unknow action: " + name);
		}
	};
	
	Ui.prototype.setStartChronoTrigger = function(handler) {
		_getStartButton().addEventListener("click", handler);
	};
	
	Ui.prototype.setPauseChronoTrigger = function(handler) {
		_getPauseButton().addEventListener("click", handler);
	};
	
	Ui.prototype.setStopChronoTrigger = function(handler) {
		_getStopButton().addEventListener("click", handler);
	};	
	
	// private
	// -------
	
	function _getStartButton() {
		return document.getElementById(_ids.START_BUTTON);
	}
	
	function _getPauseButton() {
		return document.getElementById(_ids.PAUSE_BUTTON);
	}
	
	function _getStopButton() {
		return document.getElementById(_ids.STOP_BUTTON);
	}
	
	function _getMinutesField() {
		return document.getElementById(_ids.MINUTES_FIELD);
	}
	
	function _getSecondsField() {
		return document.getElementById(_ids.SECONDES_FIELD);
	}
	
	function _getMillisecondesField() {
		return document.getElementById(_ids.MILLISECONDES_FIELD);
	}
	
	function _setMinutesField(val) {
		_getMinutesField().innerHTML = val;
	}
	
	function _setSecondsField(val) {
		_getSecondsField().innerHTML = val;
	}
	
	function _setMillisecondesField(val) {
		_getMillisecondesField().innerHTML = val;
	}
	
	function _hideStartButton(self) {
		_getStartButton().style.display = "none";
	}
	
	function _hidePauseButton(self) {
		_getPauseButton().style.display = "none";
	}
	
	function _hideStopButton(self) {
		_getStopButton().style.display = "none";
	}
	
	function _showStartButton(self) {
		_getStartButton().style.display = "";
	}
	
	function _showPauseButton(self) {
		_getPauseButton().style.display = "";
	}
	
	function _showStopButton(self) {
		_getStopButton().style.display = "";
	}
	
	function showPauseAndStopButtons(self) {
		_getPauseButton().style.display = "";
		_getStopButton().style.display = "";
	}
	
	/**
	 * @return {element} Un element div contenant l'UI.
	 */
	function buildDomElement(self) {
		var appUiContainer = document.createElement("div");
		appUiContainer.appendChild(buildTitle());
		appUiContainer.appendChild(buildChronoDisplay(self));
		appUiContainer.appendChild(buildDescription());
		appUiContainer.appendChild(buildButtonsMenu(self));
		
		return appUiContainer;
	}
	
	function appendUi(appNode, appUiContainer) {
		appNode.innerHTML = appUiContainer.innerHTML;
	}
	
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
	
	function buildChronoDisplay(self) {
		var minutesField = _buildChronoField(_ids.MINUTES_FIELD);
		var secondsField = _buildChronoField(_ids.SECONDES_FIELD);
		var milliseconds = _buildChronoField(_ids.MILLISECONDES_FIELD);
		
		var chronoDiv = document.createElement("div");
		chronoDiv.style.fontSize = "4em";
		chronoDiv.appendChild(minutesField);
		chronoDiv.appendChild(document.createTextNode(":"));
		chronoDiv.appendChild(secondsField);
		chronoDiv.appendChild(document.createTextNode(":"));
		chronoDiv.appendChild(milliseconds);
		
		return chronoDiv;
	}
	
	function _buildChronoField(id) {
		var chronoField = document.createElement("span");
		chronoField.setAttribute("id", id);
		chronoField.innerHTML = "00";
		
		return chronoField;
	}
	
	function _buildMenuButton(id, color, label, sublabel) {
		
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
		
		return button;
	}
	
	function buildButtonsMenu(self) {
		var startButton = _buildMenuButton(_ids.START_BUTTON, "#4CAF50", "Démarrer", "\"Entrer\" ou \"d\""); // vert;
		var pauseButton = _buildMenuButton(_ids.PAUSE_BUTTON, "#FFA500", "Pause", "\"Espace\" ou \"p\""); // orange;
		var stopButton = _buildMenuButton(_ids.STOP_BUTTON, "#f44336", "Stop", "\"Suppr\" ou \"Retour arrière\""); // rouge;
		
		var buttonsContainer = document.createElement("div");
		buttonsContainer.appendChild(startButton);
		buttonsContainer.appendChild(pauseButton);
		buttonsContainer.appendChild(stopButton);
		
		var menuDiv = document.createElement("div");
		menuDiv.appendChild(buttonsContainer);

		return menuDiv;
	}
	
	return Ui;
})();

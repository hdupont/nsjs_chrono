// --------
// class Ui
// --------
// Ui est l'interface web à travers laquelle l'utilisateur intéragit avec le
// chrono. 
chronoapp.Ui = (function() {
	
	// public
	// ------

	function Ui() {
		this._actionsMenu = buildActionsMenu(self);
		this._startButton = _buildActionButton("#4CAF50", "Démarrer", "\"Entrer\" ou \"d\""); // vert;
		this._pauseButton = _buildActionButton("#FFA500", "Pause", "\"Espace\" ou \"p\""); // orange;
		this._stopButton = _buildActionButton("#f44336", "Stop", "\"Suppr\" ou \"Retour arrière\""); // rouge;
		
		this._minutesField = _buildChronoField();
		this._secondsField = _buildChronoField();
		this._milliseconds = _buildChronoField();
	}
	
	// NB
	// Pour mettre l'interface dans son état initiale (état stop), on a
	// choisi de simuler un click plutôt... que de faire autre chose...
	Ui.prototype.init = function() {
		// On met l'UI dans son état initial.
		this._stopButton.click();
	};
	
	Ui.prototype.appendToDom = function(appNodeId) {
		var appNode = document.getElementById(appNodeId);
		var appUi = buildDomElement(this);
		appNode.appendChild(appUi);
	}
	
	Ui.prototype.switchToStopState = function() {
		this._minutesField.innerHTML = "00";
		this._secondsField.innerHTML = "00";
		this._milliseconds.innerHTML = "00";
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
		
		this._minutesField.innerHTML = _twoDigits(minutes);
		this._secondsField.innerHTML = _twoDigits(seconds);
		this._milliseconds.innerHTML = _twoDigits(milliseconds);
	};

	Ui.prototype.setTrigger = function(name, handler) {
		var actionButton = null;
		// TODO supprimer la répétition du nom des actions
		// Répétée ici et dans le controlleur.
		if (name === "startchrono") {
			actionButton = this._startButton;
		}
		else if (name === "pausechrono") {
			actionButton = this._pauseButton;
		}
		else if (name === "stopchrono") {
			actionButton = this._stopButton;
		}
		else {
			throw new Error("Ui..setTrigger - unknow action: " + name);
		}
		actionButton.addEventListener("click", handler);
		this._actionsMenu.appendChild(actionButton);
	};	
	
	// private
	// -------
			
	function _hideStartButton(self) {
		self._startButton.style.display = "none";
	}
	
	function _hidePauseButton(self) {
		self._pauseButton.style.display = "none";
	}
	
	function _hideStopButton(self) {
		self._stopButton.style.display = "none";
	}
	
	function _showStartButton(self) {
		self._startButton.style.display = "";
	}
	
	function _showPauseButton(self) {
		self._pauseButton.style.display = "";
	}
	
	function _showStopButton(self) {
		self._stopButton.style.display = "";
	}
	
	function showPauseAndStopButtons(self) {
		self._pauseButton.style.display = "";
		self._stopButton.style.display = "";
	}
	
	/**
	 * @return {element} Un element div contenant l'UI.
	 */
	function buildDomElement(self) {
		var appUiContainer = document.createElement("div");
		appUiContainer.appendChild(buildTitle());
		appUiContainer.appendChild(buildChronoDisplay(self));
		appUiContainer.appendChild(buildDescription());
		appUiContainer.appendChild(self._actionsMenu);
		
		return appUiContainer;
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
		var chronoDiv = document.createElement("div");
		chronoDiv.style.fontSize = "4em";
		chronoDiv.appendChild(self._minutesField);
		chronoDiv.appendChild(document.createTextNode(":"));
		chronoDiv.appendChild(self._secondsField);
		chronoDiv.appendChild(document.createTextNode(":"));
		chronoDiv.appendChild(self._milliseconds);
		
		return chronoDiv;
	}
	
	function _buildChronoField(id) {
		var chronoField = document.createElement("span");
		chronoField.setAttribute("id", id);
		chronoField.innerHTML = "00";
		
		return chronoField;
	}
	
	function _buildActionButton(color, label, sublabel) {
		
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
	
	function buildActionsMenu(self) {
		var menuDiv = document.createElement("div");
		menuDiv.setAttribute("kind", "actionmenu");
		return menuDiv;
	}
	
	return Ui;
})();

/**
 * --------
 * @class ActionMenu
 * --------
 * Un ActionMenu est une partie de l'interface contenant les boutons qui
 * permettent d'effectuer des actions sur le chrono.
 */
chronoapp.ActionMenu = (function() {
	
	// public
	// ------

	/**
	 * Construit une interface utilisateur.
	 * @property {HTMLElement} _actionsMenu La partie de l'interface contenant les
	 * boutons pouvant déclencher une actions sur le chrono.
	 * 
	 * @property {HTMLElement} _startButton Le bouton qui (re-)démarre le chrono.
	 * @property {HTMLElement} _startButton Le bouton qui met en pause le chrono.
	 * @property {HTMLElement} _stopButton Le bouton qui arrête le chrono.
	 */
	function ActionMenu() {
		this._startButton = _buildActionButton("#4CAF50", "Démarrer", "\"Entrer\" ou \"d\""); // vert;
		this._pauseButton = _buildActionButton("#FFA500", "Pause", "\"Espace\" ou \"p\""); // orange;
		this._stopButton = _buildActionButton("#f44336", "Stop", "\"Suppr\" ou \"Retour arrière\""); // rouge;
	}
	
	/**
	 * Met l'interface dans son état initiale: l'état STOP.
	 * NOTE Pour mettre l'interface dans son état initiale (état stop), on a
	 * choisi de simuler un click.
	 */
	ActionMenu.prototype.init = function() {
		// On met l'UI dans son état initial.
		this._stopButton.click();
	};
	
	ActionMenu.prototype.buildDomNode = function() {
		return _buildActionsMenu(this);
	};
	
	/**
	 * Passe l'interface dans l'état STOP: chrono arrêté.
	 */
	ActionMenu.prototype.switchToStopState = function() {
		_showStartButton(this);
		_hidePauseButton(this);
		_hideStopButton(this);
	};
	
	/**
	 * Passe l'interface dans l'état START: chrono démarré.
	 */
	ActionMenu.prototype.switchToStartState = function() {
		_hideStartButton(this);
		_showPauseButton(this);
		_showStopButton(this);
	}
	
	/**
	 * Passe l'interface dans l'état PAUSE: chrono en pause.
	 */
	ActionMenu.prototype.switchToPauseState = function() {
		_showStartButton(this);
		_hidePauseButton(this);
		_showStopButton(this);
	};

	/**
	 * Ajoute à l'éléments de l'UI pouvant déclencher sur le chrono l'action
	 * dont le nom est passé en paramètre le handler correspondant.
	 * passé en paramètre.
	 * @param {string} actionName Le nom d'une action.
	 * @param {function} actionHandler Le handler correspondant à cette action.
	 */
	ActionMenu.prototype.initActionTrigger = function(actionName, actionHandler) {
		var actionButton = null;
		// TODO supprimer la répétition du nom des actions
		// Répétée ici et dans le controlleur.
		if (actionName === "startchrono") {
			actionButton = this._startButton;
		}
		else if (actionName === "pausechrono") {
			actionButton = this._pauseButton;
		}
		else if (actionName === "stopchrono") {
			actionButton = this._stopButton;
		}
		else {
			throw new Error("Ui..setTrigger - unknow action: " + name);
		}
		actionButton.addEventListener("click", actionHandler);
		this._actionsMenu.appendChild(actionButton);
	};	
	
	// private
	// -------
		
	/**
	 * Cache le bouton START.
	 */
	function _hideStartButton(self) {
		self._startButton.style.display = "none";
	}
	
	/**
	 * Cache le bouton PAUSE.
	 */
	function _hidePauseButton(self) {
		self._pauseButton.style.display = "none";
	}
	
	/**
	 * Cache le bouton STOP.
	 */
	function _hideStopButton(self) {
		self._stopButton.style.display = "none";
	}
	
	/**
	 * Affiche le bouton START.
	 */
	function _showStartButton(self) {
		self._startButton.style.display = "";
	}
	
	/**
	 * Affiche le bouton PAUSE.
	 */
	function _showPauseButton(self) {
		self._pauseButton.style.display = "";
	}
	
	/**
	 * Affiche le bouton STOP.
	 */
	function _showStopButton(self) {
		self._stopButton.style.display = "";
	}
	
	/**
	 * Affiche les boutons PAUSE ET STOP.
	 */
	function showPauseAndStopButtons(self) {
		_showPauseButton(self);
		_showStopButton(self);
	}
		
	/**
	 * Construit un bouton pouvant déclencher une action sur le chrono.
	 * @param {object} self L'interface utilisateur. 
	 */
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
	
	/**
	 * Construit la partie de l'interface destinée à accueillir les un bouton
	 *  pouvant déclencher une action sur le chrono.
	 * @param {object} self L'interface utilisateur. 
	 */
	function _buildActionsMenu(self) {
		var menuDiv = document.createElement("div");
		menuDiv.setAttribute("kind", "actionmenu");
		return menuDiv;
	}
	
	return ActionMenu;
})();

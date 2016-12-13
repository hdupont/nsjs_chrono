/**
 * --------
 * @class ActionsMenu
 * --------
 * Un ActionsMenu est une partie de l'interface contenant les boutons qui
 * permettent d'effectuer des actions sur le chrono.
 */
chronoapp.ActionsMenu = (function() {
	
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
	function ActionsMenu() {
		this._actionMenu =  _buildActionsMenu();
		this._startButton = _buildActionButton("#4CAF50", "Démarrer", "\"Entrer\" ou \"d\""); // vert;
		this._pauseButton = _buildActionButton("#FFA500", "Pause", "\"Espace\" ou \"p\""); // orange;
		this._stopButton = _buildActionButton("#f44336", "Stop", "\"Suppr\" ou \"Retour arrière\""); // rouge;
	}
	
	ActionsMenu.prototype.initStartAction = function(actionHandler) {
		this._startButton.addEventListener("click", actionHandler);
		this._actionMenu.appendChild(this._startButton);
	}
	
	ActionsMenu.prototype.initPauseAction = function(actionHandler) {
		this._pauseButton.addEventListener("click", actionHandler);
		this._actionMenu.appendChild(this._pauseButton);
	}
	
	ActionsMenu.prototype.initStopAction = function(actionHandler) {
		this._stopButton.addEventListener("click", actionHandler);
		this._actionMenu.appendChild(this._stopButton);
	}
	
	/**
	 * Met l'interface dans son état initiale: l'état STOP.
	 * NOTE Pour mettre l'interface dans son état initiale (état stop), on a
	 * choisi de simuler un click.
	 */
	ActionsMenu.prototype.init = function() {
		// On met l'UI dans son état initial.
		this._stopButton.click();
	};
	
	ActionsMenu.prototype.buildDomNode = function() {
		return this._actionMenu;
	};
	
	/**
	 * Passe l'interface dans l'état STOP: chrono arrêté.
	 */
	ActionsMenu.prototype.switchToStopState = function() {
		_showStartButton(this);
		_hidePauseButton(this);
		_hideStopButton(this);
	};
	
	/**
	 * Passe l'interface dans l'état START: chrono démarré.
	 */
	ActionsMenu.prototype.switchToStartState = function() {
		_hideStartButton(this);
		_showPauseButton(this);
		_showStopButton(this);
	}
	
	/**
	 * Passe l'interface dans l'état PAUSE: chrono en pause.
	 */
	ActionsMenu.prototype.switchToPauseState = function() {
		_showStartButton(this);
		_hidePauseButton(this);
		_showStopButton(this);
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
	function _buildActionsMenu() {
		var menuDiv = document.createElement("div");
		menuDiv.setAttribute("kind", "actionmenu");
		return menuDiv;
	}
	
	return ActionsMenu;
})();

/**
 * --------
 * @class Ui
 * --------
 * Une Ui est une interface web qui permet à l'utilisateur
 * 1. d'agir sur le chrono
 * 2. de voir le temps affiché par le chrono 
 */
chronoapp.Ui = (function(TimeView) {
	
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
	 * @property {HTMLElement} _minutesField La partie de l'interface qui affiche
	 * les minutes indiquées par le chrono.
	 * @property {HTMLElement} _secondsField La partie de l'interface qui affiche
	 * les secondes indiquées par le chrono.
	 * @property {HTMLElement} _secondsField La partie de l'interface qui affiche
	 * les millisecondes indiquées par le chrono.
	 */
	function Ui() {
		this._actionsMenu = _buildActionsMenu(self);
		this._startButton = _buildActionButton("#4CAF50", "Démarrer", "\"Entrer\" ou \"d\""); // vert;
		this._pauseButton = _buildActionButton("#FFA500", "Pause", "\"Espace\" ou \"p\""); // orange;
		this._stopButton = _buildActionButton("#f44336", "Stop", "\"Suppr\" ou \"Retour arrière\""); // rouge;
		
		this._bigTimeView = new TimeView("4em");
		this._smallTimeView = new TimeView("2em");
		this._timeViews = [this._smallTimeView, this._bigTimeView];
	}
	
	/**
	 * Met l'interface dans son état initiale: l'état STOP.
	 * NOTE Pour mettre l'interface dans son état initiale (état stop), on a
	 * choisi de simuler un click.
	 */
	Ui.prototype.init = function() {
		// On met l'UI dans son état initial.
		this._stopButton.click();
	};
	
	/**
	 * Ajoute l'interface au noeud du DOM dont l'id est passée en
	 * paramètre.
	 * @param {string} appNodeId L'id du noeud auquel on doit ajouter
	 * l'interface.
	 */
	Ui.prototype.appendToDom = function(appNodeId) {
		var appNode = document.getElementById(appNodeId);
		var appUi = _buildDomElement(this);
		appNode.appendChild(appUi);
	}
	
	/**
	 * Passe l'interface dans l'état STOP: chrono arrêté.
	 */
	Ui.prototype.switchToStopState = function() {
		this._timeViews.forEach(function(timeView) {
			timeView.switchToStopState();
		})
		_showStartButton(this);
		_hidePauseButton(this);
		_hideStopButton(this);
	};
	
	/**
	 * Passe l'interface dans l'état START: chrono démarré.
	 */
	Ui.prototype.switchToStartState = function() {
		_hideStartButton(this);
		_showPauseButton(this);
		_showStopButton(this);
	}
	
	/**
	 * Passe l'interface dans l'état PAUSE: chrono en pause.
	 */
	Ui.prototype.switchToPauseState = function() {
		_showStartButton(this);
		_hidePauseButton(this);
		_showStopButton(this);
	};
	
	/**
	 * Met l'interface à jour avec les données passées en paramètres, données
	 * qui correspondent à l'état du chrono.
	 * @param {int} minutes Le nombre de minutes indiquées par le chrono.
	 * @param {int} seconds Le nombre de secondes indiquées par le chrono.
	 * @param {int} milliseconds Le nombre de millisecondes indiquées par le
	 * chrono.
	 */
	Ui.prototype.update = function(minutes, seconds, milliseconds) {
		this._timeViews.forEach(function(timeView) {
			timeView.update(minutes, seconds, milliseconds);
		})
	};

	/**
	 * Ajoute à l'éléments de l'UI pouvant déclencher sur le chrono l'action
	 * dont le nom est passé en paramètre le handler correspondant.
	 * passé en paramètre.
	 * @param {string} actionName Le nom d'une action.
	 * @param {function} actionHandler Le handler correspondant à cette action.
	 */
	Ui.prototype.initActionTrigger = function(actionName, actionHandler) {
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
	 * @return {element} Un element div contenant l'UI.
	 */
	function _buildDomElement(self) {
		var appUiContainer = document.createElement("div");
		self._timeViews.forEach(function(timeView) {
			appUiContainer.appendChild(timeView.buildDomNode());
		})
		
		appUiContainer.appendChild(self._actionsMenu);
		
		return appUiContainer;
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
	
	return Ui;
})(chronoapp.TimeView);

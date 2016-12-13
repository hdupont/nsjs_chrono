/**
 * --------
 * @class Ui
 * --------
 * Une Ui est une interface web qui permet à l'utilisateur
 * 1. d'agir sur le chrono
 * 2. de voir le temps affiché par le chrono 
 */
chronoapp.Ui = (function() {
	
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
		
		this._minutesField = _buildChronoField();
		this._secondsField = _buildChronoField();
		this._milliseconds = _buildChronoField();
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
		this._minutesField.innerHTML = "00";
		this._secondsField.innerHTML = "00";
		this._milliseconds.innerHTML = "00";
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
		
		/**
		 * Retourne le nombre passé en paramètre sous la forme d'une chaine
		 * d'au moins deux caractères.
		 * @num {int} num Le nombre dont on souhaite obtenir une représentation
		 * sous la forme d'une chaine d'au moins deux caractères.
		 */
		function _twoDigits(num) {
			return (num < 10) ? ("0" + num) : ("" + num) 
		}
		
		this._minutesField.innerHTML = _twoDigits(minutes);
		this._secondsField.innerHTML = _twoDigits(seconds);
		this._milliseconds.innerHTML = _twoDigits(milliseconds);
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
		appUiContainer.appendChild(_buildChronoDisplay(self));
		appUiContainer.appendChild(self._actionsMenu);
		
		return appUiContainer;
	}
	
	/**
	 * Construit la partie de l'interface qui affiche l'état du chrono
	 * sous la forme : xx:yy:zz
	 * @param {object} self L'interface utilisateur.
	 */
	function _buildChronoDisplay(self) {
		var chronoDiv = document.createElement("div");
		chronoDiv.style.fontSize = "4em";
		chronoDiv.appendChild(self._minutesField);
		chronoDiv.appendChild(document.createTextNode(":"));
		chronoDiv.appendChild(self._secondsField);
		chronoDiv.appendChild(document.createTextNode(":"));
		chronoDiv.appendChild(self._milliseconds);
		
		return chronoDiv;
	}
	
	/**
	 * Construit un élément d'interface qui affiche une durée (minutes,
	 * secondes ou millisecondes)
	 * NOTE Les éléments construits par _buildChronoField() seront composés par 
	 * _buildChronoDisplay() pour afficher l'état du chrono.
	 */
	function _buildChronoField() {
		var chronoField = document.createElement("span");
		chronoField.innerHTML = "00";
		
		return chronoField;
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
})();

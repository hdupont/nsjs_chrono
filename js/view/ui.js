/**
 * --------
 * @class Ui
 * --------
 * Une Ui est une interface web qui permet à l'utilisateur
 * 1. d'agir sur le chrono via un menu d'action
 * 2. de voir le temps affiché par le chrono via un ensemble de vues.
 */
chronoapp.Ui = (function(ActionMenu, TimeView) {
	
	// public
	// ------

	/**
	 * Construit une interface utilisateur.
	 * @property {HTMLElement} _actionsMenu La partie de l'interface contenant les
	 * boutons pouvant déclencher une actions sur le chrono.
	 * 
	 * @property {object} _actionMenu Le menu contenant les actions pouvant
	 * être effectuée par l'utilisateur.
	 * @property {array} _timeViews Les parties de l'interface qui
	 * affichent le temps indiqué par le chrono.
	 */
	function Ui() {
		this._actionMenu = new ActionMenu();
		this._timeViews = [new TimeView("2em"), new TimeView("4em")];
	}
	
	/**
	 * Met l'interface dans son état initiale: l'état STOP.
	 * NOTE Pour mettre l'interface dans son état initiale (état stop), on a
	 * choisi de simuler un click.
	 */
	Ui.prototype.init = function() {
		// On met l'UI dans son état initial.
		this._actionMenu.switchToStopState();
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
		});
		this._actionMenu.switchToStopState();
	};
	
	/**
	 * Passe l'interface dans l'état START: chrono démarré.
	 */
	Ui.prototype.switchToStartState = function() {
		this._actionMenu.switchToStartState();
	}
	
	/**
	 * Passe l'interface dans l'état PAUSE: chrono en pause.
	 */
	Ui.prototype.switchToPauseState = function() {
		this._actionMenu.switchToPauseState();
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
			this._actionMenu.initStartAction(actionHandler);
		}
		else if (actionName === "pausechrono") {
			this._actionMenu.initPauseAction(actionHandler);
		}
		else if (actionName === "stopchrono") {
			this._actionMenu.initStopAction(actionHandler);
		}
		else {
			throw new Error("Ui..setTrigger - unknow action: " + name);
		}
	};	
	
	// private
	// -------
	
	/**
	 * @return {element} Un element div contenant l'UI.
	 */
	function _buildDomElement(self) {
		var appUiContainer = document.createElement("div");
		self._timeViews.forEach(function(timeView) {
			appUiContainer.appendChild(timeView.buildDomNode());
		})
		
		appUiContainer.appendChild(self._actionMenu.buildDomNode());
		
		return appUiContainer;
	}
	
	return Ui;
})(chronoapp.ActionMenu, chronoapp.TimeView);

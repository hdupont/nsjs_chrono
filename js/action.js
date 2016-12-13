/**
 * -------------
 * @class Action
 * -------------
 * Une Action est une action pouvant être effectuée sur le chrono.
 */
chronoapp.Action = (function() {
	
	// public
	// ------

	/**
	 * Construit une action pouvant être effectuée sur le chrono.
	 * @property {string} _name Le nom de l'action.
	 * @property {string} _handler Le traitement correspondant à l'action.
	 * @property {string} _onAction Le traitement inscrit pour être effectué à
	 * la suite de l'action.
	 * @property {object} _onActionContext L'objet qui sert de contexte à
	 * l'exécution de onAction();.
	 * NOTE _onActionContext est valorisé dans Actions lors l'ajout à la liste
	 * des actions. 
	 */
	function Action(name, handler, onAction, keys) {	
		this._name = name;
		this._handler = handler;
		this._onAction = onAction;
		this._keys = keys;
		this._onActionContext = null;
	}

	/**
	 * Valorise _onActionContext
	 * @param {object} onActionContext L'objet qui servira de contexte à
	 * l'exécution de onAction();
	 */
	Action.prototype.setOnActionContext = function(onActionContext) {
		this._onActionContext = onActionContext;
	};
	
	/**
	 * Retourne le nom de l'action.
	 * @returns {string} Le nom de l'action.
	 */
	Action.prototype.getName = function() {
		return this._name;
	};
	
	/**
	 * Retourne les touches claviers pouvant déclencer l'action.
	 * @returns {array} La liste des touches pouvant déclencher l'action.
	 */
	Action.prototype.getKeys = function() {
		return this._keys;
	};
	
	/**
	 * Exécute l'action puis exécute _onAction(). 
	 */
	Action.prototype.execute = function() {
		if (this._onActionContext === null || typeof this._onActionContext === "undefined") {
			throw new Error("Action..execute - no context");
		}
		this._handler();
		this._onAction(this._onActionContext);
	};
	
	return Action;
})();

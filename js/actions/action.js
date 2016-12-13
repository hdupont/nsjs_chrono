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
	 * NOTE _onAction s'exécute dans un contexte défini dans la liste (Actions.js).
	 * des actions. 
	 */
	function Action(name, handler, onAction, keys) {	
		this._name = name;
		this._handler = handler;
		this._onAction = onAction;
		this._keys = keys;
	}
	
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
		this._handler();
		this._onAction();
	};
	
	return Action;
})();

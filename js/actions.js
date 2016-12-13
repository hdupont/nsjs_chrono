/**
 * --------------
 * @class Actions
 * --------------
 * Une Actions est une liste d'actions pouvant être effectuées sur le chrono.
 */
chronoapp.Actions = (function() {
	
	// public
	// ------

	/**
	 * Construit une liste d'actions pouvant être effectuées sur le chrono.
	 * @property {string} _chrono Le chrono sur lequel seront effectuées les
	 * actions.
	 */
	function Actions(chrono, actionContext) {	
		this._chrono = chrono;
		this._actionContext = actionContext;
		this._actions = [];
	}

	Actions.prototype.addAction = function(action) {
		return this._actions.push(action);
	};
	
	Actions.prototype.execute = function(context) {
		var self = this;
		this._actions.forEach(function(action) {
			action.execute(this._chrono, this._actionContext);
		});
	};
	
	/**
	 * Applique la fonction sur toutes les actions.
	 */
	Actions.prototype.each = function(fun) {
		this._actions.forEach(function(action) {
			fun(action);
		});
	};
	
	return Actions;
})();

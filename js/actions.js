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
	function Actions(chrono, actionsContext) {	
		this._chrono = chrono;
		this._actionsContext = actionsContext;
		this._actions = [];
	}

	Actions.prototype.addAction = function(action) {
		action.setContext(this._actionsContext);
		return this._actions.push(action);
	};
	
	Actions.prototype.execute = function() {
		var self = this;
		this._actions.forEach(function(action) {
			action.execute(thselfis._chrono, self._actionContext);
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

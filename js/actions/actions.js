/**
 * --------------
 * @class Actions
 * --------------
 * Une Actions est une liste d'actions pouvant être effectuées sur un chrono.
 */
chronoapp.Actions = (function(Action) {
	
	// static private
	// --------------

	/**
	 * Les touches qui permettent d'effectuer une action sur le chrono.
	 * NOTE En keydown les codes correspondent majuscules.
	 * TODO mettre ça dans le keyboardtk.
	 */
	var _keyCode = {
		"enter": 13,
		"D": 68,
		"space": 32,
		"P": 80,
		"K": 75,
		"del": 46,
		"backspace": 8
	};
	
	// public
	// ------

	/**
	 * Construit une liste d'actions pouvant être effectuées sur le chrono.
	 * @property {object} _chrono Le chrono sur lequel seront effectuées les
	 * actions.
	 * @property {object} _actionsContext le contexte dans lequel sera exécuté
	 * le onAction des actions de la liste.
	 * NOTE Tous les _onActions des actions s'exécute dans le même contexte: 
	 * onActionContext.
	 * @property {array} _actions La liste des actions pouvant être effectuées
	 * sur _chrono.
	 */
	function Actions(chrono, onActionContext) {	
		this._chrono = chrono;
		this._onActionContext = onActionContext;
		this._actions = [];
		
		this.addAction(new Action(
				"startchrono",
				function action() {
					chrono.start();		
				},
				function onAction(context) {
					onActionContext.switchToStartState();		
				}, 
				[_keyCode.enter, _keyCode.D]
			)
		);
		this.addAction(new Action(
				"pausechrono",
				function action() {
					chrono.pause();
				},
				function onAction(context) {
					onActionContext.switchToPauseState();
				},
				[_keyCode.space, _keyCode.P]
			)
		);
		this.addAction(new Action(
				"stopchrono",
				function action() {
					chrono.stop();
				},
				function onAction(context) {
					onActionContext.switchToStopState();
				},
				[_keyCode.K, _keyCode.del, _keyCode.backspace]
			)
		);
	}

	/**
	 * Ajoute une action à la liste.
	 * @param {object} action L'action à ajouter à la liste.
	 */
	Actions.prototype.addAction = function(action) {
//		action.setOnActionContext(this._onActionContext);
		return this._actions.push(action);
	};
	
	/**
	 * Effectue un traitement sur toutes les actions.
	 * @param {function} fun Le traitement à appliquer sur toutes les actions
	 * de la liste.
	 */
	Actions.prototype.each = function(fun) {
		this._actions.forEach(function(action) {
			fun(action);
		});
	};
	
	return Actions;
})(chronoapp.Action);

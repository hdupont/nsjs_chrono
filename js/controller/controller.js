/**
 * ----------------------
 * @class ChronoController
 * ----------------------
 * ChronoController fait fait le lien entre le chrono et l'interface
 * utilisateur.
 * Il est prévenu des changements d'états car il a souscrit un abonnement au
 * modification du chrono (cf. chrono.addOnChangeListener).
 * Il est prévenu des actions utilistateurs au travers des déclencheurs
 * d'actions qu'il attache à l'interface utilisateur.
 * Le controlleur gère le clavier et l'interface DOM.
 * NOTE On sépare conceptuellemenet le clavier de l'interface DOM, bien
 * que les signaux du clavier nous arrive par le DOM.
 */
chronoapp.ChronoController = (function() {
	
	// static
	// ------

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
	
	/**
	 * Les actions pouvant être effectuée sur le chrono.
	 */
	var _actions = [
		// Démarre le chrono
		{
			name: "startchrono",
			handler: function(self) {
				self._chrono.start();
				self._ui.switchToStartState();		
			},
			keyTriggers: [_keyCode.enter, _keyCode.D]
		},
		// Met le chrono en pause.
		{
			name:"pausechrono",
			handler: function(self) {
				self._chrono.pause();
				self._ui.switchToPauseState();
			},
			keyTriggers: [_keyCode.space, _keyCode.P]
		},
		// Arrête le chrono.
		{
			name: "stopchrono",
			handler: function stopChrono(self) {
				self._chrono.stop();
				self._ui.switchToStopState();
			},
			keyTriggers: [_keyCode.K, _keyCode.del, _keyCode.backspace]
		}
	];
	
	// public
	// ------
	
	/**
	 * ChronoController
	 * 1. Construit un ChronoController
	 * 2. Abonne le controlleur au changement d'état du chrono passé en
	 * paramètre.
	 * 3. Initialise l'interface.
	 * 4. Ajoute l'interface au DOM.
	 * 
	 * @param {object} chrono Le chrono mis à disposition de l'utilisateur.
	 * @param {object} ui L'interface qui affiche le chrono et les actions
	 * permettant à l'utilisateur d'agir sur le chrono.
	 * 
	 * @property {object} _chrono
	 * @property {object} _ui 
	 */
	function ChronoController(chrono, ui) {		
		this._chrono = chrono;
		this._ui = ui;
		
		// On abonne le controlleur à l'écoute des changement d'état du chrono.
		// NOTE On place l'appelle dans une fonction anonyme pour conserver le
		// bon contexte à l'exécution.
		var self = this;
		chrono.addOnChangeListener(function(minutes, secondes, millisecondes) {
			self.update(minutes, secondes, millisecondes);
		});
		
		// On initialise les éléments de l'UI pouvant déclencher une action sur
		// le chrono.
		_actions.forEach(function(action) {
			_initUiActionTrigger(self, action);
		});

		// On initialise l'interface utilisateur.
		ui.init();
		
		// On ajoute l'interface utilisateur au DOM.
		ui.appendToDom("chrnapp")
	}
	
	/**
	 * Met à jour l'interface utilisateur à chaque changement d'état du chrono.
	 * @param {int} minutes Le nombre de minutes indiquées par le chrono.
	 * @param {int} seconds Le nombre de secondes indiquées par le chrono.
	 * @param {int} milliseconds Le nombre de millisecondes indiquées par le chrono.
	 */
	ChronoController.prototype.update = function(minutes, seconds, milliseconds) {
		this._ui.update(minutes, seconds, milliseconds);
	};
	
	// private
	// -------

	//  
	/**
	 * Initialise les éléments de l'UI pouvant déclencher sur le chrono 
	 * l'action passée en paramètre.
	 * @param {object} self Ce controlleur.
	 * @param {object} action Une action pouvant être effectuée sur le chrono.
	 */
	function _initUiActionTrigger(self, action) {
		
		// Initialise les touches pouvant déclencher sur le chrono l'action
		// passée passée en paramètre à la fonction appelante.
		function addKeysListenerToBody(actionKeys, actionHandler) {
			document.body.addEventListener("keydown", function(event) {
				if (actionKeys.indexOf(event.keyCode) !== -1) {
					actionHandler();
				}
			});
		}
		
		var actionHandler = function() {
			action.handler(self);
		};
		self._ui.initActionTrigger(action.name, actionHandler);
		addKeysListenerToBody(action.keyTriggers, actionHandler);
	}
	
	return ChronoController;
})();

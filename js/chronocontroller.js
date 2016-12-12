// ----------------------
// class ChronoController
// ----------------------
// ChronoController fait fait le lien entre le chrono et l'interface utilisateur.
// Il est prévenu des changements d'états parce qu'il est à l'écoute de ces
// changement suite à son inscription avec chrono.addOnChangeListener.
// Il est prévenu des actions utilistateurs via les écouteurs attachés à
// l'interface utilisateur.
// Le controlleur gère le clavier et l'interface DOM.
// NOTE On sépare conceptuellemenet le clavier de l'interface DOM, bien
// que les signaux du clavier nous arrive par le DOM.
chronoapp.ChronoController = (function() {
	
	// static
	// ------
	
	// TODO mettre ça dans le keyboardtk.
	// NB. En keydown les codes correspondent aux lettres majuscules.
	var _keyCode = {
		"enter": 13,
		"D": 68,
		"space": 32,
		"P": 80,
		"K": 75,
		"del": 46,
		"backspace": 8
	};
	
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
	
	function ChronoController(chrono, ui) {		
		this._chrono = chrono;
		this._ui = ui;
		
		// Inscription du controlleur à l'écoute des changements d'états du
		// chrono.
		// NOTE On place l'appelle dans une fonction anonyme pour conserver le 
		// bon contexte à l'exécution.
		var self = this;
		chrono.addOnChangeListener(function(minutes, secondes, millisecondes) {
			self.update(minutes, secondes, millisecondes);
		});
		
		// Mise en place des "déclencheurs" d'évènements chrono et
		_actions.forEach(function(actn) {
			var handler = function() {
				actn.handler(self);
			};
			_addTrigger(self, actn.name, handler, actn.keyTriggers)
		});

		// Initialisation de l'interface utilisateur.
		ui.init();
		
		// Ajout de l'interface utilisateur au DOM
		ui.appendToDom("chrnapp")
	}
	
	/**
	 * Mes à jour l'interface utilisateur à chaque changement d'état du chrono
	 * @param {int} minutes Le nombre de minutes indiquées par le chrono.
	 * @param {int} seconds Le nombre de secondes indiquées par le chrono.
	 * @param {int} milliseconds Le nombre de millisecondes indiquées par le chrono.
	 */
	ChronoController.prototype.update = function(minutes, seconds, milliseconds) {
		this._ui.update(minutes, seconds, milliseconds);
	};
	
	// private
	// -------

	// Ajoute les déclencheurs des actions sur le chrono.
	function _addTrigger(self, actionName, actionHandler, actionsKeys) {
		self._ui.setTrigger(actionName, actionHandler);
		_addKeysListenerToBody(actionsKeys, actionHandler);
	}

	function _addKeysListenerToBody(keys, listerner) {
		document.body.addEventListener("keydown", function(event) {
			if (keys.indexOf(event.keyCode) !== -1) {
				listerner();
			}
		});
	}
	
	return ChronoController;
})();

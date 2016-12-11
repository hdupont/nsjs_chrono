// ----------------------
// class ChronoController
// ----------------------
// ChronoController fait fait le lien entre le chrono et l'interface utilisateur.
// Il est prévenu des changements d'états parce qu'il est à l'écoute de ces
// changement suite à son inscription avec chrono.addOnChangeListener.
// Il est prévenu des actions utilistateurs via les écouteurs attachés à
// l'interface utilisateur.
chronoapp.ChronoController = (function() {
	
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
		// initialisation de l'interface utilisateur.
		// NOTE Les évènements chrono sont: démarrer, mettre en pause et
		// arrêter le chrono.
		// NOTE L'ajout des écouteurs se fait dans un callback pour les raisons
		// évoquées dans la doc de chronoui.
		var self = this;
		ui.appendToDom(function() {
			_addStartTriggers(self); // évènement: démarrer le chrono
			_addPauseTriggers(self); // évènement: mettre en pause le chrono
			_addStopTriggers(self);  // évènement: arrêter le chrono
			ui.init();
		})
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

	function _addTrigger(self, chronoEvt, uiTrigger, keysTrigger) {
		uiTrigger("click", chronoEvt);
		_addKeysListenerToBody(keysTrigger, chronoEvt);
	}
	
	// Ajoute les déclencheurs de l'évènement: (re-)démarrer le chrono.
	function _addStartTriggers(self) {
		
		// Démarre le chrono
		function startChrono() {
			self._chrono.start();
			self._ui.switchToStartState();		
		}
		
		// Trigger DOM
		self._ui.setStartChronoTrigger(startChrono);
		
		// Triggers clavier
		var _startKeys = [_keyCode.enter, _keyCode.D];
		_addKeysListenerToBody(_startKeys, startChrono);
	}
	
	// Ajoute les déclencheurs de l'évènement: mise en pause du chrono.
	function _addPauseTriggers(self) {
		
		// Met le chrono en pause.
		function pauseChrono() {
			self._chrono.pause();
			self._ui.switchToPauseState();
		}
		
		// Trigger DOM
		self._ui.setPauseChronoTrigger(pauseChrono);
		
		// Triggers clavier
		var _pauseKeys = [_keyCode.space, _keyCode.P];
		_addKeysListenerToBody(_pauseKeys, pauseChrono);
	}
	
	// Ajoute les déclencheurs de l'évènement: arrêt du chrono.
	function _addStopTriggers(self) {
		
		// Arrête le chrono.
		function stopChrono() {
			self._chrono.stop();
			self._ui.switchToStopState();
		}
		
		// Trigger DOM
		self._ui.setStopChronoTrigger(stopChrono);
		
		// Triggers clavier
		var _stopKeys = [_keyCode.K, _keyCode.del, _keyCode.backspace];
		_addKeysListenerToBody(_stopKeys, stopChrono);
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

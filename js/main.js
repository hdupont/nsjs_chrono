/**
 * Programme permettant d'utiliser un chronomètre via un menu composé de boutons
 * ou via le clavier.
 * 
 * Un objet UI construit et gère l'interface utilisateur
 * L'UI est mise à jour en fonction de l'état d'un objet chrono.
 */
(function(chrono, ui) {
	
	/**
	 * Démarre le chrono.
	 */
	function startChrono() {
		if (chrono.isRunning()) {
			return;
		}
		chrono.start();
		ui.startState();		
	}
	
	/**
	 * Met le chrono en pause.
	 */
	function pauseChrono() {
		if (! chrono.isRunning()) {
			return;
		}
		chrono.pause();
		ui.pauseState();
	}

	/**
	 * Arrête le chrono.
	 */
	function stopChrono() {
		chrono.stop();
		ui.stopState();
	}
	
	// On initialise l'interface utilisateur
	ui.init("chrnapp");
	
	// On attache les listeners à L'UI.
	ui.addStartButtonListener(startChrono);
	ui.addStartKeysListener(startChrono);
	ui.addPauseButtonListener(pauseChrono);
	ui.addPauseKeysListener(pauseChrono);
	ui.addStopButtonListener(stopChrono);
	ui.addStopKeysListener(stopChrono);
	 
	// Les changements d'état du chrono sont signalés à l'UI.
	chrono.addOnChangeListener(ui.update);
	
})(chronoapp.chrono, chronoapp.ui);
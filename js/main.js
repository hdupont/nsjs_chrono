/**
 * Programme permettant d'utiliser un chronomètre via un menu composé de boutons
 * ou avec le clavier.
 */
(function(Chrono, Controller, Ui, Action, Actions) {
	
	/**
	 * Assemble les éléments nécessaires (chrono, controlleur et UI) à
	 * l'affichage et à l'utilisation d'un chrono par l'utiisateur
	 */
	function _addChrono() {
		// Création du chrono.
		var chrono = new Chrono();
		
		// Création de l'interface utilisateur.
		var ui = new Ui();
		
		var actions = new Actions(chrono, ui);
		actions.addAction(new Action(
				"startchrono",
				function action() {
					chrono.start();		
				},
				function onAction(context) {
					context.switchToStartState();		
				}, 
				[_keyCode.enter, _keyCode.D]
			)
		);
		actions.addAction(new Action(
				"pausechrono",
				function action() {
					chrono.pause();
				},
				function onAction(context) {
					context.switchToPauseState();
				},
				[_keyCode.space, _keyCode.P]
			)
		);
		actions.addAction(new Action(
				"stopchrono",
				function action() {
					chrono.stop();
				},
				function onAction(context) {
					context.switchToStopState();
				},
				[_keyCode.K, _keyCode.del, _keyCode.backspace]
			)
		);
		
		// Création du controlleur.
		var controller = new Controller(chrono, ui, actions);
	}

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
	
	// On met un chrono à disposition de l'utilisateur.
	_addChrono();
	
	// Et on met un autre chrono à disposition de l'utilisateur.
	_addChrono();
	
})(chronoapp.Chrono, chronoapp.Controller, chronoapp.Ui, chronoapp.Action, chronoapp.Actions);

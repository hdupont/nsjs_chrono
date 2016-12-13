/**
 * ----------------------
 * @class Controller
 * ----------------------
 * Controller fait le lien entre le chrono, l'UI (graphique et clavier).
 * Il est abonne l'UI au changement d'état du chrono pour que cette dernière
 * puisse se mettre à jour (cf. chrono.addOnChangeListener).
 * Il associe à l'UI les traitements à effectuer lors du déclenchement d'une
 * action par l'intermédiaire de cette dernière.
 * Il associe au clavier les traitements à effectuer lors du déclenchement d'une
 * action par l'intermédiaire de ce dernier. 
 * NOTE On sépare conceptuellemenet le clavier de l'interface DOM, bien
 * que les signaux du clavier nous arrive par le DOM.
 */
chronoapp.Controller = (function() {
		
	// public
	// ------
	
	/**
	 * Controller
	 * 1. Construit un Controller
	 * 2. Abonne l'UI au changement d'état du chrono passé en paramètre.
	 * 3. Initialise l'interface (graphique et clavier).
	 * 4. Ajoute l'interface au DOM.
	 * 
	 * @param {object} chrono Le chrono mis à disposition de l'utilisateur.
	 * @param {object} ui L'interface qui affiche le chrono et les actions
	 * permettant à l'utilisateur d'agir sur le chrono.
	 */
	function Controller(chrono, ui, actions) {		
		
		// On abonne l'UI aux changements d'état du chrono.
		chrono.addOnChangeListener(function(minutes, secondes, millisecondes) {
			ui.update(minutes, secondes, millisecondes);
		});
		
		// On associe chaque éléments de l'interface (graphique et clavier) à
		// son action.
		actions.each(function(action) {
			_initUiActionTrigger(ui, action);
		});

		// On met l'interface graphique dans son état initial.
		ui.init();
		
		// On ajoute l'interface utilisateur au DOM.
		ui.appendToDom("chrnapp")
	}
	
	// private
	// -------

	//  
	/**
	 * Initialise les éléments de l'UI pouvant déclencher sur le chrono 
	 * l'action passée en paramètre.
	 * @param {object} self Ce controlleur.
	 * @param {object} action Une action pouvant être effectuée sur le chrono.
	 */
	function _initUiActionTrigger(ui, action) {
		
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
			action.execute();
		};
		ui.initActionTrigger(action);
		addKeysListenerToBody(action.getKeys(), actionHandler);
	}
	
	return Controller;
})();

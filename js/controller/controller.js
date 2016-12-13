/**
 * ----------------------
 * @class Controller
 * ----------------------
 * Controller fait le lien entre le chrono et l'interface utilisateur.
 * Il est prévenu des changements d'états car il a souscrit un abonnement au
 * modification du chrono (cf. chrono.addOnChangeListener).
 * Il est prévenu des actions utilistateurs au travers des déclencheurs
 * d'actions qu'il attache à l'interface utilisateur.
 * Le controlleur gère le clavier et l'interface DOM.
 * NOTE On sépare conceptuellemenet le clavier de l'interface DOM, bien
 * que les signaux du clavier nous arrive par le DOM.
 */
chronoapp.Controller = (function() {
		
	// public
	// ------
	
	/**
	 * Controller
	 * 1. Construit un Controller
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
	 * @property {object} _actions
	 */
	function Controller(chrono, ui, actions) {		
		this._chrono = chrono;
		this._ui = ui;
		
		// On abonne le controlleur à l'écoute des changement d'état du chrono.
		// NOTE On place l'appelle dans une fonction anonyme pour conserver le
		// bon contexte à l'exécution.
		var self = this;
		
		// On abonne l'UI aux changements d'état du chrono.
		chrono.addOnChangeListener(function(minutes, secondes, millisecondes) {
			ui.update(minutes, secondes, millisecondes);
		});
		
		// On initialise les éléments de l'UI pouvant déclencher une action sur
		// le chrono.
		actions.each(function(action) {
			_initUiActionTrigger(self, action);
		});

		// On initialise l'interface utilisateur.
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
			action.execute(self._ui);
		};
		self._ui.initActionTrigger(action.getName(), actionHandler);
		addKeysListenerToBody(action.getKeys(), actionHandler);
	}
	
	return Controller;
})();

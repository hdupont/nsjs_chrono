/**
 * Programme permettant d'utiliser un chronomètre via un menu composé de boutons
 * ou avec le clavier.
 */
(function(Chrono, Controller, Ui, Actions) {
	
	/**
	 * Assemble les éléments nécessaires (chrono, actions, controlleur et UI) à
	 * l'affichage et à l'utilisation d'un chrono par l'utiisateur
	 */
	function _addChrono() {
		// Création du chrono avec lequel l'utilisateur va interagir.
		var chrono = new Chrono();
		
		// Création de l'interface par l'intermédiaire de laquelle 
		// l'utilisateur interagira avec le chrono.
		var ui = new Ui();
		
		// Création de la liste des actions pouvant être effectuées sur le
		// chrono par l'utilisateur.
		var actions = new Actions(chrono, ui);
		
		// Création du controlleur qui initialise l'interface utilisateur.
		var controller = new Controller(chrono, ui, actions);
	}
	
	// On met un chrono à disposition de l'utilisateur.
	_addChrono();
	
	// Et, pour le fun, on met un autre chrono à disposition de l'utilisateur.
	_addChrono();
	
})(chronoapp.Chrono, chronoapp.Controller, chronoapp.Ui, chronoapp.Actions);

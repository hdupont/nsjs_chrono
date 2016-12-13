/**
 * Programme permettant d'utiliser un chronomètre via un menu composé de boutons
 * ou avec le clavier.
 */
(function(Chrono, Controller, Ui) {
	
	/**
	 * Assemble les éléments nécessaires (chrono, controlleur et UI) à
	 * l'affichage et à l'utilisation d'un chrono par l'utiisateur
	 */
	function _addChrono() {
		// Création du chrono.
		var chrono = new Chrono();
		
		// Création de l'interface utilisateur.
		var ui = new Ui();
		
		// Création du controlleur.
		var controller = new Controller(chrono, ui);		
	}
	
	// On met un chrono à disposition de l'utilisateur.
	_addChrono();
	
	// Et on met un autre chrono à disposition de l'utilisateur.
	_addChrono();
	
})(chronoapp.Chrono, chronoapp.Controller, chronoapp.Ui);

/**
 * Programme permettant d'utiliser un chronomètre via un menu composé de boutons
 * ou via le clavier.
 */
(function(Chrono, ChronoController, Ui) {
		
	// Création du chrono.
	var chrono = new Chrono;
	
	// Création de l'interface utilisateur.
	var ui = new Ui();
	
	// Création du controlleur.
	var chronoController = new ChronoController(chrono, ui);
	
})(h_chrono.Chrono, chronoapp.ChronoController, chronoapp.Ui);

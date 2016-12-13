/**
 * ---------------
 * @class TimeView
 * ---------------
 * Une TimeView est un composant graphique permettant de visualiser le temps
 * indiqué par le chrono.
 * L'affichage se fait sous la forme xx:yy:zz
 */
chronoapp.TimeView = (function() {
	
	// public
	// ------
	
	/**
	 * Construit un élément d'interface qui affiche le temps indiqué par le
	 * chrono.
	 * @property {HTMLElement} _minutesField La partie de l'interface qui affiche
	 * les minutes indiquées par le chrono.
	 * @property {HTMLElement} _secondsField La partie de l'interface qui affiche
	 * les secondes indiquées par le chrono.
	 * @property {HTMLElement} _secondsField La partie de l'interface qui affiche
	 * les millisecondes indiquées par le chrono.
	 * @property {string} _fontSize La taille de la fonte avec laquelle sera
	 * affichée la TimeView.
	 */
	function TimeView(fontSize) {	
		this._minutesField = _buildChronoField();
		this._secondsField = _buildChronoField();
		this._milliseconds = _buildChronoField();
		this._fontSize = fontSize;
	}
		
	/**
	 * Passe l'interface dans l'état STOP: chrono arrêté.
	 */
	TimeView.prototype.switchToStopState = function() {
		this._minutesField.innerHTML = "00";
		this._secondsField.innerHTML = "00";
		this._milliseconds.innerHTML = "00";
	};
			
	/**
	 * Met l'interface à jour avec les données passées en paramètres, données
	 * qui correspondent à l'état du chrono.
	 * @param {int} minutes Le nombre de minutes indiquées par le chrono.
	 * @param {int} seconds Le nombre de secondes indiquées par le chrono.
	 * @param {int} milliseconds Le nombre de millisecondes indiquées par le
	 * chrono.
	 */
	TimeView.prototype.update = function(minutes, seconds, milliseconds) {
		
		/**
		 * Retourne le nombre passé en paramètre sous la forme d'une chaine
		 * d'au moins deux caractères.
		 * @num {int} num Le nombre dont on souhaite obtenir une représentation
		 * sous la forme d'une chaine d'au moins deux caractères.
		 */
		function _twoDigits(num) {
			return (num < 10) ? ("0" + num) : ("" + num) 
		}
		
		this._minutesField.innerHTML = _twoDigits(minutes);
		this._secondsField.innerHTML = _twoDigits(seconds);
		this._milliseconds.innerHTML = _twoDigits(milliseconds);
	};
	
	TimeView.prototype.buildDomNode = function() {
		return _buildChronoDisplay(this);
	};
	
	// private
	// -------
			
	/**
	 * Construit la partie de l'interface qui affiche l'état du chrono
	 * sous la forme : xx:yy:zz
	 * @param {object} self L'interface utilisateur.
	 */
	function _buildChronoDisplay(self) {
		var chronoDiv = document.createElement("div");
		chronoDiv.style.fontSize = self._fontSize;
		chronoDiv.appendChild(self._minutesField);
		chronoDiv.appendChild(document.createTextNode(":"));
		chronoDiv.appendChild(self._secondsField);
		chronoDiv.appendChild(document.createTextNode(":"));
		chronoDiv.appendChild(self._milliseconds);
		
		return chronoDiv;
	}
	
	/**
	 * Construit un élément d'interface qui affiche une durée (minutes,
	 * secondes ou millisecondes)
	 * NOTE Les éléments construits par _buildChronoField() seront composés par 
	 * _buildChronoDisplay() pour afficher l'état du chrono.
	 */
	function _buildChronoField() {
		var chronoField = document.createElement("span");
		chronoField.innerHTML = "00";
		
		return chronoField;
	}
	
	return TimeView;
})();

/**
 * -------------
 * @class Chrono 
 * -------------
 * Un Chrono est un chronomètre qui indique les minutes, secondes et millisecondes. 
 */
chronoapp.Chrono = (function() {
	
	// public
	// ------
	
	/**
	 * Construit un chrono.
	 * 
	 * @property {object} _time Le temps écoulé depuis le démarrage du chrono. 
	 * @property {int} _intervalId L'id de l'intervalle incrémentant régulièrement le chrono.
	 * @property {function} _onChangeListener La fonction a exécuter à chaque incrément du chrono.
	 */
	function Chrono() {
		this._time = 0;
		this._intervalId = null; 
		this._onChangeListener = null;
	}
	
	/**
	 * Démarre le chrono s'il n'est pas déjà démarré.
	 * Ne fait rien si le chrono est déjà démarré.
	 */
	Chrono.prototype.start = function() {
		if (this.isRunning()) {
			return;
		}
		
		var self = this;
		self._intervalId = setInterval(function(){
			_inc(self);
		}, 10);
	};
	
	/**
	 * Met le chrono en pause.
	 */
	Chrono.prototype.pause = function() {
		if (! this.isRunning()) {
			return;
		}
		_resetInterval(this);
	};
	
	/**
	 * Arrête le chrono.
	 */
	Chrono.prototype.stop = function() {
		_resetInterval(this);
		this._time = 0;
	};
	
	/**
	 * Indique si le chrono est démarré.
	 * @returns {boolean} true si le chrono est démarré, false sinon.
	 */
	Chrono.prototype.isRunning = function() {
		return this._intervalId !== null;
	};
	
	/**
	 * Ajoute au chrono une fonction qui sera exécutée à chaque fois que le
	 * chrono sera incrémenté.
	 * @param {function} fun La fonction à exécuter à chaque fois que le chrono
	 * sera incrémenté.
	 */
	Chrono.prototype.addOnChangeListener = function(fun) {
		this._onChangeListener = fun;
	};
	
	// private
	// -------
	
	/**
	 * Incrémente le chrono.
	 * @param {object} self Le chrono.
	 */
	function _inc(self) {
		self._time++;
		self._onChangeListener(_getMinutes(self), _getSeconds(self), _getMilliseconds(self));
	}
	
	/**
	 * Supprime l'intervalle qui incrémente régulièrement le chrono.
	 * @param {object} self Le chrono.
	 */
	function _resetInterval(self) {
		clearInterval(self._intervalId);
		self._intervalId = null;
	}
	
	/**
	 * Retourne le nombre de minutes indiquées par le chrono.
	 * @param {object} self Le chrono.
	 * @returns {int} Le nombre de minutes indiquées par le chrono.
	 */
	function _getMinutes(self) {
		return parseInt(Math.floor(self._time / 100 / 60));
	}
	
	/**
	 * Retourne le nombre de secondes indiquées par le chrono.
	 * @param {object} self Le chrono.
	 * @returns {int} Le nombre de secondes indiquées par le chrono.
	 */
	function _getSeconds(self) {
		return Math.floor(self._time / 100 % 60);
	}
	
	/**
	 * Retourne le nombre de millisecondes indiquées par le chrono.
	 * @param {object} self Le chrono.
	 * @returns {int} Le nombre de secondes indiquées par le chrono.
	 */
	function _getMilliseconds(self) {
		return Math.floor(self._time % 100);
	}
	
	return Chrono;
})();

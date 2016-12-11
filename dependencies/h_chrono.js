// namespace du composant Chrono
var h_chrono = {};

//---------------
//class Chrono
//---------------
//Un Chrono est chronomètre pouvant indiquer minutes, secondes et millisecondes.
h_chrono.Chrono = (function() {
	
	// public
	// ------
	
	function Chrono() {
		this._chrono = 0;
		this._intervalId = null; 
		this._onChangeListener = null;
	}
	Chrono.prototype.start = function() {
		if (this.isRunning()) {
			return;
		}
		
		var self = this;
		self._intervalId = setInterval(function(){
			_inc(self);
		}, 10);
	};
	Chrono.prototype.pause = function() {
		if (! this.isRunning()) {
			return;
		}
		_resetInterval(this);
	};
	Chrono.prototype.stop = function() {
		_resetInterval(this);
		this._chrono = 0;
	};
	Chrono.prototype.isRunning = function() {
		return this._intervalId !== null;
	};
	Chrono.prototype.addOnChangeListener = function(fun) {
		this._onChangeListener = fun;
	};
	
	// private
	// -------
	
	function _inc(self) {
		self._chrono++;
		self._onChangeListener(_getMinutes(self), _getSeconds(self), _getMilliseconds(self));
	}
	
	function _resetInterval(self) {
		clearInterval(self._intervalId);
		self._intervalId = null;
	}
	
	function _getMinutes(self) {
		return Math.floor(self._chrono / 100 / 60);
	}
	
	function _getSeconds(self) {
		return Math.floor(self._chrono / 100 % 60);
	}
	
	function _getMilliseconds(self) {
		return Math.floor(self._chrono % 100);
	}
	
	return Chrono;
})();

// TODO transformer chrono en classe
chronoapp.chrono = (function() {
	
	var _chrono = 0;
	var _intervalId = null; 
	var _onChangeListener = null;
	
	function _inc() {
		_chrono++;
	}
	
	function _resetInterval() {
		clearInterval(_intervalId);
		_intervalId = null;
	}
	
	function _getMinutes() {
		return Math.floor(_chrono / 100 / 60);
	}
	
	function _getSeconds() {
		return Math.floor(_chrono / 100 % 60);
	}
	
	function _getMilliseconds() {
		return Math.floor(_chrono % 100);
	}
	
	return {
		start: function() {		
			var that = this;
			_intervalId = setInterval(function(){
				that._inc();
			}, 10);
		},
		_inc: function() {
			_chrono++;
			_onChangeListener(_getMinutes(), _getSeconds(), _getMilliseconds());
		},
		pause: function() {
			_resetInterval();
		},
		stop: function() {
			_resetInterval();
			_chrono = 0;
		},
		isRunning: function() {
			return _intervalId !== null;
		},
		addOnChangeListener: function(fun) {
			_onChangeListener = fun;
		}
	};
})();

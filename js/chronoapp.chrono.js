chronoapp.chrono = (function() {
	
	var _chrono = 0;
	var _intervalId = null; 
	
	function _inc() {
		_chrono++;
	}
	
	return {
		_onChangeListener: null,
		start: function() {
			var that = this;
			_intervalId = setInterval(function(){
				that._inc();
			}, 10);
		},
		_inc: function() {
			_chrono++;
			this._onChangeListener(this.getMinutes(), this.getSeconds(), this.getMilliseconds());
		},
		pause: function() {
			clearInterval(_intervalId);
		},
		stop: function() {
			clearInterval(_intervalId);
			_chrono = 0;
		},
		getMinutes: function() {
			return Math.floor(_chrono / 100 / 60);
		},
		getSeconds: function() {
			return Math.floor(_chrono / 100 % 60);
		},
		getMilliseconds: function() {
			return Math.floor(_chrono % 100);
		},
		addOnChangeListener: function(fun) {
			this._onChangeListener = fun;
		}
	};
})();
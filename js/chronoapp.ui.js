chronoapp.ui = (function() {
	var _startButton = document.getElementById("start");
	var _pauseButton = document.getElementById("pause");
	var _stopButton = document.getElementById("stop");
	
	var _minutesField = document.getElementById("minutes");
	var _secondsField = document.getElementById("seconds");
	var _milliseconds = document.getElementById("milliseconds");
	
	// NB. En keydown les codes correspondent aux lettres majuscules.
	var _keyCode = {
		"enter": 13,
		"d": 100,
		"space": 32,
		"P": 80,
		"c": 99,
		"k": 107,
		"del": 46,
		"backspace": 8
	};

	var _startKeys = [_keyCode.enter, _keyCode.s];
	var _pauseKeys = [_keyCode.space, _keyCode.P];
	var _continueKeys = [_keyCode.space, _keyCode.p, _keyCode.c];
	var _stopKeys = [_keyCode.k, _keyCode.del, _keyCode.backspace];

	function _twoDigits(num) {
		return (num < 10) ? ("0" + num) : ("" + num) 
	}
	
	function _addKeysListenerToBody(keys, listerner) {
		document.body.addEventListener("keydown", function(event) {
			if (keys.indexOf(event.keyCode) !== -1) {
				listerner();
			}
		});
	}
	
	return {
		init: function() {
			this.stopState();
		},
		addStartButtonListener: function(start) {
			_startButton.addEventListener("click", start);
		},
		addStartKeysListener: function(start) {
			_addKeysListenerToBody(_startKeys, start);
		}, 
		addPauseButtonListener: function(pause) {
			_pauseButton.addEventListener("click", pause);
		},
		addPauseKeysListener: function(pause) {
			_addKeysListenerToBody(_pauseKeys, pause);
		}, 
		addStopButtonListener: function(stop) {
			_stopButton.addEventListener("click", stop);
		},
		addStopKeysListener: function(stop) {
			_addKeysListenerToBody(_stopKeys, stop);
		},
		stopState: function() {
			_minutesField.innerHTML = "00";
			_secondsField.innerHTML = "00";
			_milliseconds.innerHTML = "00";
			this.showStartButton();
			this.hidePauseButton();
			this.hideStopButton();
		},
		pauseState: function() {
			this.showStartButton();
			this.hidePauseButton();
			this.showStopButton();
		},
		startState: function() {
			this.hideStartButton();
			this.showPauseButton();
			this.showStopButton();
		},
		hideStartButton: function() {
			_startButton.style.display = "none";
		},
		hidePauseButton: function() {
			_pauseButton.style.display = "none";
		},
		hideStopButton: function() {
			_stopButton.style.display = "none";
		},
		showStartButton: function() {
			_startButton.style.display = "";
		},
		showPauseButton: function() {
			_pauseButton.style.display = "";
		},
		showStopButton: function() {
			_stopButton.style.display = "";
		},
		showPauseAndStopButtons: function() {
			_pauseButton.style.display = "";
			_stopButton.style.display = "";
		},
		update: function(minutes, seconds, milliseconds) {
			_minutesField.innerHTML = _twoDigits(minutes);
			_secondsField.innerHTML = _twoDigits(seconds);
			_milliseconds.innerHTML = _twoDigits(milliseconds);
		}
	};
})();
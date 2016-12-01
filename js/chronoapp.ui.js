chronoapp.ui = (function() {
	
	var _startButton = null;
	var _pauseButton = null;
	var _stopButton = null;
	
	var _minutesField = null;
	var _secondsField = null;
	var _milliseconds = null;
	
	// NB. En keydown les codes correspondent aux lettres majuscules.
	var _keyCode = {
		"enter": 13,
		"D": 68,
		"space": 32,
		"P": 80,
		"K": 75,
		"del": 46,
		"backspace": 8
	};

	var _startKeys = [_keyCode.enter, _keyCode.D];
	var _pauseKeys = [_keyCode.space, _keyCode.P];
	var _stopKeys = [_keyCode.K, _keyCode.del, _keyCode.backspace];

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
	
	function appendUi(appNode, appUiContainer) {
		appNode.innerHTML = appUiContainer.innerHTML;
	}
	
	function _hideStartButton() {
		_startButton.style.display = "none";
	}
	
	function _hidePauseButton() {
		_pauseButton.style.display = "none";
	}
	
	function _hideStopButton() {
		_stopButton.style.display = "none";
	}
	
	function _showStartButton() {
		_startButton.style.display = "";
	}
	
	function _showPauseButton() {
		_pauseButton.style.display = "";
	}
	
	function _showStopButton() {
		_stopButton.style.display = "";
	}
	
	function showPauseAndStopButtons() {
		_pauseButton.style.display = "";
		_stopButton.style.display = "";
	}
	
	return {
		init: function(appNodeId) {
			var appNode = document.getElementById(appNodeId);
			
			// On construit l'élément DOM de l'UI.
			_appNode = this.builder.buildDomElement();
			
			// On injecte l'élément DOM de l'UI dans le dom.
			appendUi(appNode, _appNode);
			
			// On initialise les attributs de l'UI.
			_startButton = document.getElementById("start");
			_pauseButton = document.getElementById("pause");
			_stopButton = document.getElementById("stop");
			_minutesField = document.getElementById("minutes");
			_secondsField = document.getElementById("seconds");
			_milliseconds = document.getElementById("milliseconds");
			
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
			_showStartButton();
			_hidePauseButton();
			_hideStopButton();
		},
		pauseState: function() {
			_showStartButton();
			_hidePauseButton();
			_showStopButton();
		},
		startState: function() {
			_hideStartButton();
			_showPauseButton();
			_showStopButton();
		},
		update: function(minutes, seconds, milliseconds) {
			_minutesField.innerHTML = _twoDigits(minutes);
			_secondsField.innerHTML = _twoDigits(seconds);
			_milliseconds.innerHTML = _twoDigits(milliseconds);
		}
	};
})();

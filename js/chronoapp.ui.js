chronoapp.ui = (function() {
	var _startButton = document.getElementById("start");
	var _pauseButton = document.getElementById("pause");
	var _stopButton = document.getElementById("stop");
	
	var _minutesField = document.getElementById("minutes");
	var _secondsField = document.getElementById("seconds");
	
	function _twoDigits(num) {
		return (num < 10) ? ("0" + num) : ("" + num) 
	}
	
	return {
		init: function() {
			this.stopState();
		},
		addStartButtonListener: function(clickListener) {
			_startButton.addEventListener("click", clickListener);
		},
		addPauseButtonListener: function(clickListener) {
			_pauseButton.addEventListener("click", clickListener);
		},
		addStopButtonListener: function(clickListener) {
			_stopButton.addEventListener("click", clickListener);
		},
		stopState: function() {
			_minutesField.innerHTML = "00";
			_secondsField.innerHTML = "00";
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
		update: function(seconds, minutes) {
			_secondsField.innerHTML = _twoDigits(seconds);
			_minutesField.innerHTML = _twoDigits(minutes);
		}
	};
})();
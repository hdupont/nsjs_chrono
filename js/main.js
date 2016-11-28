(function(chrono, ui) {
	
	function startButtonClickListener() {
		chrono.start();
		ui.startState();		
	}
	function pauseButtonClickListener() {
		chrono.pause();
		ui.pauseState();
	}
	function stopButtonClickListener() {
		chrono.stop();
		ui.stopState();
	}
	
	ui.init();
	ui.addStartButtonListener(startButtonClickListener);
	ui.addPauseButtonListener(pauseButtonClickListener);
	ui.addStopButtonListener(stopButtonClickListener);
	
	chrono.addOnChangeListener(ui.update);
	
})(chronoapp.chrono, chronoapp.ui);
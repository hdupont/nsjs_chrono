(function(chrono, ui) {
	
	function start() {
		if (chrono.isRunning()) {
			return;
		}
		chrono.start();
		ui.startState();		
	}
	
	function pause() {
		if (! chrono.isRunning()) {
			return;
		}
		chrono.pause();
		ui.pauseState();
	}
	
	function stop() {
		chrono.stop();
		ui.stopState();
	}
	
	ui.init();
	ui.addStartButtonListener(start);
	ui.addStartKeysListener(start);
	
	ui.addPauseButtonListener(pause);
	ui.addPauseKeysListener(pause);
	
	ui.addStopButtonListener(stop);
	ui.addStopKeysListener(stop);
	
	chrono.addOnChangeListener(ui.update);
	
})(chronoapp.chrono, chronoapp.ui);
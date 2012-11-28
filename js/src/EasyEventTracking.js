function EasyEventTracking(googleAnalytics, afterTrackEventFires, errorLog) {
	
	_this = this;
	var trackSelector = "track";
	var _errorLog = errorLog || console;

	if(!googleAnalytics){
		_errorLog.log("Google analytics was not supplied to the constructor. Auto-event tracking won't work.");
	}

	var _googleAnalytics = googleAnalytics || [];
	var _afterTrackEventFires = afterTrackEventFires || function(trackEventParam){};

	this.bind = function(selector){

		$(selector + "-click").click(function(element){
			_this.trackEvent('click', this)			
		});

		$(selector + "-blur").blur(function(element){
			_this.trackEvent('blur', this)			
		});

		$(selector + "-focus").focus(function(element){
			_this.trackEvent('focus', this)			
		});

		$(selector + "-mouseover").mouseover(function(element){
			_this.trackEvent('mouseover', this)			
		});
	};

	this.trackEvent = function(interaction, element){

		var trackevent = this.inferTrackingDetails(interaction, element);
		
		_googleAnalytics.push(trackevent);
		_afterTrackEventFires(trackevent);
	}

	this.inferTrackingDetails = function(interaction, fromElement){

		var category = $(fromElement).data(trackSelector + '-category') || "";
		var action = $(fromElement).data(trackSelector + '-action') || interaction;
		var label = $(fromElement).data(trackSelector + '-label') || ""; // optional
		var value = $(fromElement).data(trackSelector + '-value') || ""; // optional
		var nonInteraction = $(fromElement).data('non-interaction') || false; // optional

		return ['_trackEvent', category, action, label, value, nonInteraction];
	}

	_this.bind("." + trackSelector);
}
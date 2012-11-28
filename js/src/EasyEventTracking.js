function EasyEventTracking() {

	var _defaultSelector = ".track-event";
	var _boundSelector = "";

	this.bind = function(){
		_boundSelector = _defaultSelector;
	};

	this.watchedSelector = function(){
		return _boundSelector;
	}
}
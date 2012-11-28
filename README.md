EasyEventTracking
=================

Easy event tracking is a tiny JavaScript library to support convention based event tracking in Google Analytics.


Usage
=================

So, here's the thing that sucks about event tracking in Google analytics: you have to wire it up, every. single. time.
EasyEventTracking is a really simple little javascript class that does the grunt work for you (so long as jQuery is available).

Here's how you wire it up...

Your analytics snippet before EET
=================

	<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-XXXXX-X']);
	_gaq.push(['_trackPageview']);

	(function() {
	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

	</script>


 Your analytics snippet with EET
=================


	  <script type="text/javascript">
	   var _gaq = _gaq || [];
	    _gaq.push(['_setAccount', 'UA-XXXXX-X']);
	    _gaq.push(['_trackPageview']);

	    (function() {
	      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	    })();
	  
	  </script>
	  <script type="text/javascript" src="src/EasyEventTracking.js"></script>
	  <script type="text/javascript">
	  $(function(){
	    var tracker = new EasyEventTracking(_gaq, function(trackEvent){
	        console.log("Track event was fired: " + trackEvent);
	    });
	  });
	  </script>


What you can now do!
=================

	<div class="track">
	This will track when clicked.
	</div>

	<div class="track-mouseover">
	This will track when moused over.
	</div>

	<div class="track" data-action="action!" data-category="category-here" data-label="label-here" data-value="my-val" data-non-interaction="true">
	This overrides all available parameters using HTML5 data attributes.
	</div>

Supported conventions
=================

Currently you can track anything by adding the following:

* track - tracks on click
* track-mouseover - tracks on mouseover
* track-blur - tracks on blur
* track-focus - tracks on focus

The test suite currently asserts on the following:

	EasyEventTracking
		when google analytics library is not present
			should log an error to the console and not throw

	when trackable element is present
		track-click class invokes track event on element with inferred default action
		track-hover class invokes track event on element with inferred default action
		track-focus class invokes track event on element with inferred default action
		track-blur class invokes track event on element with inferred default action

	when a default track-event element is clicked
		a track event should be sent to google analytics
		the default track action is 'click'
		default category set to AutoTrack
		default label set to contains path and id
		value set to contain innerText
		non-interaction set to false

	when an attribute with html5 data annotations on the track-event element is clicked
		action should override convention based tracking events
		category should override convention based tracking events
		label should override convention based tracking events
		value should override convention based tracking events
		non-interaction can be set to true

Anything else?
=================

As you may have noticed from the example above, you can pass in an optional callback function to EET to allow you to react when auto-tracking occurs.
Useful if you need to post the tracking events back to your server to do something with them in addition to tracking using Google.

Patches!
=================

Want to fix something? Want to remove jQuery? Feel free to send me a patch.
There's a Jasmine spec runner with passing tests included in the repo, write a test, send me a patch.
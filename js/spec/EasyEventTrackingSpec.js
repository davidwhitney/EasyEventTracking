describe("EasyEventTracking", function() {
  var easyEventTracker;
  var _gaq = [];

  describe("when google analytics library is not present", function() {
    it("should log an error to the console and not throw", function() {

      var mockLogger = {
        log: function(msg){
          expect(msg).toEqual("Google analytics was not supplied to the constructor. Auto-event tracking won't work.");
        }
      };

      easyEventTracker = new EasyEventTracking(null, null, mockLogger);         
      
    });
  });

describe("when trackable element is present", function() {
    beforeEach(function() {
      _gaq = [];
      $('#testArea').html('');
    });

    it("track-click class invokes track event on element with inferred default action", function() { 
      $('#testArea').append('<div id="track" class="track">test-data</div>');
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][0]).toEqual("_trackEvent");
      expect(_gaq[0][2]).toEqual("click");
    });

    it("track-hover class invokes track event on element with inferred default action", function() { 
      $('#testArea').append('<div id="track" class="track-mouseover">test-data</div>');
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').mouseover();

      expect(_gaq[0][0]).toEqual("_trackEvent");
      expect(_gaq[0][2]).toEqual("mouseover");
    });

    it("track-focus class invokes track event on element with inferred default action", function() { 
      $('#testArea').append('<div id="track" class="track-focus">test-data</div>');
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').focus();

      expect(_gaq[0][0]).toEqual("_trackEvent");
      expect(_gaq[0][2]).toEqual("focus");
    });

    it("track-blur class invokes track event on element with inferred default action", function() { 
      $('#testArea').append('<div id="track" class="track-blur">test-data</div>');
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').blur();

      expect(_gaq[0][0]).toEqual("_trackEvent");
      expect(_gaq[0][2]).toEqual("blur");
    });


  });

describe("when a default track-event element is clicked", function() {
    beforeEach(function() {
      _gaq = [];
      $('#testArea').html('');
      $('#testArea').append('<div id="track" class="track">test-data</div>');
    });

    it("a track event should be sent to google analytics", function() {      
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][0]).toEqual("_trackEvent");
    });

    it("the default track action is 'click'", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][2]).toEqual("click");
    });

    it("default category set to AutoTrack", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][1]).toEqual("AutoTrack");
    });

    it("default label set to contains path and id", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][3]).toContain('EasyEventTracking/js/SpecRunner.html');
      expect(_gaq[0][3]).toContain('#track');
    });

    it("value set to contain innerText", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][4]).toEqual('test-data');
    });

    it("non-interaction set to false", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][5]).toEqual(false);
    });

  });

describe("when an attribute with html5 data annotations on the track-event element is clicked", function() {
    beforeEach(function() {
      _gaq = [];
      $('#testArea').html('');
      $('#testArea').append('<div id="track" class="track" data-action="action!" data-category="category-here" data-label="label-here" data-value="my-val" data-non-interaction="true">test-data</div>');
    });

    it("action should override convention based tracking events", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][2]).toEqual("action!");
    });

    it("category should override convention based tracking events", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][1]).toEqual("category-here");
    });

    it("label should override convention based tracking events", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][3]).toEqual('label-here');
    });

    it("value should override convention based tracking events", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][4]).toEqual('my-val');
    });

    it("non-interaction can be set to true", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][5]).toEqual(true);
    });

  });

});
      
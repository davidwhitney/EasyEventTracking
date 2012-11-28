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

    it("Default category set to AutoTrack", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][1]).toEqual("AutoTrack");
    });

  });

describe("when an attribute with html5 data annotations on the track-event element is clicked", function() {
    beforeEach(function() {
      _gaq = [];
      $('#testArea').html('');
      $('#testArea').append('<div id="track" class="track" data-category="category-here">test-data</div>');
    });

    it("cateogry should override convention based tracking events", function() {
      easyEventTracker = new EasyEventTracking(_gaq);

      $('#track').click();

      expect(_gaq[0][1]).toEqual("category-here");
    });

  });

});
      
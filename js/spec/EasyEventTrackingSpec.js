describe("EasyEventTracking", function() {
  var easyEventTracker;

  beforeEach(function() {
    easyEventTracker = new EasyEventTracking();
  });

  it("should be able to bind", function() {
    easyEventTracker.bind();

    expect(easyEventTracker.watchedSelector()).toEqual(".track-event");
  });

  describe("when google analytics library is not present and bind is called", function() {
    beforeEach(function() {
    });

    it("should log an error to the console", function() {

    });

    it("should fail without causing subsequent scripts to fail", function() {

    });
  });

describe("when a track-event element is clicked", function() {
    beforeEach(function() {
    });

    it("a track event should be sent to google analytics", function() {

    });

    it("the default google analytics information should be used", function() {

    });

    it("html5 data attributes should override convention based tracking events", function() {

    });

  });



});
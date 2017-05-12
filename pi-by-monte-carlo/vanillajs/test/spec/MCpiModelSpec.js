
describe("MCpiModel", function() {

  var model,
      radius = 100;

  beforeEach(function() {
    model = new mcPiApp.Model(100);
    model.init();
  });

  it("should make available model observables", function() {
    expect(model.getObservables()).toBeTruthy();
  });

  it("should make available model parameters - radius", function() {
    var par = model.getParameters();
    expect(Object.keys(par)).toEqual(["radius"]);
  });

  describe("when initialized, ", function() {
    var obs;
    beforeEach(function() {
      obs = model.getObservables();
    })
    it("should initialize x-y coordinates to zero", function() {
      expect(obs.x).toEqual(0);
      expect(obs.y).toEqual(0);
    });
    it("should initizlie hits counter to zero", function() {
      expect(obs.hits).toEqual(0);
    });
    it("should initialize total points counter to zero", function() {
      expect(obs.totalPoints).toEqual(0);
    });
    it("should initialize hit flag to false", function() {
      expect(obs.isHit).toEqual(false);
    });

    it("should initialize radius to user's value", function() {
      expect(model.getParameters().radius).toEqual(radius);
    });


  });

});

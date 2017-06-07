
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

  it("should determine whether a coordinate is a hit", function() {
    model.generatePoints();
    expect(typeof model.isHit()).toEqual("boolean");
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

  describe("when simulation is running, a step", function() {
    var step1Obs,
        step2Obs;

    beforeEach(function() {
      model.stepSim();
      step1Obs = model.getObservables();
      model.stepSim();
      step2Obs = model.getObservables();
    });

    it("should generate a valid coordinate", function() {
      expect(step1Obs.x).not.toEqual(0);
      expect(step1Obs.y).not.toEqual(0);
    });

    it("should generate a random coordinate", function() {
      expect(step1Obs.x).not.toEqual(step2Obs.x);
    });

    it("should increment total number of points", function() {
      expect(step2Obs.totalPoints - step1Obs.totalPoints).toEqual(1);
    });

    it("should check whether the coordinate is a hit", function() {
      spyOn(model, 'isHit');
      model.stepSim();
      expect(model.isHit).toHaveBeenCalled();
    })

  });


});

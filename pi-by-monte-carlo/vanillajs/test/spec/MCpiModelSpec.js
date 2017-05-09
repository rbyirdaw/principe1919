
describe("MCpiModel", function() {

  var model,
      radius = 100;

  beforeEach(function() {
    model = new mcPiApp.Model(100);
    model.init();
  });

  it("should make available model observables", function() {
    var obs = model.getObservables();
    expect(obs).toBeTruthy();
  });

  it("should make available model parameters - radius", function() {
    var par = model.getParameters();
    expect(Object.keys(par)).toEqual(["radius"]);
  });

  describe("when initialized, ", function() {

    it("should initialize radius to user's value", function() {
      expect(model.getParameters().radius).toEqual(radius);
    });
    it("should initialize x-y coordinates to zero", function() {
      var x = model.getObservables().x,
          y = model.getObservables().y;
      expect(x).toEqual(0);
      expect(y).toEqual(0);
    });
  });

});

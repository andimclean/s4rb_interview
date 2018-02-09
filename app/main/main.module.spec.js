'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('s4rbInterviewApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
    scope.setData([{
        "Quarter": "1",
        "Month": "2012-01-01T00:00:00",
        "Complaints": 27,
        "UnitsSold": 4932508
      },
      {
        "Quarter": "1",
        "Month": "2012-03-01T00:00:00",
        "Complaints": 10,
        "UnitsSold": 824680
      }
    ]);
  }));


  it('should return 1 CPMU when give a million units and 1 complaint', function () {
    var result = scope.toCPMU({
      Complaints: 1,
      UnitsSold: 1000000
    });

    expect(result).toBe(1);
  });

  it('should return 0.5 CPMU when give 2 million units and 1 complaint', function () {
    var result = scope.toCPMU({
      Complaints: 1,
      UnitsSold: 2000000
    });

    expect(result).toBe(0.5);
  });

  it('should return 0.33 CPMU when give 3 million units and 1 complaint and dp of 2', function () {
    var result = scope.toCPMU({
      Complaints: 1,
      UnitsSold: 3000000
    }, 2);

    expect(result).toBe("0.33");
  });

  it('should return 0.50 CPMU when give 2 million units and 1 complaint and dp of 2', function () {
    var result = scope.toCPMU({
      Complaints: 1,
      UnitsSold: 2000000
    }, 2);

    expect(result).toBe("0.50");
  });

  it('CPMU should return "null" when given null', function () {
    var result = scope.toCPMU();

    expect(result).toBe(null);
  });

  it('CPMU should return "null" when Complaints is null', function () {
    var result = scope.toCPMU({
      UnitsSold: 12
    });

    expect(result).toBe(null);
  });

  it('CPMU should return "null" when UnitsSold is null', function () {
    var result = scope.toCPMU({
      Complaints: 12
    });

    expect(result).toBe(null);
  });


  it('should given a date of "2012-01-01T00:00:00" return 2012 January', function () {
    var result = scope.formatDateYearAndMonth("2012-01-01T00:00:00");

    expect(result).toBe('January 2012');
  });

  it('should given a date of "2012-01-31T00:00:00" return 2012 January', function () {
    var result = scope.formatDateYearAndMonth("2012-01-31T00:00:00");

    expect(result).toBe('January 2012');
  });

  it('should given a date of "2012-01-01T00:00:00" and quarter of "1" return 2012_1', function () {
    var result = scope.formatDateYearQuarter({
      Month: "2012-01-01T00:00:00",
      Quarter: 1
    });

    expect(result).toBe('2012_1');
  });

  it('should return the min and max date of an array of 1 item', function () {

    var result = scope.getMinMaxDate([{
      Month: "2012-01-01T00:00:00"
    }]);

    expect(result.min.format("YYYY MM DD")).toBe('2012 01 01');
    expect(result.max.format("YYYY MM DD")).toBe('2012 01 01');

  });

  it('should return the min and max date of an array of 2 item', function () {

    var result = scope.getMinMaxDate([{
      Month: "2012-01-01T00:00:00"
    }, {
      Month: "2013-02-01T00:00:00"
    }]);

    expect(result.min.format("YYYY MM DD")).toBe('2012 01 01');
    expect(result.max.format("YYYY MM DD")).toBe('2013 02 01');

  });

  it('checkValue should return "No Value" when given null', function () {
    expect(scope.checkValue(null)).toBe('No Value');
  });


  it('checkValue should return "No Value" not given a value', function () {
    expect(scope.checkValue()).toBe('No Value');
  });

  it('checkValue should return 0 when given 0', function () {
    expect(scope.checkValue(0)).toBe(0);
  });
  it('checkValue should return the same value when given a value', function () {
    expect(scope.checkValue(27)).toBe(27);
  });

  it('should return a sequence of 14 dates when given an array of dates 13 months apart', function () {
    var result = scope.makeSequence([{
      Month: "2012-01-01T00:00:00"
    }, {
      Month: "2013-02-01T00:00:00"
    }]).toArray();


    expect(result.length).toBe(14);
  });

  it('should return a sequence of 14 dates when given an array of dates 13 months apart', function () {
    var result = scope.makeSequence([{
      Month: "2012-01-01T00:00:00"
    }, {
      Month: "2012-06-01T00:00:00"
    }, {
      Month: "2013-02-01T00:00:00"
    }]).toArray();


    expect(result.length).toBe(14);
  });

  it('should return a empty sequence given an empty array', function () {
    var result = scope.makeSequence([]).toArray();


    expect(result.length).toBe(0);
  });
});

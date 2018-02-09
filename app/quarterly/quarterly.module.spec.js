'use strict';

describe('Controller: QuarterlyCtrl', function () {

  // load the controller's module
  beforeEach(module('s4rbInterviewApp'));

  var MainCtrl,
    quarterlyCtrl,
    mainScope,
    scope;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    mainScope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: mainScope
    });
    scope = mainScope.$new();
    quarterlyCtrl = $controller('QuarterlyCtrl', {
      $scope: scope
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

    scope.$digest();
  }));


  it('should return 1 CPMU when give a million units and 1 complaint', function () {
    var result = scope.toCPMU({
      Complaints: 1,
      UnitsSold: 1000000
    });

    expect(result).toBe(1);
  });

  it('should return an array with 3 items in it with months 1-3 of 2012', function () {
    var expected = [{
      Month: "2012-01-01T00:00:00",
      Quarter: '1',
      Complaints: 37,
      UnitsSold: 4932508 + 824680
    }];

    var result = scope.getData();

    expect(result).toEqual(expected);
  });

});

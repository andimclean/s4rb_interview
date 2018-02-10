'use strict';

describe('Controller: MonthlyCtrl', function () {

  // load the controller's module
  beforeEach(module('s4rbInterviewApp'));

  var MainCtrl,
    monthlyCtrl,
    mainScope,
    $httpBackend,
    scope;


  var defaultData = [{
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
  ];
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {

    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://localhost:3000/CPMU').respond(defaultData);
    $httpBackend.expectGET('raw/raw.html').respond(200);

    /*
      It is expected that the Monthly Controller will be used inside the Main Controller.
      So we need to make sure that both controllers are setup.
    */

    mainScope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: mainScope
    });
    scope = mainScope.$new();
    monthlyCtrl = $controller('MonthlyCtrl', {
      $scope: scope
    });

    // Make sure that any http requests are fulfilled.
    $httpBackend.flush();
  }));

  // Check that toCPMU in base ctrl still works
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
        Complaints: 27,
        UnitsSold: 4932508
      },
      {
        Month: "2012-02-01T00:00:00"
      },
      {
        Month: "2012-03-01T00:00:00",
        Quarter: '1',
        Complaints: 10,
        UnitsSold: 824680
      },
    ];

    var result = scope.getData();

    expect(result).toEqual(expected);
  });

});

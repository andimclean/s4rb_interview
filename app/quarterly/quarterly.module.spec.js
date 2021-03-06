'use strict';

describe('Controller: QuarterlyCtrl', function () {

  // load the controller's module
  beforeEach(module('s4rbInterviewApp'));

  var MainCtrl,
    quarterlyCtrl,
    $httpBackend,
    mainScope,
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
    },
    {
      "Quarter": "3",
      "Month": "2012-07-01T00:00:00",
      "Complaints": 10,
      "UnitsSold": 824680
    }
  ];
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {

    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://localhost:3000/CPMU').respond(defaultData); // used to get the main data
    $httpBackend.expectGET('raw/raw.html').respond(200); // USed as the default route


    /*
      It is expected that the Monthly Controller will be inherited from the Main Controller.
      So we need to make sure that both controllers are setup.
    */

    mainScope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: mainScope
    });
    scope = mainScope.$new();
    quarterlyCtrl = $controller('QuarterlyCtrl', {
      $scope: scope
    });

    // Make sure that any http requests are fulfilled.
    $httpBackend.flush();
  }));

  it('should return an array with 3 items in it with months 1-3 of 2012', function () {
    var expected = [{
        Month: "2012-01-01T00:00:00",
        Quarter: 1,
        Complaints: defaultData[0].Complaints + defaultData[1].Complaints,
        UnitsSold: defaultData[0].UnitsSold + defaultData[1].UnitsSold
      },
      {
        Month: "2012-04-01T00:00:00",
        Quarter: 2,
      },
      {
        Month: "2012-07-01T00:00:00",
        Quarter: 3,
        Complaints: defaultData[2].Complaints,
        UnitsSold: defaultData[2].UnitsSold
      }
    ];

    var result = scope.getData();

    expect(result).toEqual(expected);
  });

  it('should return graph data for quarterly', function () {
    var expected = [{
      color: ['lightblue'],
      values: [{
          "Month": "2012-01-01T00:00:00",
          "Cpmu": 6.4267486140803465
        },
        {
          "Month": "2012-04-01T00:00:00",
          "Cpmu": null
        },
        {
          "Month": "2012-07-01T00:00:00",
          "Cpmu": 12.12591550662075

        }
      ]
    }];
    expect(scope.graphData).toEqual(expected);
  });
});

'use strict';

describe('Controller: RawCtrl', function () {

  // load the controller's module
  beforeEach(module('s4rbInterviewApp'));

  var MainCtrl,
    RawCtrl,
    mainScope,
    rawScope;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    mainScope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: mainScope
    });
    rawScope = mainScope.$new();
    RawCtrl = $controller('RawCtrl', {
      $scope: rawScope
    });

  }));


  it('should return 1 CPMU when give a million units and 1 complaint', function () {
    var result = rawScope.toCPMU({
      Complaints: 1,
      UnitsSold: 1000000
    });

    expect(result).toBe(1);
  });

  it('should return the same data for "getData()" as is in MainCtrls data field', function() {
    var result = rawScope.getData();

    expect(result).toBe(mainScope.data);
  })

});

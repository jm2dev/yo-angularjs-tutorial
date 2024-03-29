'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('yoAngularjsTutorialApp'));
  // load the BootstrapUI module
  beforeEach(module('ui.bootstrap')); // Add this line

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(4);
  });
});

describe('Controller: TodoController', function() {
  beforeEach(module('yoAngularjsTutorialApp')); // will be run before each it() function

  // we don't need the real factory here. so, we will use a fake one.
  var mockService = {
    notes: ['note1', 'note2'], //just two elements initially
    get: function() {
      return this.notes;
    },
    put: function(content) {
      this.notes.push(content);
    }
  };

  // now the real thing: test spec
  it('should return notes array with two elements initially and then add one',
    inject(function($rootScope, $controller) { //injects the dependencies
      var scope = $rootScope.$new();

      // while creating the controller we have to inject the dependencies too.
      var ctrl = $controller('TodoController', {$scope: scope, notesFactory:mockService});

      // the initial count should be two
      expect(scope.notes.length).toBe(2);

      // enter a new note (Just like typing something into text box)
      scope.note = 'test3';

      // now run the function that adds a new note (the result of hitting the button in HTML)
      scope.createNote();

      // expect the count of notes to have been increased by one!
      expect(scope.notes.length).toBe(3);
    })
  );
});

describe('notesFactory tests', function() {
  var factory;

  // excuted before each "it()" is run.
  beforeEach(function() {
    // load the module
    module('yoAngularjsTutorialApp');

    // inject your factory for testing
    inject(function(notesFactory) {
      factory = notesFactory;
    });

    var store = {
      todo1: 'test1',
      todo2: 'test2',
      todo3: 'test3'
    };

    spyOn(localStorage, 'getItem').andCallFake(function(key) {
      return store[key];
    });

    spyOn(localStorage, 'setItem').andCallFake(function(key, value) {
      return store[key] = value + '';
    });

    spyOn(localStorage, 'clear').andCallFake(function() {
      store = {};
    });

    spyOn(Object, 'keys').andCallFake(function(value) {
      var keys=[];

      for(var key in store) {
        keys.push(key);
      }

      return keys;
    });
  });

  // check to see if it has the expected function
  it('should have a get function', function() {
    expect(angular.isFunction(factory.get)).toBe(true);
    expect(angular.isFunction(factory.put)).toBe(true);
  });

  //check to see if it returns three notes initially
  it('should return three todo notes initially', function() {
    var result = factory.get();

    expect(result.length).toBe(3);
  });

  //check if it successfully adds a new item
  it('should return four todo notes after adding one more', function() {
    factory.put('Angular is awesome');

    var result = factory.get();
    expect(result.length).toBe(4);
  });
});

describe('filter tests', function() {
  beforeEach(module('yoAngularjsTutorialApp'));
  it('should truncate the input to 10 characters',
    //this is how we inject a filter by appending Filter to the end of the filter name
    inject(function(truncateFilter) {
      expect(truncateFilter('abcdefghijkl', 10).length).toBe(10);
    })
  );
});

// Este falla
describe('directive tests', function() {
  beforeEach(module('yoAngularjsTutorialApp'));
  xit('should set background to rgb(128, 128, 128)',
     inject(function($compile,$rootScope) {
       scope = $rootScope.$new();

       // get an element representation
       elem = angular.element("<span custom-color=\"rgb(128, 128, 128)\">sample</span>");

       // create a new child scope
       scope = $rootScope.$new();

       // finally compile the HTML
       $compile(elem)(scope);

       // expect the background-color css property to be desirabe one
       expect(elem.css("background-color")).toEqual('rgb(128, 128, 128)');
     })
    );
});

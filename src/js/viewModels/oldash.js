/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['jquery','accUtils', 'knockout', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojknockout','ojs/ojselectcombobox', 'ojs/ojbutton'],
 function($, accUtils,ko) {

    function DashboardViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
      self.value=ko.observable("green");
      self.val = ko.observableArray([]);
      // self.browsers = ko.observableArray([
      //   { value: 'Internet Explorer', label: 'Internet Explorer' },
      //   { value: 'Firefox', label: 'Firefox' },
      //   { value: 'Chrome', label: 'Chrome' },
      //   { value: 'Opera', label: 'Opera' },
      //   { value: 'Safari', label: 'Safari' }
      // ]);
      self.tags = ko.observableArray([
        { value: 'pets', label: 'pets' },
        { value: 'travel', label: 'travel' },
        { value: 'people', label: 'people' },
        { value: 'food', label: 'food' },
      ]);
      $.getJSON("http://localhost:3000/results.json", function(jsonout) {
        // console.log(json); // this will show the info it in firebug console
        self.tagsdict = jsonout
      }.bind(self));
      // self.tagsdict = {"1.png":["pets", "travel"], "2.png": ["food", "people"], "3.png":["people", "travel"]}
      // self.imToDisplay = ko.observableArray(["http://localhost:3000/1.png","http://localhost:3000/2.png","http://localhost:3000/3.png"])
      self.imToDisplay = ko.observableArray([])
      self.fetchImages = function(){
        console.log(self.tagsdict)
        finalImgs = []
        for (tag of self.val()) {
          for (img in self.tagsdict) {
            if(self.tagsdict[img].includes(tag)){
              finalImgs.push("http://localhost:3000/"+img)
            }
          }
        }
        self.imToDisplay(finalImgs)
      }
      self.searchButtonClick = function (event) {
        // self.clickedButton(event.currentTarget.id);
        self.fetchImages();
        console.log(self.val());
        // return true;
      }.bind(self);
      }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);

/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['jquery','accUtils', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojknockout','ojs/ojselectcombobox', 'ojs/ojbutton', 'ojs/ojknockout', 'ojs/ojtagcloud'],
 function($, accUtils,ko, ArrayDataProvider) {

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
      // self.tags = ko.observableArray([
      //   { value: 'pets', label: 'pets' },
      //   { value: 'travel', label: 'travel' },
      //   { value: 'people', label: 'people' },
      //   { value: 'food', label: 'food' },
      // ]);
      self.socialNetworkData =   [
        {
          "id": "Facebook",
          "total": 76.8,
          "url": "https://www.facebook.com"
        },
        {
          "id": "YouTube",
          "total": 66.4,
          "url": "https://www.youtube.com"
        },
        {
          "id": "Twitter",
          "total": 32.8,
          "url": "https://twitter.com"
        },
        {
          "id": "Instagram",
          "total": 28.5,
          "url": "https://instagram.com"
        },
        {
          "id": "Google+",
          "total": 22.7,
          "url": "https://plus.google.com"
        },
        {
          "id": "LinkedIn",
          "total": 16.6,
          "url": "https://www.linkedin.com"
        },
        {
          "id": "SnapChat",
          "total": 14.2,
          "url": "https://www.snapchat.com"
        },
        {
          "id": "Tumblr",
          "total": 11.5,
          "url": "https://www.tumblr.com"
        },
        {
          "id": "Vine",
          "total": 11.1,
          "url": "https://vine.co"
        },
        {
          "id": "WhatsApp",
          "total": 6.8,
          "url": "https://www.whatsapp.com"
        },
        {
          "id": "reddit",
          "total": 6.2,
          "url": "https://www.reddit.com"
        },
        {
          "id": "Flickr",
          "total": 5.4,
          "url": "https://www.flickr.com"
        },
        {
          "id": "Pinterest",
          "total": 1.5,
          "url": "https://www.pintrest.com"
        }
      ]
      // self.dataProvider = new ArrayDataProvider(self.socialNetworkData, {keyAttributes: 'id'});
      $.ajax({
        url: "http://localhost:3000/results.json",
        // url: "http://localhost:3000/fasterrcnnout1.json",
        dataType: 'json',
        async: false,
        success: function(jsonout) {
          // console.log(json); // this will show the info it in firebug console
          self.tagsdict = jsonout
          finalTagsArr = []
          finalTagsCloud = {}
            for (img in self.tagsdict) {
              for(elem in self.tagsdict[img]){
                if(!finalTagsArr.includes(elem)){
                  finalTagsArr.push(elem)
                }
                if(elem in finalTagsCloud){
                  finalTagsCloud[elem]+=1
                } else {
                  finalTagsCloud[elem]=1
                }
              }
            }
            finalObsArr = []
            for (tag of finalTagsArr){
              finalObsArr.push({"value": tag, "label": tag})
            }
            // self.tags = ko.observableArray(finalObsArr)
            self.tags = ko.observableArray(finalObsArr)
            finalTagsCloudArr = []
            for(tag1 in finalTagsCloud){
              newElem = {"id":tag1, "total":finalTagsCloud[tag1]}
              finalTagsCloudArr.push(newElem)
            }
            self.dataProvider = new ArrayDataProvider(finalTagsCloudArr, {keyAttributes: 'id'});

        }.bind(self)
      });
      // self.tags = ko.observableArray([])
      // $.getJSON("http://localhost:3000/results.json", function(jsonout) {
      //   // console.log(json); // this will show the info it in firebug console
      //   self.tagsdict = jsonout
      //   finalTagsArr = []
      //     for (img in self.tagsdict) {
      //       for(elem in self.tagsdict[img]){
      //         if(!finalTagsArr.includes(elem)){
      //           finalTagsArr.push(elem)
      //         }
      //       }
      //     }
      //     finalObsArr = []
      //     for (tag of finalTagsArr){
      //       finalObsArr.push({"value": tag, "label": tag})
      //     }
      //     // self.tags = ko.observableArray(finalObsArr)
      //     self.tags(finalObsArr)
      // }.bind(self));
      // self.tagsdict = {"1.png":["pets", "travel"], "2.png": ["food", "people"], "3.png":["people", "travel"]}
      // self.imToDisplay = ko.observableArray(["http://localhost:3000/1.png","http://localhost:3000/2.png","http://localhost:3000/3.png"])
      self.imToDisplay = ko.observableArray([])
      self.fetchImages = function(){
        console.log(self.tagsdict)
        finalImgs = []
        for (tag of self.val()) {
          for (img in self.tagsdict) {
            if(tag in self.tagsdict[img]){
              finalImgs.push("http://localhost:3000/"+img+".jpg")
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

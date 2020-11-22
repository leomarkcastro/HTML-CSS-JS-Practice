/*!
 * Javascript plugin that will tell how far 
 * a thing has been vertically scrolld.
 * 
 * Author: Casper Korsgaard
 * Git: https://github.com/hallojoe/scrolld
 * License: MIT
 */

(function (root, factory) {
  var pluginName = 'Scrolld';

  if (typeof define === 'function' && define.amd) {
      define([], factory(pluginName));
  } else if (typeof exports === 'object') {
      module.exports = factory(pluginName);
  } else {
      root[pluginName] = factory(pluginName);
  }
}(this, function (pluginName) {
  'use strict';
 
  /**
   * Scrolld Object
   * @constructor
   */
  function Scrolld(element) {
      this.element = !!element ? element : document;
  }

  // compute element scroll factor
  var getFactor = function(element) {    
    var result = 100;
    if(element.nodeType === 9) { // is #document 
      // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
      result = (element.documentElement.scrollTop + element.body.scrollTop) /  (element.documentElement.scrollHeight - element.documentElement.clientHeight);    
    }
    else { // other nodeTypes
      //var height = parseInt(getComputedStyle(element, null).getPropertyValue('height'), 10);      
      var height = element.getBoundingClientRect().height;
      result = element.scrollTop / (element.scrollHeight - height);
    }
    if(result <= 0)
      result = 0;
    if(result >= .98)
      result = 1;
    return result;
  }

  // Scrolld prototype
  Scrolld.prototype = {
      factor: function() {
        return getFactor(this.element);
      },
      percent: function() {
        return getFactor(this.element) * 100;
      }
  };

  // jQuery wrapper
  if(window.jQuery) {
      var $ = window.jQuery, options;
      $.fn[pluginName] = function () {
          options = {};
          return this.each(function() {
              if (!$.data(this, 'plugin_' + pluginName) ) {
                  options.element = this;
                  $.data(this, 'plugin_' + pluginName, new Scrolld(this, options));
              }
          });
      };
  }

  return Scrolld;
}));
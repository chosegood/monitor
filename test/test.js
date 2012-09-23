/*global describe:true, it:true */

var assert = require("assert"),
    monitor = require('../lib/monitor.js');

describe('monitor', function () {
  
  describe('watch', function () {

    it('should handle a null directory', function () {
        monitor.watch(null);
    });

    it('should handle an undefined directory', function () {
        monitor.watch(undefined);
    });

  });

});
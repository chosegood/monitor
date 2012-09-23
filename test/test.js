/*global describe:true, it:true */

var assert = require('assert'),
    monitor = require('../lib/monitor.js'),
    console = require('console');

describe('monitor', function () {
  
  describe('watch', function () {

    it('should handle a null directory', function () {
        monitor.watch(null);
    });

    it('should handle an undefined directory', function () {
        monitor.watch(undefined);
    });

    it('should handle the current directory', function () {
        monitor.watch('./');
    });

    it('should return if given an non-existant directory', function () {
        var test = monitor.watch('nonsense');
        console.log(test);
    });

  });

});
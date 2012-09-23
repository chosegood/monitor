/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true */

var fs = require('fs'),
  console = require('console');

function monitorChange(event, filename) {
  if (event === 'rename') {
    console.log('RENAMED:'+ filename);
  } else if (event === 'change') {
    console.log('CHANGED:'+ filename);
  } else {
    throw new Error('Unknown event type.');
  }
};

var monitor = module.exports = {

  watch: function(directorypath) {
    if (directorypath === null || directorypath === undefined) {
      return;
    }

    fs.exists(directorypath, function (exists) {
      if (exists) {
        var watcher = fs.watch(directorypath, monitorChange);
        return watcher;
      } else {
        console.log('Unable to find['+directorypath+']');
      }
    });
  }

}

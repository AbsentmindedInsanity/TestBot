module.exports.saveuserdatatojson = function(data) {
    var fs = require('fs');
    var fR = require('./jsonfilereader');

    let savedData = JSON.parse(fR.readJsonTextFile('characters.json'));
    let name = data.name; 
  };
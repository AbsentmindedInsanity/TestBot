module.exports.saveuserdatatojson = function(data) {
    var fs = require('fs');
    var fR = require('./jsonfilereader');
    let name = data.name + '.json';
    fs.writeFileSync(name, JSON.stringify(data));
  };
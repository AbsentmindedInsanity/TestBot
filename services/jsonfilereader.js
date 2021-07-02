module.exports.readJsonTextFile = function(file)
{
    var fs = require('fs');
    try {
        var textByLine = fs.readFileSync(file);
        return textByLine;
    } catch(error) {
        return null;
    }

};
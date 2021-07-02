module.exports.readTextFile = function(file)
{
    var fs = require('fs');
    var textByLine = fs.readFileSync(file).toString().split("\n");
    return textByLine;
};
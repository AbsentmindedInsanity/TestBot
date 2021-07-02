module.exports = {
    name: 'animal',
    description: 'A random animal',
    execute(msg, args) {

        const { uniqueNamesGenerator, animals} = require('unique-names-generator');

        let numN = args;
        
        if ((numN == null)||(numN == 0)||(numN == '')) {
            numN = 1;
        }

        var test = /^\d+$/.test(numN)
        if (!test) {
            msg.reply("Invalid entry");
            return null;
        }

        if (numN >= 51) {
            msg.reply("Too many requested animals, please reduce and try again");
            return null;
        }

        var nArr = [];

        for (var i = 0; i < numN; i+=1) {
            var nText = uniqueNamesGenerator({dictionaries: [animals], length: 1});
            nArr[i] = ' ' + nText + '\n';
        }

        var s = '';
        for(var i = 0; i < nArr.length; i += 1) {
            s += ' ' + nArr[i];
        }

        if (s.length >= 2000) {
            msg.reply(' Request too long, please enter a lower request number');
            return null;
        }

        msg.reply('\n' + s);
    },
  };
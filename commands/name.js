module.exports = {
    name: 'name',
    description: 'A random name',
    execute(msg, args) {

        const { uniqueNamesGenerator, names } = require('unique-names-generator');

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
            msg.reply("Too many requested names, please reduce and try again");
            return null;
        }

        var nArr = [];

        for (var i = 0; i < numN; i+=1) {
            var nText = uniqueNamesGenerator({dictionaries: [names], length: 1});
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
        //characterName = uniqueNamesGenerator({dictionaries: [names], length: 1});

        msg.reply('\n' + s);
    },
  };
  
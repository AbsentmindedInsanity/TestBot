module.exports = {
    name: 'proverb',
    description: 'A wise proverb to guide you',
    execute(msg, args) {
        const fR = require('../services/filereader.js');
        var proverbArray = fR.readTextFile("./commands/proverbs.txt");

        let numP = args;

        if ((numP == null)||(numP == 0)||(numP == '')) {
            numP = 1;
        }

        var test = /^\d+$/.test(numP)
        if (!test) {
            msg.reply("Invalid entry");
            return null;
        }

        if (numP >= 40) {
            msg.reply("Too many requested proverbs, please reduce and try again");
            return null;
        }

        var proverbs = [];
        var rand = Math.floor(Math.random() * 89);
        var provText = proverbArray[rand];
        proverbs[0] = '1: ' + provText;

        for (var i = 0; i < numP; i+=1) {
            rand = Math.floor(Math.random() * 89);
            provText = proverbArray[rand];
            while (proverbs.includes(provText)) {
                rand = Math.floor(Math.random() * 89);
                provText = proverbArray[rand];
            }
            proverbs[i] = (i+1) + ': ' + provText;
        }

        var s = '';
        for(var i = 0; i < proverbs.length; i += 1) {
            s += ' ' + proverbs[i];
        }

        if (s.length >= 2000) {
            msg.reply(' Request too long, please enter a lower request number');
            return null;
        }

        msg.reply(' ' + s);                     

    },
  };
  
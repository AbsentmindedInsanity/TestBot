module.exports = {
    name: 'quirk',
    description: 'A random quirk for a character',
    execute(msg, args) {
        const fR = require('../services/filereader.js');
        var quirkArray = fR.readTextFile("./commands/quirk.txt");

        let numQ = args;

        if ((numQ == null)||(numQ == 0)||(numQ == '')) {
            numQ = 1;
        }

        var test = /^\d+$/.test(numQ)
        if (!test) {
            msg.reply("Invalid entry");
            return null;
        }

        if (numQ >= 41) {
            msg.reply("Too many requested quirks, please reduce and try again");
            return null;
        }

        var quirks = [];

        for (var i = 0; i < numQ; i+=1) {
            var rand = Math.floor(Math.random() * 125);
            var qText = quirkArray[rand];
            quirks[i] = (i+1) + ': ' + qText;
        }

        var s = '';
        for(var i = 0; i < quirks.length; i += 1) {
            s += ' ' + quirks[i];
        }

        if (s.length >= 2000) {
            msg.reply(' Request too long, please enter a lower request number');
            return null;
        }

        msg.reply(' ' + s);                     

        //console.log("welp");
        // var rand = Math.floor(Math.random() * 125);
        // var provText = quirkArray[rand];
        // msg.reply(' ' + provText);
    },
  };
  
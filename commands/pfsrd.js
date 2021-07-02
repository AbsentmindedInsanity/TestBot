module.exports = {
    name: 'pf',
    description: '',
    execute(msg, args) {
        let fr = require('../services/filereader.js');
        let text = fr.readTextFile('./commands/pathfinderlinks.txt');

        let replyArr = '';
        let joinedargs = args.join('-');

        if (args.length > 0) {
                for (let i = 0; i < text.length; i++) {
                    args.forEach(word => {
                        if (text[i].includes(word)) {
                            //console.log(true + ' ' + text[i])
                            replyArr += text[i] + '\n';
                        }
                    });
                }
        } else {
            
            for (let i = 0; i<text.length; i++) {
                if (text[i].includes(joinedargs)) {
                    replyArr += text[i] + '\n';
                }
            }
        }

        replyArr = 'With your query of ' + joinedargs + ' we found: \n' + replyArr
        if (replyArr.length > 1900) {
            replyArr = replyArr.substring(0,1900);
        }

        console.log(replyArr.length);

        msg.reply(replyArr)
    }
  };

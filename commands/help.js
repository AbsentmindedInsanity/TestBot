module.exports = {
    name: 'help',
    description: 'Returns the current commands and their functions',
    execute(msg, args) {

        const com = require('./index');
        
        var comFront = {name: '', description: 'All commands start with .'};

        var curCom = [comFront, com.Ping, com.Proverb, com.Name, com.Animal, com.Country, com.Quirk, com.Roll];

        var helpStr = '';

        for (var i = 0; i < curCom.length; i+=1) {
            helpStr += '**'+ curCom[i].name + ': ' + '**' + curCom[i].description + '\n';
        }

        msg.reply(helpStr);                     

    },
  };
  
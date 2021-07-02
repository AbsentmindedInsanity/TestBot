module.exports = {
    name: 'chargen',
    description: 'Generate a character',
    execute(msg, args) {
        const characterdata = require('../services/savecharacterdata.js');
        const filereaders = require('../services/jsonfilereader');

        let filename = msg.author.username + '.json';
        
        if (filereaders.readJsonTextFile(filename)) {
            msg.reply('You already have a character' );
            return;
        }

        let characterdataobj = {
            name: msg.author.username,
            information: {
                health: 10,
                armor: 0,
                level: 1,
                location: 'home',
                state: 0,
                inventory: {}
            },
            gamestate: {
                home: {
                    basementdoor: false,
                    secretdoor: false,
                    chickensfed: false,
                    firestarted: false
                }
            },
            knownloc: {
                home: ' ',
                wildingforest: ' ',
            },
        }

        let value = characterdata.saveuserdatatojson(characterdataobj);

        msg.reply('Character created');                     
    },
  };
  
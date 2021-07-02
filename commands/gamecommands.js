const _ = require('lodash');
const characterdata = require('../services/savecharacterdata.js');
let movechar = require('../game_systems/travel');
let similarity = require("../game_systems/checkSimilarity");
let interact = require('../game_systems/interact');
const filereader = require('../services/jsonfilereader');

String.prototype.indexOfEnd = function(string) {
    var io = this.indexOf(string);
    return io == -1 ? -1 : io + string.length;
}

module.exports = {
  name: 'g',
  description: 'Play the game',
  execute(msg, args) {
    if (!filereader.readJsonTextFile(msg.author.username + '.json')) {
        msg.reply('You dont have a character, run .chargen to create one' );
        return;
    }

    let knownwords = JSON.parse(filereader.readJsonTextFile('./game_info_files/knownphrases.json'));

    knownwords = knownwords.knownwords;

    let value = args.join(' ');
    let destroyedValue = value;

    do {
        let command = '';
        let input = '';
        let playerObj = JSON.parse(filereader.readJsonTextFile(msg.author.username + '.json'));
        let obj = decodeUserInput(knownwords, destroyedValue);
        if (!obj) {
            msg.reply("We had trouble understanding your input");
            return;
        }
        input = destroyedValue.slice(destroyedValue.indexOf(obj.word) + obj.word.length + 1);
        command = obj.action;

        if (command == 'travel') {
            let travel = handleTravel(msg, input, movechar);
            return;
        } else if (command == 'open') {
            let open = handleOpen(input, playerObj)
            if (open) {
                msg.reply(open);
            }
            return;
        } else if (command == 'interact') {
            let open = handleOpen(input, playerObj)
            if (open) {
                msg.reply(open);
            }
            return;
        } else if (command == 'inspect') {
            let open = handleOpen(input, playerObj)
            if (open) {
                msg.reply(open);
            }
            return;
        } else if (command == 'locations') {
            msg.reply("Your location: " + playerObj.information.location)
            handleTravel(msg, null, movechar);
            return;
        }

        destroyedValue = destroyedValue.replace(obj.word, '');

    } while(destroyedValue);
        msg.reply('No Errors, reply success');                     
  },
};

function decodeDescriptionVars(val, player) {
    switch(val) {
        case '[name]':
          return player.author.username;
          break;
      default:
          return'';
    }
}
  
function decodeUserInput(knownwords, input) {
    input = input.toUpperCase();
    for (let i = 0; i < knownwords.length; i++) {
        if (input.includes(knownwords[i].word.toUpperCase())) {
            return knownwords[i]
        }
    }
    return false;
}

function handleTravel(msg, input, movechar) {
    let move = movechar.travelto(msg, input);
    if (!move) {
        msg.reply('Invalid Location');
        return;
    } else if (move && !input) {
        msg.reply('Available Locations:\n' + move);
        return;
    } else {
        let description = move.description;
        if (description.includes('[')) {
            do {
                let s = description.substring(description.indexOf("["), description.indexOf(']')+1);
                let decodedVar = decodeDescriptionVars(s, msg);
                description = description.replace(s, decodedVar);
            } while (description.includes('['));
        }
        msg.reply(description);
        return;
    }
}

function handleOpen(target, playerObj) {
    const playerloc = playerObj.information.location;

    //get the json objects
    let interactableObj = JSON.parse(filereader.readJsonTextFile('./game_info_files/interactables.json'));
    let locationObj = JSON.parse(filereader.readJsonTextFile('./game_info_files/locations.json'));

    for (let i = 0; i<Object.keys(interactableObj).length; i++) {
        let key = Object.keys(interactableObj)[i]
        console.log(similarity.checkSimilarity(interactableObj[key].name.toUpperCase(), target.toUpperCase()))
        if (similarity.checkSimilarity(interactableObj[key].name.toUpperCase(), target.toUpperCase()) > .8) {
            target = key;
            console.log(target);
        }
    }
    //if the players location contains the target and that object has the "open" command
    if (locationObj[playerloc].contains[target][0] == 'open') {
        //get the index location of the target
        let indexloc = Object.keys(locationObj[playerloc].contains).indexOf(target);
        console.log(indexloc)
        //get the player location object
        let playerstate = Object.keys(playerObj.gamestate[playerloc]);
        //get the specific location in the player location object
        playerstate = playerstate[indexloc];
        //set the specific target to have the true value
        playerObj.gamestate[playerloc][playerstate] = true;
        playerObj.knownloc[locationObj[playerloc].contains[target][1]] = ' ';
        characterdata.saveuserdatatojson(playerObj);
        console.log(target);
        let description = interactableObj[target].description + " " + locationObj[playerloc].contains[target][1];
        return description;
    }
    return false;
}

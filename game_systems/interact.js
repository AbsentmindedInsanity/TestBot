const { toLower } = require('lodash');
const _ = require('lodash');
const filereader = require('../services/jsonfilereader');
const characterdata = require('../services/savecharacterdata.js');

const subCommandList = ['open', 'talk', 'investigate']

String.prototype.indexOfEnd = function(string) {
    var io = this.indexOf(string);
    return io == -1 ? -1 : io + string.length;
}

module.exports.interactwith = function(player, target)
{
    if (!player) {
        console.log('ERROR IN TRAVEL: MISSING PLAYER');
        return false;
    }

    let playerObj = JSON.parse(filereader.readJsonTextFile(player.author.username + '.json'));
    let interactableObj = JSON.parse(filereader.readJsonTextFile('./game_info_files/interactables.json'));
    let locationObj = JSON.parse(filereader.readJsonTextFile('./game_info_files/locations.json'));
    
    let subcommand = target.substring(0,target.search(/[^\w\s]/g));
    let cleanedSub = toLower(subcommand.replace('|',' '));
    let cleanedTar = '';

    if (!target) {
        const availInteract = Object.keys(locationObj[playerObj.information.location].contains);
        let s = '';
        availInteract.forEach( i=> {
            s += i + ' ';
        })
        return s;
    }

    if (validSubCommand(cleanedSub)) {
        cleanedTar = toLower(target.substring(target.indexOf('|'), target.length));
        cleanedTar = cleanedTar.replace('|', ' ');
        cleanedTar = cleanedTar.slice(0,-1);
        cleanedTar = cleanedTar.slice(1);
    } else {
        cleanedTar = toLower(target.replace('|',' '));
        cleanedTar = cleanedTar.slice(0,-1);
    }

    if (!interactableObj[cleanedTar] || !locationObj[playerObj.information.location].contains[cleanedTar]) {
        return false;
    } 

    let value = executeSubCommand(playerObj, locationObj, cleanedSub, cleanedTar);
    console.log("value: " + value);

    return interactableObj[cleanedTar].description;
};

function validSubCommand(command) {
    let value = false;
    subCommandList.forEach( i => {
        if (i == command) {
            value = true;
        }
    })
    return value;
}

function executeSubCommand(player, location, command, target) {
    const playerloc = player.information.location;
    switch(command) {
        case 'open':
                if (location[playerloc].contains[target][0] == 'open') {
                    let indexloc = Object.keys(location[playerloc].contains).indexOf(target);
                    let playerstate = Object.keys(player.gamestate[playerloc]);
                    playerstate = playerstate[indexloc];
                    player.gamestate[playerloc][playerstate] = true;
                    player.knownloc[location[playerloc].contains[target][1]] = ' ';
                    characterdata.saveuserdatatojson(player);
                    return true;
                } else {
                    return 'You cannot do that';
                }
            break;
        case 'talk':

            break;
        case 'investigate':

            break;
        default:
            return false;
            break;
    }
}

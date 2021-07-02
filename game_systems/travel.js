
module.exports.travelto = function(player, location)
{
    const filereader = require('../services/jsonfilereader');
    const characterdata = require('../services/savecharacterdata.js');
    const similarity = require('./checkSimilarity');

    if (!player) {
        console.log('ERROR IN TRAVEL: MISSING PLAYER');
        return false;
    }

    let playerObj = JSON.parse(filereader.readJsonTextFile(player.author.username + '.json'));
    let locationList = JSON.parse(filereader.readJsonTextFile('./game_info_files/locations.json'));

    if (!location) {
        let currentLoc = locationList[playerObj.information.location];
        const availLocArr = Object.keys(currentLoc.connectsto);
        let s = '';
        availLocArr.forEach( i => {
            if (playerObj.knownloc[i]) {
               s += locationList[i].name + '\n'; 
            } else {
                s += '';
            }            
        })
        return s;
    }

    let cleanedLoc = location.toUpperCase();
    console.log(cleanedLoc);

    for (let i = 0; i<Object.keys(locationList).length; i++) {
        let key = Object.keys(locationList)[i]

        if (similarity.checkSimilarity(locationList[key].name.toUpperCase(), cleanedLoc) > .7) {
            cleanedLoc = key;
        }
    }

    if (!locationList[cleanedLoc]) {
        return false;
    }

    if (playerObj.information.location == cleanedLoc) {
        return locationList[cleanedLoc];
    }

    if (!locationList[playerObj.information.location].connectsto[cleanedLoc]) {
        return false;
    }

    if (!playerObj.knownloc[cleanedLoc]) {
        return false;
    }

    playerObj.information.location = cleanedLoc;

    if (!playerObj.gamestate[cleanedLoc]) {
        playerObj.gamestate[cleanedLoc] = locationList[cleanedLoc].basestate;
    }

    try {
        characterdata.saveuserdatatojson(playerObj);
        return locationList[cleanedLoc];
    } catch(error) {
        console.log(error);
        return false;
    }
};
module.exports = {
    name: 'mtg',
    description: 'Search for an MTG Card',
    execute(msg, args) {
        let cardName = args.join('+');
        let searchType ='';
        if (cardName.substring(0,1).toUpperCase() == 'E' && cardName.substring(1,2) == '+' ) {
            searchType = 'https://api.scryfall.com/cards/named?exact=';
            cardName = cardName.replace(cardName.substring(0,1), '');
        } else if (cardName.substring(0,1).toUpperCase() == 'R' && !cardName.substring(1,2) ) {
            searchType = 'https://api.scryfall.com/cards/random'
            cardName = '';
        } else if (cardName.substring(0,2).toUpperCase() == 'RC' && !cardName.substring(2,3)) {
            searchType = 'https://api.scryfall.com/cards/random?q=is%3Acommander'; 
            cardName = '';
        } else {
            searchType = 'https://api.scryfall.com/cards/named?fuzzy=';
            cardName = cardName.replace(cardName.substring(0,1), '');
        }
        const https = require('https');
        https.get(searchType + cardName, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data+=chunk;
            });

            resp.on('end',()=> {
                console.log(JSON.parse(data));
                data = JSON.parse(data);
                if (data.status == 404) {
                    https.get('https://api.scryfall.com/cards/search?order=name&q=' + cardName, (resp2) => { 
                        let data2 = '';
                        resp2.on('data', (chunk) => {
                            data2+=chunk;
                        });

                        resp2.on('end', ()=>{
                            data2 = JSON.parse(data2);
                            console.log(data2);
                            console.log('\n\n' + data2.data[0]);
                            msg.suppressEmbeds(true);
                            let s = '';
                            let length = data2.data.length;
                            if (length > 5) {
                                length = 5;
                            }
                            for (var i = 0; i < length; i++) {
                                s += data2.data[i].name + '\n' +'<' + data2.data[i].scryfall_uri + '>' +'\n\n';
                            }
                            msg.reply('\n' + s);
                        })

                    });
                } else {
                    msg.suppressEmbeds(true);
                    msg.reply('<'+data.scryfall_uri+'>', {files: [data.image_uris.normal]});
                }
            });
        }).on('error', (err) => {
            console.log("Error: " + err.message);
        });
    },
  };
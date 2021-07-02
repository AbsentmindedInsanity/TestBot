module.exports = {
    name: 'googlesearch',
    description: 'search on google',
    execute(msg, args) {

        let [ keyword, num] = args;

        if (!keyword) {
            msg.reply("You must include a keyword to search");
        }

        if (!num) {
            num = 1;
        }

        if (num > 20) {
            num = 20;
        }

        var options = {
          qs : {
            q : keyword,
            filter : 0,
            pws : 0
          },
          num : num
        };

        asyncsearchcall(options).then(result => {
          //console.log('returned value from async = ' + result);
          let resultstr = '';
          for (var i = 0; i < result.length; ++i) {
            //console.log(result[i]);
            resultstr += result[i].title + ' - ' + result[i].url + '\n';
          }
          msg.reply(resultstr);
        }).catch(err => {
          console.log(err);
        });
    },
  };


  async function asyncsearchcall(options) {
    const serp = require("serp");
    const links = await serp.search(options);
    return links;
  }
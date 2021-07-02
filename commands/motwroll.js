const Discord = require('discord.js');

module.exports = {
    name: 'mr',
    description: '',
    execute(msg, args) {
        let modifier = args[0];
        let add = true;

        if (!modifier){
          modifier = '0';
        }

        if (modifier[0] == '-') {
          add = false;
          modifier = parseInt(modifier.substring(1));
        } else if (modifier[0] == '+') {
          modifier = parseInt(modifier.substring(1));
        } else {
          modifier = parseInt(modifier);
        }

        let rolledNum1 = Math.floor(Math.random() * (6) + 1)
        let rolledNum2 = Math.floor(Math.random() * (6) + 1)

        let total = rolledNum1 + rolledNum2;

        if (add) {
          total = total + modifier;
        } else {
          total = total - modifier;
        }

        let replystring = '';

        if(total >= 7 && total < 10) {
          replystring = 'Partial Success';
        } else if (total >= 10) {
          replystring = 'Full Success';
        } else {
          replystring = 'Failure';
        }

        const exampleEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('MotW Roll Result')
	        .setDescription(replystring)
	        .addField('Result:', total, true)
          
        msg.reply(exampleEmbed);
     }
  };

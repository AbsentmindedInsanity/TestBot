const Discord = require('discord.js');

module.exports = {
    name: 'mr',
    description: '',
    execute(msg, args) {


        const exampleEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('MotW Roll Result')
	        .setDescription(replystring)
	        .addField('Result:', total, true)
          
        msg.reply(exampleEmbed);
     }
  };

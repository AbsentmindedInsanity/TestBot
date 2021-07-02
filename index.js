require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.DISCORD_TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {

  if (msg.content.charAt(0) == '.') {

	  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	  const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) {
      //msg.reply('eeeeyy im not programmed here!')
      return;
    };

    console.info(`Called command: ${command}`);

    try {
      bot.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
}
else {}
});

module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(msg, args) {
    var rand = Math.random() * 100;

    if (rand >= 95) {
      msg.reply('You know what? fuck this im out');
      return null;
    }
    msg.reply(' pong ');
  },
};

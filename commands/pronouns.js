module.exports = {
    name: 'pronouns',
    description: 'pronouns',
    execute(msg, args) {

        let roleName = args.join(' ');

        if (!roleName) {
            return;
        }

        if (roleName) {
            if (roleName == 'he/him'){

            } else if( roleName == 'test role 2') {

            } else if (roleName == 'she/her') {

            } else if (roleName == 'they/them') {

            } else {
                return;
            }
        }

        let role = msg.guild.roles.cache.find((role) => {
            return role.name == roleName;
        });

        if (!role) {
            msg.reply("No role found with that name");
            return;
        }

        let user = msg.guild.members.cache.get(msg.author.id);
        user.roles.add(role);

        msg.reply('Pronouns Set!')
    },
  };
  
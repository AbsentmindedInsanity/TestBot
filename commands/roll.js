const Discord = require('discord.js');
module.exports = {
    name: 'roll',
    description: '(number of dice)D(type of dice)',
    execute(msg, args) {
        let initialString = args.join('').toUpperCase();
        initialString = initialString.replace(/\s+/g, '');
        let orgString = initialString;
        let total = 0;
        let activeModifier = '';
        let rollArr = [];
        do {
            let workingValue = '';
            console.log(initialString.search( /[^\w\s]/g))
            if (initialString.search( /[^\w\s]/g ) > 0) {
                
                workingValue = initialString.substring(0,(initialString.search( /[^\w\s]/g ) + 1))
            } else {
                workingValue = initialString;
            }
            let [num, type] = workingValue.split('D');
            if (type) {
                type = type.replace(/[^\w\s]/g, '');
            }
            if (num) {
                num = num.replace(/[^\w\s]/g, '');
            }
            let rollTotal = 0;
            let rolledNums = [];
            if (num && type) {
                let container = handleRoll(num, type);
                rollTotal = container[0];
                rolledNums = container[1];
                rollArr.push(rolledNums);
            } else if (num && !type) {
                rollTotal = parseInt(num);
            }
            if (activeModifier) {
                switch(activeModifier) {
                    case '+':
                        total += parseInt(rollTotal);
                        break;
                    case '-':
                        total -= parseInt(rollTotal);
                        break;
                    default:
                        total += parseInt(rollTotal);
                        break;
                }
            } else {
                total += parseInt(rollTotal);
            }
            
            initialString = initialString.replace(workingValue, '');
            if (workingValue.slice(-1).search(/[^\w\s]/g) != -1) {
                activeModifier = workingValue.slice(-1);
            } else {
                activeModifier = '';
            }
        } while(initialString)

        var s = '';
        for (var i = 0; i < rollArr.length; i += 1) {
            if (i < (rollArr.length - 1)) {
                s += rollArr[i] + '   ';
            }
            else {
                s += rollArr[i] + ' ';
            }
        }

        const embedReply = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Roll Result')
            .setDescription(total)
            .addField('You Rolled: ', orgString, true)
            .addField('Dice Results: ', s, true)

        msg.reply(embedReply);
    }
  };

  function handleRoll(num, type) {
    let total = 0;
    let rolls = [];

    for (var i = 0; i < num; i+=1) {
        let rolledNum = Math.floor(Math.random() * (type) + 1)
        total += rolledNum;
        rolls.push(rolledNum);
    }
    return [total, rolls];
  }
  
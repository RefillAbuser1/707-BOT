const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
  if (message.content === 'rocks') {
    message.reply('docks!');
  }
});

bot.login(process.env.BOT_TOKEN);

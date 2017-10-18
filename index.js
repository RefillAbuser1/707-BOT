const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);

bot.user.setPresence({game: {name: '| prefix: !!help |', type:0 } });
});
 // Prefix settings
bot.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);
  // Add Command
  if (command === "add") {
    let numArry = args.map(n=> parseInt(n));
    let total = numArry.reduce( (p, c) => p+c);

    message.channel.sendMessage(total);
    
  } 
  if (command === "help") {
     message.channel.sendMessage("`List of commands:` ```say, website``` `| More commands soon! |`");
  }
  // list of shit
  if (command === "say") {
    message.channel.sendMessage(args.join(" "));
  }
  
  if (command === "website") {
     message.channel.sendMessage("Website: http://forums.mcservervote.net");
  }
  // Welcomer
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`${member} Welcome to PlaySales!`);
});

});

bot.login(process.env.BOT_TOKEN);

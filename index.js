const Discord = require("discord.js");
const playstore = new Discord.Client();
const config = require("./config.json");
const ffmpeg = require("FFMPEG");
const fs = require('fs');

playstore.on('ready', () => {
  console.log(`Bot has started, with ${playstore.users.size} users, in ${playstore.channels.size} channels of ${playstore.guilds.size} guilds.`);
  console.log(`Logged in as ${playstore.user.tag}!`);
  console.log(`PlayStores is online`);

playstore.user.setGame(`ps.h | I am in ${playstore.guilds.size} Servers`);
});
 // Prefix settings
playstore.on('message', message => {
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
  
  if (command === "h") {
    message.author.sendMessage("List of commands:");
    message.author.sendMessage("``ps.say (Says what you tell it to.)``");
    message.author.sendMessage("``ps.info (updates pretty much.)``");
    message.author.sendMessage("``ps.website (Says the website of playsales.)``");
    message.author.sendMessage("``ps.avatar (Posts a pic of your profile pic.)``");
    message.author.sendMessage("``ps.invite (Join my home discord server!)``");
    message.author.sendMessage("``ps.ping (Shows how fast the bot is.)``");
    message.reply("I'm sending you the help list right now!");
  }
  
  // list of shit
  if (command === "say") {
    message.channel.sendMessage(args.join(" "));
  }
  
  if (command === "website") {
    message.channel.sendMessage("Website: http://thegaming.services");
  }
 
  if (command === "info") {
    message.channel.sendMessage("ps.serverinfo | Adding soon! |");
  }
  // Shows persons profile picture
  if (command === "avatar") {
    message.reply(message.author.avatarURL);
  }
  
  if (command === "support") {
    message.author.sendMessage("Join for support: https://discord.gg/smUv2NJ");
  }
  
  if (command === "invite") {
    message.author.sendMessage("https://discordapp.com/oauth2/authorize?client_id=369956217977700353&scope=bot&permissions=0");
    message.reply("Adding me to another server ? Make sure to pass it on <3");
  }
  // Working ping code
  if (command === "ping") {
      message.channel.sendMessage('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }
  // Voice code (Songs)
playstore.on('message', message => {
  if (!message.guild) return;

  if (message.content === '/join') {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          message.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});
  
});
// Token for bot to run
playstore.login(process.env.BOT_TOKEN);

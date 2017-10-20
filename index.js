const Discord = require("discord.js");
const playstore = new Discord.Client();
const config = require("./config.json");

playstore.on('ready', () => {
  console.log(`Bot has started, with ${playstore.users.size} users, in ${playstore.channels.size} channels of ${playstore.guilds.size} guilds.`);
  console.log(`Logged in as ${playstore.user.tag}!`);
  console.log(`PlayStores is online`);

playstore.user.setGame(`ps.help | ${playstore.guilds.size} servers`);
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
  if (command === "help") {
    message.author.sendMessage("List of commands:");
    message.author.sendMessage("``ps.say (Says what you tell it to)``");
    message.author.sendMessage("``ps.info (updates pretty much)``");
    message.author.sendMessage("``ps.website (Says the website of playsales)``");
    message.author.sendMessage("``ps.avatar (Posts a pic of your profile pic)``");
    message.author.sendMessage("``ps.invite (Join my home discord server!)``");
    message.reply("I'm sending you the help list right now!");
  }
  
  // list of shit
  if (command === "say") {
    message.channel.sendMessage(args.join(" "));
  }
  
  if (command === "website") {
    message.channel.sendMessage("Website: http://forums.mcservervote.net");
  }
 
  if (command === "info") {
    message.channel.sendMessage("ps.serverinfo | Adding soon! |");
  }
  // Shows persons profile picture
  if (command === "avatar") {
    message.reply(message.author.avatarURL);
  }
  
  if (command === "invite") {
    message.author.sendMessage("Home of PlaySales bot: https://discord.gg/smUv2NJ");
    message.reply("I hope you enjoy my home discord server!");
  }

  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
 
});

playstore.login(process.env.BOT_TOKEN);

const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require("./request");
const getYouTubeID = require("/.get-youtube-id");
const config = require("./config.json");

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);

bot.user.setPresence({game: {name: '| prefix: !!commands |', type:0 } });
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
  if (command === "commands") {
     message.channel.sendMessage("Commands: say, list | More commands soon! |");
  }
  // list of shit
  if (command === "say") {
    message.channel.sendMessage(args.join(" "));
  }
  
  if (command === "list") {
     message.channel.sendMessage("Why, what list are you looking for? | ```Hint: There is no list```");
  }
  // New member notification
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.sendMessage(`${member}, Welcome to PlaySales!`);
});
  
  // Music
  if (command === "join") {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          message.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
    } else {
      message.channel.sendMessage('You need to join a voice channel first!');
    }
  }
// YouTube PlayList
var yt_api_key = "AIzaSyCfwF45YV_C2Npa8xWYNE5DvoxdDiQNC_M";

module.exports = {
    setApiKey: function (str) {
        yt_api_key = str;
    },
    search_video: function (query, cb) {
        request("https://www.gogleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURICompondent(query) + "&key=" + yt_api_key, function(error, response, body) {
            var json = JSON.parse(body);
            cb(json.items[0].id.videoId);
        });
    },
    isYoutubes: function (str) {
        return str.toLowerCase().indexOf("youtube.com") > -1;
    },

    getIDs: function (str, cb) {
        if (this.isYoutube(str)) {
            cb(getYouTubeID(str));
        } else {
            this.search_video(str, function(id) {
                cb(id);
            });
        }
    },
    getPlayListSongs: function (id, max, cb) {
        request("https://www.gogleapis.com/youtube/v3/playlistItems?part=id,snippet&playlistId=" + id + "&maxResults=" + max + "&key=" + yt_api_key, function(error, response, body) {
            var json = JSON.parse(body);
            var arr = [];
            json.items.forEach(function (e) {
                arr.push(e);
            });
            cb(arr.filter(function (a) {
                return a.snippet.title.toLowerCase() !== "private video" && a.snippet.title.toLowerCase() !== "deleted video";
            }));
        });
    },
    getPlayListMetaData: function (id, max, cb) {
        request("https://www.googdleapis.com/youtube/v3/playlists?part=snippet%2C+contentDetails&id=" + id + "&maxResults=" + max + "&key=" + yt_api_key, function(error, response, body) {
            cb(JSON.parse(body).items[0]);
        });
    }
};
  // spotify
module.exports = {
    authenticate: function(client_id, client_secret, cb) {
        var options = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                authorization: 'Basic ' + new Buffer(client_id + ":" + client_secret).toString('base64')
            },
            form: {
                grant_type: 'client_credentials'
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            const auth = JSON.parse(body);
            cb(auth.access_token);
        });

    },

    getPlayList: function(user, playlist, access_token, cb) {
        var options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/users/' + user + '/playlists/' + playlist + '/tracks',
            headers: {
                authorization: 'Bearer ' + access_token
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);

            cb(JSON.parse(body));
        });

    }
}

});
bot.login(process.env.BOT_TOKEN);

const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-getinfo');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.once('ready', () => {
    console.log("Logged in as ", client.user.username + "#" + client.user.discriminator)
});

// https://github.com/stuyy/discordjs-youtube-tutorials
// https://discord.js.org/#/docs/main/stable/class/VoiceChannel


setTimeout(drinking_time,3600)
function drinking_time() {
    try {
        client.channels.cache.get("911272250106339388").send("Drinking Time") //, {embed: {image: {url: "https://imgur.com/XcGqJ3z",}}})
    }//mess.react('<:blobreach:123456789012345678>');
    finally { return 0;}
};

function playSong(msg, song, voiceChannel, loop=false) {
    if (voiceChannel) {
        voiceChannel.join().then(connection => {
            if (!vol) {
                var vol = 50 / 100
            }

            this.dispatcher = connection.play(ytdl(song, { volume: 0.5, filter : 'audioonly', type: 'opus' }));
            
            this.dispatcher.on("start", () => {
                getInfo(song).then(info => {
                    msg.channel.send(`Now playing: ${info.items[0].title}`);
                  })
            });
 
            this.dispatcher.on("finish", () => {
                if (loop) {
                    playSong(msg, song, voiceChannel, loop);
                } 
                
                else {
                    voiceChannel.leave();
                    msg.channel.send("Bye, Bye....");
                }
            });
        });
        } else {
            return msg.reply("You need to be in a voice channel to play music!")
        };
    }

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.split(" ");
    const command = args.shift().toLowerCase()
    const voiceChannel = msg.member.voice.channel;
//     var playing = []

    if (command === prefix + "p") {
        if (!args[0]) return msg.reply("Please provide link")
        else if (args[0].startsWith("https://")){
            playSong(msg, args[0], voiceChannel, loop);
        } else {
            msg.channel.send("Searching")
            getInfo(args.join(" ")).then(info => {
                playSong(msg, info.items[0].webpage_url, voiceChannel, loop);
            })
        }
    }

    else if (command == prefix + "loop") {
        if (loop) {
            var loop = false;
            msg.channel.send("Loop disabled");
        }
        else {
            var loop = true;
            msg.channel.send("Loop enabled");
        };
        
    }


    else if (command === prefix + "leave"){
        msg.channel.send("Bye, Bye....");
        voiceChannel.leave();
//            playing.length = 0;
    }

    else if (command === prefix + "pause") {
        if (this.dispatcher) {
            this.dispatcher.pause();
         } else {
            msg.channel.send("Nothing is playing");
         }
         
     }
 
     else if (command === prefix + "resume") {
         if (this.dispatcher) {
            this.dispatcher.resume();
         } else {
            msg.channel.send("Nothing is paused");
         }
         
     }
 

/*     else if (command === prefix + "stop"){
        //if something playing [make array (stack)]
        if (playing.length > 0 && this.dispatcher) {
            this.dispatcher.destroy()
        } else {
            msg.reply("Nothing playing")
        };
    }
 */
    else if (command === prefix + "volume") {
        if (isNaN(args[0])) {
            msg.reply("You need enter number");
        }
        else if (args[0]) {
            var vol = Number(args[0]) / 100;
            msg.channel.send("Volume successfully changed, default 75");
        } else {
            msg.reply("You need enter single number");
        };
    }

    else if (command === prefix + 'avatar') {
        if (!msg.mentions.users.size) {
            return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        };
        const avatarList = msg.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
        });
        msg.channel.send(avatarList);
     }

     else if (command === prefix + "tag") {
        if (msg.channel.name === "general") return msg.reply("not allowed in general");
        var taggedUser = msg.mentions.users.first()
        var count = 5

        if (taggedUser) {
            if (args[1]) {
                if (isNaN(args[1])) return msg.reply("You need to use number");
                else if (Number(args[1]) > 20) return msg.reply("More than 20 is not allowed");

                else {
                    var count = Number(args[1])
                };
            }
            else if (args[2]) {
                if (isNaN(args[2])) return msg.reply("You need to use number")

                else if (Number(args[2]) > 10) return msg.reply("More than 10 is not allowed");

                else {
                    var count = Number(args[2]);
                };
            }

            for (let i = 0; i < count; i++) {
                msg.channel.send(`Get Your Ass Over Here: <@${taggedUser.id}>`)
            };
        } else {
            msg.reply("You need tag someone");
        };
     }

})

client.login(token);


      /* meme post
     run: async (client, msg, args) => {

    const subReddit = ["dankmeme", "meme", "me_irl"]
    const random = subReddit[Math.floor(Math.random() * subReddit.length)]

    const img = await randomPuppy(random);
    const embed = new RichEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle('From /r/' + random)
        .setURL('https://reddit.com/r/' + random)
    msg.channel.send(embed) */

module.exports = {
            a: '🇦', b: '🇧', c: '🇨', d: '🇩',
            e: '🇪', f: '🇫', g: '🇬', h: '🇭',
            i: '🇮', j: '🇯', k: '🇰', l: '🇱',
            m: '🇲', n: '🇳', o: '🇴', p: '🇵',
            q: '🇶', r: '🇷', s: '🇸', t: '🇹',
            u: '🇺', v: '🇻', w: '🇼', x: '🇽',
            y: '🇾', z: '🇿', 0: '0️⃣', 1: '1️⃣',
            2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣',
            6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣',
            10: '🔟', '#': '#️⃣', '*': '*️⃣',
            '!': '❗', '?': '❓',
};

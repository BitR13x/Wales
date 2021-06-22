const Discord = require('discord.js');
const DisTube = require('distube');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.once('ready', () => {
    console.log("Logged in as ", client.user.username + "#" + client.user.discriminator)
});



// https://github.com/stuyy/discordjs-youtube-tutorials
// https://discord.js.org/#/docs/main/stable/class/VoiceChannel

function joinChannel(msg, voiceChannel) {
    // if joined just play if !joined join and play
    if (voiceChannel) {
        voiceChannel.join()
        msg.channel.send("Joined channel")
    //connection.play(broadcast);
    } else {
        msg.reply("You need to be in a voice channel")
    }
}

function setVolume(msg, args) {
    if (isNaN(args[0])) {
        msg.reply("You need enter number")            
    }
    else if (args[0]) {
        var vol = Number(args[0]) / 100
        msg.channel.send("Volume successfully changed, default 75")
    } else {
        msg.reply("You need enter single number")
    };
}



client.on('message', async (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.split(" ");
    const command = args.shift().toLowerCase()
    const voiceChannel = msg.member.voice.channel;
    const distube = new DisTube(client);

    const status = (queue) => `Volume: \`${vol}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

    distube.on("playSong", (msg, queue, song) => msg.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    

    if (command === prefix + "p") {
        if (!vol) {
            var vol = 75 / 100
        }
        if (voiceChannel) {
            voiceChannel.join().then(connection => {
    
            
            let queue = distube.getQueue(msg);
            console.log(queue)
            //msg.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            //    `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            //).join("\n"));
            console.log(args.join(" "))
            distube.play(String(args.join(" ")));
    
                    
            });
            } else {
                return msg.reply("You need to be in a voice channel to play music!")
            };    
    }       

    else if (command === prefix + 'join') {
        joinChannel(msg, voiceChannel)
    }
    
    else if (command === prefix + "leave"){
        try {
            voiceChannel.leave()
            playing.length = 0;
        }
        catch {
            msg.reply("I am not connected")
        };
    }

    else if (command === prefix + "stop"){
        distube.stop(msg)
    }
    else if (command === prefix + "skip") {
        distube.skip(msg)
        msg.channel.send("Song skipped")
    }

    else if (command === prefix + "pause") {
        try {
            distube.pause(msg)
        } catch {
            msg.reply("Nothing playing")
        };
    } 
    else if (["loop", "repeat"].includes(command)) {
        let mode = distube.setRepeatMode(msg, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        msg.channel.send("Set repeat mode to `" + mode + "`");
    }

    else if (command === prefix + "resume") {
        try {
            distube.resume(msg)
        } catch {
            msg.reply("Nothing playing")
        };
        
    }

    else if (command === prefix + "volume") {
        setVolume(msg, args)
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
                if (isNaN(args[1])) return msg.reply("You need to use number")
                else if (Number(args[1]) > 20) return msg.reply("More than 20 is not allowed")
                
                else {
                    var count = Number(args[1])
                };
            } 
            else if (args[2]) {
                if (isNaN(args[2])) return msg.reply("You need to use number")
                
                else if (Number(args[2]) > 10) return msg.reply("More than 10 is not allowed")
                
                else {
                    var count = Number(args[2])
                };
            }
    
            for (i = 0; i < count; i++) {
                msg.channel.send(`Get Your Ass Over Here: <@${taggedUser.id}>`)
            };
        } else {
            msg.reply("You need tag someone")
        };
     }

})

client.login(token);
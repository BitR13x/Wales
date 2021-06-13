const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');

const client = new Discord.Client();
// const config = require('./config.json');

const settings = {
    prefix: '?',
    token: 'ODMzNjM5NDIwMDQ1MDMzNDky.YH1RNg.gHK2gTKycfeMwBhteAKDqqseynA'
};

const prefix = settings.prefix

//const dispatcher = broadcast.play('./audio.mp3');

client.once('ready', () => {
	console.log('Ready!');
});
client.login(settings.token);

//lisen for messages
client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.split(" ");
    const command = args.shift().toLowerCase()
    const voiceChannel = msg.member.voice.channel;
    var playing = []
    var music = "Believer"
    // make better playing musics
    // possible to dont have tracker 
    // https://stackoverflow.com/questions/56718658/how-to-check-if-bot-is-connected-to-a-channel-discord-py


    if (command === prefix + "p") {   
        if (voiceChannel) {
            voiceChannel.join().then(connection => {
                if (!vol) {
                    var vol = 75 / 100
                }
                
                const dispatcher = connection.play(`./${music}.mp3`, { volume: vol });
                msg.channel.send(`now playing: ${music}`);

                //const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', { filter : 'audioonly' });
                //const dispatcher = connection.playStream(stream, streamOptions);

                dispatcher.on("start", () => {
                    console.log("audio playing")
                    playing.push(music)
                });

                dispatcher.on("finish", () => {
                    console.log("left channel");
                    playing.pop()
                    //voiceChannel.leave();
                });
            });
        } else {
            return msg.reply("You need to be in a voice channel to play music!")
        };
    }

    else if (command === prefix + 'join') {
        // if joined just play if !joined join and play
        if (voiceChannel) {
            msg.channel.send("Joined channel")
            voiceChannel.join()
        //connection.play(broadcast);
        } else {
            msg.reply("You need to be in a voice channel")
        }
    }
    
    else if (command === prefix + "leave"){
        //if not already joined
//        if (loop) {
//            var loop = false
//        }
        try {
            voiceChannel.leave()
            playing.length = 0;
        }
        catch {
            msg.reply("I am not connected")
        };
    }

    else if (command === prefix + "stop"){
        //if something playing [make array (stack)]
        if (playing.length > 0) {
            dispatcher.destroy()
        } else {
            msg.reply("Nothing playing")
        };
    }

    else if (command === prefix + "pause") {
        try {
            console.log(playing)
            dispatcher.pause()
        } catch {
            msg.reply("Nothing playing")
        };
    }

    else if (command === prefix + "resume") {
        try {
            dispatcher.resume()
        } catch {
            msg.reply("Nothing playing")
        };
        
    }

    else if (command === prefix + "volume") {
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

    else if (command === prefix + 'test') {
        msg.reply('just testing mate'); 
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
                if (isNaN(args[1])) {
                    return msg.reply("You need to use number")
                }
                else if (Number(args[1]) > 20) {
                    return msg.reply("More than 20 is not allowed")
                } else {
                    var count = Number(args[1])
                };
            } 
            else if (args[2]) {
                if (isNaN(args[2])) {
                    return msg.reply("You need to use number")
                }
                else if (Number(args[2]) > 10) {
                    return msg.reply("More than 10 is not allowed")
                } else {
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
// https://stackoverflow.com/questions/47045805/playing-an-audio-file-using-discord-js-and-ytdl-core

 
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


/* 
const streamOptions = { seek: 0, volume: 1 };
var voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection => {
            console.log("joined channel");
            const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', { filter : 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
            dispatcher.on("end", end => {
                console.log("left channel");
                voiceChannel.leave();
            });
        }).catch(err => console.log(err)); 
        */


        /* module.exports = {
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
        }; */
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');


client.login(token);

client.once('ready', () => {
    console.log("Logged in as ", client.user.username + "#" + client.user.discriminator)
});

client.on('message', msg => {
    const args = msg.content.split(" ");
    const command = args.shift().toLowerCase()
    const voiceChannel = msg.member.voice.channel

    if (command === prefix + 'join') {
        voiceChannel.join()
    }
})
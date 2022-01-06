const Discord = require("discord.js");
const config = require('./config.json');

const client = new Discord.Client();

const prefix = "md!";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    
});
client.on("message", message => {
    if(message.author.bot || !message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if(command == "abv"){
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift();

        message.channel.send(`Message received ***${command}***  args : ${args}`);
    }
});

client.login(config.token);
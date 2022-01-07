const { Client, Intents, Formatters } = require('discord.js');
const config  = require('./config.json');

const got = require('got');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = "md!";
const alphabetBeginWiki = 11;

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

        if(args.length != 1){
            message.channel.send("Argument needed");

            return ;
        }
    
        const wikiUrl= 'https://fr.wikipedia.org/wiki/Liste_d%27abr%C3%A9viations_en_m%C3%A9decine';
        
        const isMidi = (link) => {
            // renvoie false si l'attribut href n'est pas présent
            if(typeof link.href === 'undefined') { return false }
            
            return link.href.includes('.mid');
        };
        
        const noParens = (link) => {
            // Expression Régulière qui détermine si le texte comporte des parenthèses.
            const parensRegex = /^((?!\().)*$/;
            return parensRegex.test(link.textContent);
        };

        
        
        (async () => {
            const response = await got(wikiUrl);
            const dom = new JSDOM(response.body);
            
            const nodeList = [...dom.window.document.querySelectorAll('ul')];

            const letterList = nodeList[alphabetBeginWiki+(args[0].toUpperCase().charCodeAt(0))-64].textContent;

            // console.log(args[0].toUpperCase().charCodeAt(0)-64);
            const allAbOfLetter = letterList.split("\n");
                        
            // message.channel.send(element[0]);

            var found = false;

            for(let i = 0; i < allAbOfLetter.length; i++) {
                var element = allAbOfLetter[i].split(":");
                element = element[0].toString().replace(/\s/g,'');
                // console.log(element);
                // console.log(args[0]);
                if(element.toString().toLowerCase() === args[0].toLowerCase()){
                    found = true;
                    message.channel.send(allAbOfLetter[i]);
                    break ;
                }
            }       
            if(!found){ message.channel.send("Couldn't find abbreviation "); }
               
        })();   

    }
});

client.login(config.token);
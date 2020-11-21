const fs = require('fs');
const Discord = require('discord.js');
const si = require('stock-info');
const { prefix, token, YMFchannel, NQFchannel, ESFchannel, GCFchannel, CLFchannel } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const updatefuture = (ticker, channelID) => {
    updatechannel = (stock) => {
        const channel = client.channels.cache.get(channelID);
        const price = stock.regularMarketPrice.toString();
        const change = stock.regularMarketChange.toString().substr(0,6);
        const changepercent = stock.regularMarketChangePercent.toString().substr(0,5);
        channel.setName(price + " " + change + "(" + changepercent + "%)");
    }

    si.getSingleStockInfo(ticker).then(
        updatechannel
    )
} 

const updateallfutures = () => {
    updatefuture("YM=F", YMFchannel);
    updatefuture("NQ=F", NQFchannel);
    updatefuture("ES=F", ESFchannel);
    updatefuture("CL=F", CLFchannel);
    updatefuture("GC=F", GCFchannel);
}

var aufinterval;

const autoupdatefutures = () => {
    aufinterval = setInterval(updateallfutures(), 10 * 60 * 1000)
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {

    if (message.channel.name != "vision-futures" || message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (commandName === "updateallfutures") {
            updateallfutures();
            return message.channel.send("Futures have been updated.");
        } else if (commandName === "autoupdate") {
            autoupdatefutures();
           return message.channel.send("Updating futures every 10 minutes.");
        } else if (commandName === "stopautoupdate") {
            clearInterval(aufinterval);
            return message.channel.send("Stopped auto updating futures.");
        } else if (commandName === "kill") {
            process.exit();
        }
    }

    if (!client.commands.has(commandName)) 
        return message.channel.send("The command either doesn't exist, or you do not have the permissions to use the command.");

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
}
});

client.login(token);
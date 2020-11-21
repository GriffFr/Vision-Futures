/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const si = require('stock-info');

module.exports = {
	name: 'futurereport',
	description: 'Fetches information about various futures then sends them in an embed',
	execute(message, args) {
        const futurereport = (stocks) => {
            const report = new Discord.MessageEmbed()
                .setColor("gold")
                .setTitle("Future Report")
                .setAuthor("Vision Futures")
                .setDescription("The following prices were retrieved from the Yahoo Finance API")
                .addFields(
                    { name: 'YM=F - Dow Jones', value: stocks[0].regularMarketPrice + " " + stocks[0].regularMarketChange + "(" + stocks[0].regularMarketChangePercent + "%)"},
                    { name: 'NQ=F - NASDAQ', value: stocks[1].regularMarketPrice + " " + stocks[1].regularMarketChange + "(" + stocks[1].regularMarketChangePercent + "%)"},
                    { name: 'ES=F - S&P 500', value: stocks[2].regularMarketPrice + " " + stocks[2].regularMarketChange + "(" + stocks[2].regularMarketChangePercent + "%)"},
                    { name: 'CL=F - Crude Oil', value: stocks[3].regularMarketPrice + " " + stocks[3].regularMarketChange + "(" + stocks[3].regularMarketChangePercent + "%)"},
                    { name: 'GC=F - Gold', value: stocks[4].regularMarketPrice + " " + stocks[4].regularMarketChange + "(" + stocks[4].regularMarketChangePercent + "%)"},
                )
                .setFooter("Copyright © 2020 Trade With Vision")
                .setTimestamp()
                message.channel.send(report);
        }

        si.getStocksInfo(["YM=F","NQ=F","ES=F","CL=F","GC=F"]).then(
            futurereport
        )
	},
};
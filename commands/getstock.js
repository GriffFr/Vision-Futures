/* eslint-disable no-unused-vars */
const si = require('stock-info');

module.exports = {
	name: 'getstock',
	description: 'Fetches a stock by the ticker and sends a message with the price of the stocks',
	execute(message, args) {
        const ticker = args[0].toUpperCase();
        const getstock = (stock) => {
            const price = stock.regularMarketPrice;
            message.channel.send(`The current market price of ${ticker} is: ${price}`);
        }
        
        si.getSingleStockInfo(args[0]).then(
            getstock
        )
	},
};
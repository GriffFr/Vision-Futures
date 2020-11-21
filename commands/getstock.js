/* eslint-disable no-unused-vars */

module.exports = {
	name: 'getstock',
	description: 'Fetches a stock by the ticker and sends a message with the price of the stocks',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
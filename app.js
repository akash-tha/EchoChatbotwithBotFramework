/*—————————————————————————–
A simple echo bot for the Microsoft Bot Framework. 
—————————————————————————–*/

var restify = require('restify');
var builder = require('botbuilder');
require('dotenv').config({silent: true});
const { BotFrameworkAdapter } = require('botbuilder');

// This bot's main dialog.

const { EchoBot } = require('./bot');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
console.log('%s listening to %s', server.name, server.url); 
});

// Create adapter.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Create the main dialog.
var bot = new EchoBot();

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await bot.run(context);
    });
});
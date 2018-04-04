require('dotenv-extended').load();
const builder = require('botbuilder');
var restify = require('restify');
require('./config.js')();
const searchHelpers = require('./searchHelpers.js');
const messageHelper = require('./messageHelper.js');
var request = require('request');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
    gzipData: true
});

//=========================================================
    // Bots Dialogs
    //=========================================================
var inMemoryStorage = new builder.MemoryBotStorage();
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Hello Chamberino!")
        builder.Prompts.text(session, "Hey, which organization are you looking for?" );
    },

    function (session, results) {
        //Sets name equal to resulting input
        global.keyword = results.response
        session.send(
        searchHelpers.searchQuery(keyword, (err, result) => {
            if (err) {
                console.log(`Search query failed with ${err}`);
                session.endConversation(`Sorry, I had an error when talking to the server.`);
            } else if (result && result.length > 0) {
                const message =  messageHelper.getMusiciansCarousel(session, result);
                session.endConversation(message);
            } else {
                const message = "I couldn't find any organizations by that name";
                session.endConversation(message);
            }
            session.reset('/');
        })
)}
]).set('storage', inMemoryStorage);

 // Setup Restify Server
 
 var server = restify.createServer();
 server.listen(process.env.port || 3978, function () {
     console.log('%s listening to %s', server.name, server.url);
 });
 server.post('/api/messages', connector.listen());
 bot.use(builder.Middleware.dialogVersion({ version: 0.2, resetCommand: /^reset/i }));


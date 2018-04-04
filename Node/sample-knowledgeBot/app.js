require('dotenv-extended').load();

require('./config.js')();
require('./connectorSetup.js')();
require('./searchHelpers.js')();
require('./dialogs/results.js')(); 
require('./dialogs/musicianExplorer.js')();
require('./dialogs/musicianSearch.js')();


var request = require('request');

// Entry point of the bot
bot.dialog('/', [
    function (session) {
        session.replaceDialog('/promptButtons');
    }
]);

bot.dialog('/promptButtons', [
    function (session) {
        var choices = ["Search organizations"]
        builder.Prompts.choice(session, "Hey! How can I help you today?", choices);
    },
    function (session, results) {
        if (results.response) {
            var selection = results.response.entity;
            // route to corresponding dialogs
            switch (selection) {
                case "Organization Explorer":
                    session.replaceDialog('/musicianExplorer');
                    break;
                case "Organization Search":
                    session.replaceDialog('/musicianSearch');
                    break;
                default:
                    session.reset('/');
                    break;
            }
        }
    }
]);




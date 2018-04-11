var autolinkJs = require("autolink-js");
const builder = require('botbuilder');
var mailtoLink = require('mailto-link');

module.exports = {
    getMusiciansCarousel: (session, items) => {
        // results found
        var message = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel);
        items.forEach((organization) => {
            // custom card for organization
            // update with your specific fields for output
            message.addAttachment(
                new builder.HeroCard(session)
                    .title(organization.name)
                    .subtitle(mailtoLink({to:organization.emailaddress1, subject: 'Hello'}))
                    .text('Main Contact: ' + organization.primarycontactidyominame + " | " + 'Phone: ' + organization.telephone1+ " | " + organization.websiteurl.autoLink()) 
            );
        })
        return message;
    }
}
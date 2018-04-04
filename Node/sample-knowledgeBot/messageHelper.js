const builder = require('botbuilder');

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
                    .subtitle("email: " + organization.emailaddress1)
                    .text('Main Contact: ' + organization.primarycontactidyominame + " | " + 'Phone: ' + organization.telephone1+ " | " + organization.websiteurl)  
            );
        })
        return message;
    }
}
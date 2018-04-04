
module.exports = function () {
    bot.dialog('/showResults', [
        function (session, args) {
            var msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel);
                args.result['value'].forEach(function (organization, i) {
                    msg.addAttachment(
                        new builder.HeroCard(session)
                            .title(organization.name)
                            .subtitle("email : " + organization.emailaddress1)
                            .text('Main Contact: ' + organization.primarycontactidyominame + " | " + 'Phone: ' + organization.telephone1+ " | " + organization.websiteurl)
                    );
                })
                session.endDialog(msg);
        }
    ])
}
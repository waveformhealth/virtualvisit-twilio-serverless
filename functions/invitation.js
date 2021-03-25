exports.handler = async function(context, event, callback) {
    const twilioClient = context.getTwilioClient();

    const {
        phone,
        room,
    } = event;

    try {
        await twilioClient.messages.create({
            body: `You've been invited to a Virtual Visit: ${context.INVITE_BASE_URL}?room=${room}`,
            to: phone,
            from: context.PHONE_NUMBER,
        });
    } catch (err) {
        console.log(err);
        callback(err);
    }

    callback();
  };
  
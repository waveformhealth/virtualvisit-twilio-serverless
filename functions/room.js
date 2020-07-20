exports.handler = async function(context, event, callback) {
    const twilioClient = context.getTwilioClient();
    const room = await twilioClient.video.rooms.create();

    callback(null, {
        sid: room.sid,
    });
  };
  
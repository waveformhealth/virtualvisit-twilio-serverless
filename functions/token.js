const Twilio = require('twilio');

const AccessToken = Twilio.jwt.AccessToken;

exports.handler = function(context, event, callback) {
    const {
        username,
        room,
    } = event;

    const token = new AccessToken(
        context.ACCOUNT_SID,
        context.API_KEY,
        context.API_SECRET,
        {
            identity: username,
        },
    );
    token.addGrant(new AccessToken.VideoGrant({
        room,
    }));
    
    callback(null, {
        token: token.toJwt(),
    });
  };
  
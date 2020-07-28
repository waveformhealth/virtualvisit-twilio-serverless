const Twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');

const AccessToken = Twilio.jwt.AccessToken;

exports.handler = function(context, event, callback) {
    const {
        room,
    } = event;

    const token = new AccessToken(
        context.ACCOUNT_SID,
        context.API_KEY,
        context.API_SECRET,
        {
            identity: uuidv4(),
        },
    );
    token.addGrant(new AccessToken.VideoGrant({
        room,
    }));

    const response = new Twilio.Response();
    response.appendHeader("Content-Type", "application/json");
    // TODO: specify origin
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "GET");
    response.setBody({
        token: token.toJwt(),
    });

    callback(null, response);
  };
  
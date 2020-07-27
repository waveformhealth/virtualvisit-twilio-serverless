# virtualvisit-twilio-serverless

APIs to power Virtual Visit, built using Twilio Functions.

**NOTE**: this is a demo project and should not be deployed to a production environment as is.

## API

### Create a room

```plaintext
POST /room
```

```shell
curl -i -X POST "http://localhost:3000/room"
```

Response example:

```json
{
  "sid": "RM00000000000000000000"
}
```

### Request a token

```plaintext
GET /token
```

| Attribute | Type    | Required      | Description                                |
| --------- | ------- | ------------- | ------------------------------------------ |
| `room`    | string  | yes           | The room `sid` a token is being requested for |

```shell
curl -i -X GET "http://localhost:3000/token?room=RM00000000000000000000"
```

Response example:

```json
{
  "token": "0000000000000000000000"
}
```

### Send an invitation

```plaintext
POST /invitation
```

| Attribute | Type    | Required      | Description                                |
| --------- | ------- | ------------- | ------------------------------------------ |
| `room`    | string  | yes           | The room `sid` to include in the invitation |
| `phone`   | string  | yes           | The phone number to send the invitation to via SMS |

```shell
curl -i -X POST -H "Content-Type: application/json" -d '{"room": "RM00000000000000000000", "phone": "0000000000"}' "http://localhost:3000/invitation"
```

Response example:

```plaintext
200 OK
```

## Environment Variables

1. `API_KEY`: Used to grant access tokens - find this [in the console](https://www.twilio.com/console/project/api-keys)
1. `API_SECRET`: Also used to grant access tokens - [and also found in the console](https://www.twilio.com/console/project/api-keys)
1. `INVITE_BASE_URL`: The base URL sent as part of the Virtual Visit invitation. This is the URL where your [web app](https://github.com/waveformhealth/virtualvisit-web) will be hosted. For local testing, set this to your computer's local IP (e.g. `http://192.168.0.1`) which can be retrieved by running: `hostname -I`
1. `PHONE_NUMBER`: A Twilio phone number - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming)

## Local Testing

1. Install and setup the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart)
1. Clone this repo
1. Create a [.env](https://www.npmjs.com/package/dotenv) file at the root of the project with the **environment variables** listed above set. Addtionally add your Twilio `ACCOUNT_SID` and `AUTH_TOKEN`
1. From the project directory, run: `twilio serverless:start`

## Deployment

> **Warning**: This service uses Twilio resources and should not be deployed in a production environment without a proper authorization system in place.

### Setup

In the Twilio Functions [Configuration dashboard](https://www.twilio.com/console/functions/configure):
1. Ensure "Enable ACCOUNT_SID and AUTH_TOKEN" is **enabled**
1. Create and add the environment variables listed above to your Twilio Environment Variables


### Deploy

1. Install and setup the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart)
1. Clone this repo
1. From the project directory, run: `twilio serverless:deploy`

Your functions will be deployed to the Twilio Runtime.

Make note of your function URLs from the Deployment Details.

### Cleanup

Once you've tested your APIs and no longer using them they should be deleted. This can be done using the Twilio CLI:

1. Run `twilio serverless:list` and copy the `SID` of the `virtualvisit-twilio-serverless` project
1. Run `twilio api:serverless:v1:services:remove --sid <SID>` using the `SID` from the previous step to remove the resource

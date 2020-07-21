# virtualvisit-twilio-serverless

APIs to power Virtual Visit, built using Twilio Functions.

**NOTE**: this is a demo project and should not be deployed to a production environment as is.

## Setup

In the Twilio Functions [Configuration dashboard](https://www.twilio.com/console/functions/configure):
1. Ensure "Enable ACCOUNT_SID and AUTH_TOKEN" is **enabled**
1. Create and add the following variables to your Environment Variables:
    1. `API_KEY`: Used to grant access tokens - find this [in the console](https://www.twilio.com/console/project/api-keys)
    1. `API_SECRET`: Also used to grant access tokens - [and also found in the console](https://www.twilio.com/console/project/api-keys).
    1. `INVITE_BASE_URL`: The base URL sent as part of the Virtual Visit invitation. This is the URL where your [web app](https://github.com/waveformhealth/virtualvisit-web) will be hosted
    1. `PHONE_NUMBER`: A Twilio phone number - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming)

## Deploy

1. Install and setup the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart)
1. Clone this repo
1. From the project directory, run: `twilio serverless:deploy`

Your functions will be deployed to the Twilio Runtime.

Make note of your function URLs from the Deployment Details.

## Cleanup

Once you've tested your APIs and no longer using them they should be deleted. This can be done using the Twilio CLI:

1. Run `twilio serverless:list` and copy the `SID` of the `virtualvisit-twilio-serverless` project
1. Run `twilio api:serverless:v1:services:remove --sid <SID>` using the `SID` from the previous step to remove the resource

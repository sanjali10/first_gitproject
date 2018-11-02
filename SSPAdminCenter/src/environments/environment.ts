// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    msalconfig: {
        clientID: '9162d177-44d6-4185-89cf-aa6b33ce6c24',
        redirectUri: location.origin
    },
    endpoints: {
        arn: 'https://dev-bssol01.to.ideep.com/RESTAPI/si/ssp',
    },
    sspendpoints: {
        arn: 'https://zlt9v0uc3a.execute-api.eu-west-1.amazonaws.com/ssp/api/v1/room',
        key: 'xZEpCWQWJC6OfMpSRKn9C92xmpti178z4DtWpb4r'
    },
    smartMeeting: {
        url: 'https://s3-eu-west-1.amazonaws.com/ssp-admin-cloudfront/soinstallers/SmartMeeting.zip'
    },
    meetingVoiceClient: {
        url: 'https://s3-eu-west-1.amazonaws.com/ssp-admin-cloudfront/soinstallers/MeetingVoiceClient.zip'
    },
    macSmartMeeting: {
        url: 'https://s3-eu-west-1.amazonaws.com/ssp-admin-cloudfront/soinstallers/SmartMeeting.zip'
    },
    macMeetingVoiceClient: {
        url: 'https://s3-eu-west-1.amazonaws.com/ssp-admin-cloudfront/soinstallers/MeetingVoiceClient.zip'
    }
};

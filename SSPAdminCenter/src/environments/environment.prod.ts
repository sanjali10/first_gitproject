export const environment = {
  production: true,
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

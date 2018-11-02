import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from '../../../core/token.storage';

import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client/lib/src';

import { environment } from '../../../../environments/environment';
import * as Msal from 'msal';

// import { SspRoomService } from './ssp-room.service';

const graphAPIScopes = [
    'User.ReadBasic.All',
    'Contacts.Read',
    'Contacts.ReadWrite',
    'Files.ReadWrite.All',
    'Calendars.ReadWrite',
    'Calendars.ReadWrite.Shared',
    'People.Read',
];

const logger = new Msal.Logger(loggerCallback, {
    level: Msal.LogLevel.Verbose,
    correlationId: '12345',
});
function loggerCallback(logLevel, message, piiEnabled) {
    console.log(message);
}

var userAgentApplication = new Msal.UserAgentApplication(
    environment.msalconfig.clientID,
    null,
    authCallback,
    {
        cacheLocation: 'localStorage',
        logger: logger,
        redirectUri: environment.msalconfig.redirectUri,
        // isAngular: true // MSAL library future support for Angular
    },
); // cacheLocation defaults to sessionStorage if not set in the constructor

function authCallback(errorDesc, token, error, tokenType) {
    // This function is called after loginRedirect and acquireTokenRedirect. Use tokenType to determine context.
    // For loginRedirect, tokenType = 'id_token'. For acquireTokenRedirect, tokenType:'access_token'.

    console.log('Global Token ' + token);
    if (tokenType === 'id_token') {
        console.log('authCallback id_token flag enabled');
        this.addform = true;
    }
}

@Injectable()
export class O365AuthService {
    public addform = false;
    public access_token = null;
    public user;
    public isAuthenticated = false;
    public msGraphclient: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private token1: TokenStorage,
    ) {
        userAgentApplication = new Msal.UserAgentApplication(
            environment.msalconfig.clientID,
            null,
            (errorDesc, token, error, tokenType) => {
                console.log('O365Token :' + tokenType + token);
                if (tokenType === 'id_token') {
                    console.log('callback id_token flag enabled');
                    this.addform = true;
                }
            },
            {
                cacheLocation: 'localStorage',
                logger: logger,
                redirectUri: environment.msalconfig.redirectUri,
                // isAngular: true
            },
        ); // cacheLocation defaults to sessionStorage if not set in the constructor
    }

    public getUser() {
        return this.authenticated.then(
            isauthenticated => (isauthenticated ? userAgentApplication.getUser() : {}),
        );
    }

    get authenticated() {
        return this.token.then(t => !!t);
    }

    get token() {
        return this.getToken();
    }

    public login() {
        return this.loginRedirect();
    }

    public getToken(): Promise<string> {
        return userAgentApplication
            .acquireTokenSilent(
                graphAPIScopes,
                userAgentApplication.authority,
                userAgentApplication.getUser(),
            )
            .then(token => {
                return token;
            })
            .catch(error => {
                return userAgentApplication
                    .acquireTokenPopup(graphAPIScopes)
                    .then(token => {
                        return Promise.resolve(token);
                    })
                    .catch(innererror => {
                        return Promise.resolve('');
                    });
            });
    }

    public tokenReceivedCallBack(errorDesc, token, error, tokenType) {
        console.log('Callback for login');
        console.log(tokenType + token);
        this.syncRooms();
    }

    public getO365Rooms(roomNameToSearch: string, callback) {
        this.getToken().then(
            // Get Access Token
            access_token => {
                if (access_token) {
                    this.msGraphclient = MicrosoftGraphClient.Client.init({
                        authProvider: done => {
                            done(null, access_token); // first parameter takes an error if you can't get an access token
                        },
                    });

                    // let roomNameToSearch = '';
                    if (
                        roomNameToSearch != null &&
                        roomNameToSearch.length > 0 &&
                        roomNameToSearch.toLowerCase().trim() !== 'all'
                    ) {
                        roomNameToSearch =
                            "&$filter = startswith(displayName, '" + roomNameToSearch + "')";
                    }
                    // Fetch room information
                    //
                    this.msGraphclient
                        .api(
                            'users?$select=id,displayName,userPrincipalName,userType,officeLocation&$top=10' +
                                roomNameToSearch,
                        )
                        .version('v1.0')
                        .get((err, res) => {
                            console.log(res);
                            const rooms = [];
                            for (const resIter of res.value) {
                                // const room: MicrosoftGraph.EmailAddress = resIter.userPrincipalName;
                                rooms.push({
                                    name: resIter.displayName.toString(),
                                    emailId: resIter.userPrincipalName.toString(),
                                });
                            } // Iterate Rooms
                            callback(rooms);
                        });
                }
            },
        );
    }

    public syncRooms() {
        this.getToken().then(
            // Get Access Token
            access_token => {
                if (access_token) {
                    this.msGraphclient = MicrosoftGraphClient.Client.init({
                        authProvider: done => {
                            done(null, access_token); // first parameter takes an error if you can't get an access token
                        },
                    });

                    // Fetch room information
                    //
                    this.msGraphclient
                        .api("/me/people?$top=1000&$filter=personType/subclass eq 'Room'")
                        .version('v1.0')
                        .get((err, res) => {
                            console.log(res);
                            // const rooms: [MicrosoftGraph.EmailAddress] = res.value;
                            for (const resIter of res.value) {
                                const room: MicrosoftGraph.EmailAddress = resIter.userPrincipalName;
                                const createRoom = {
                                    id: '',
                                    RoomName: room.toString(),
                                    DisplayModel: '',
                                    PcId: '',
                                    BotId: '',
                                    StationId: '',
                                    TenantId: this.token1.getTenantName(),
                                    TenantValue: this.token1.getTenantValue(),
                                };
                                // this.createRoomService.createSspRoom(createRoom).subscribe(data => {
                                //     console.log('' + JSON.stringify(data));
                                // });
                            } // Iterate Rooms
                        });
                }
            },
        );
    }

    public logout() {
        userAgentApplication.logout();
    }
    private loginRedirect() {
        userAgentApplication.loginRedirect(graphAPIScopes);
    }
}

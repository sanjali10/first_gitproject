### How to start

In order to start the project use:
```bash
# install the project's dependencies
$ npm install
# watches your files and uses livereload by default run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
$ npm start
# prod build, will output the production application in `dist`
# the produced code can be deployed (rsynced) to a remote server
$ npm run build
```

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Included Commands


Command | Description 
------------- | -------------
|`npm run ng:serve`| Execute the app in the browser |
|`npm run builde`| Build the app. Your built files are in the /dist folder. |
|`npm run starts`| Start the app. |
|`npm run doc:build`| Build the documentation. |
|`npm run doc:serve`| Serve the documentation. |
|`npm run doc: buildandserve `| Build and Serve the documentation. |
|`npm run builde:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |


## Karma Commands 
Command | Description 
------------- | -------------
|`ng test --watch=false --code-coverage`| Run Unitt test with coverage, report location SSPAdminCenter/coverage/index.html |

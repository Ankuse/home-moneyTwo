// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // Initialize Firebase
  firebase: {
    apiKey: 'AIzaSyA2L82AHvES0-61kMPVT9DV9dMXyHfukK0',
    authDomain: 'homemoney-290c1.firebaseapp.com',
    databaseURL: 'https://homemoney-290c1.firebaseio.com',
    projectId: 'homemoney-290c1',
    storageBucket: 'homemoney-290c1.appspot.com',
    messagingSenderId: '309839460830'
  }
};

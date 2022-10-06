// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appUrl : "http://localhost:3000/",
  firebase: {
    apiKey: "AIzaSyAtjO799vyT5Nk487oBcb63m1E86xax2wk",
    authDomain: "test-notification-866ae.firebaseapp.com",
    databaseURL: "config data from general tab",
    projectId: "test-notification-866ae",
    storageBucket: "test-notification-866ae.appspot.com",
    messagingSenderId: "1082424079093",
    appId: "1:1082424079093:web:8a289c14a1bd2f11800bbc",
    measurementId: "config data from general tab",
    vapidKey: "BInksdYG3nzHWla8YKeIIje6fAgFNZ1_YDXvsbeNSboOVQ0iUkrhRy7Jf-vjYlJHEZsJ5__uZuuEXtMCuaqFKR4"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

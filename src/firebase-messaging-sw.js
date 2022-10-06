importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");






    const firebaseConfig = {
        apiKey: "AIzaSyAtjO799vyT5Nk487oBcb63m1E86xax2wk",
        authDomain: "test-notification-866ae.firebaseapp.com",
        databaseURL: "config data from general tab",
        projectId: "test-notification-866ae",
        storageBucket: "test-notification-866ae.appspot.com",
        messagingSenderId: "1082424079093",
        appId: "1:1082424079093:web:8a289c14a1bd2f11800bbc",
        measurementId: "config data from general tab"
    };
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();



    messaging.onBackgroundMessage(function (payload) {
        console.log('Received background message ', payload);

        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
        };

        self.registration.showNotification(notificationTitle,
            notificationOptions);
    })
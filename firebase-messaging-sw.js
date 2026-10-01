
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCxoCJcZus7U4RW13iqOlYYiPX2jTNGucM",
  authDomain: "educasjrc.firebaseapp.com",
  projectId: "educasjrc",
  storageBucket: "educasjrc.firebasestorage.app",
  messagingSenderId: "48508492328",
  appId: "1:48508492328:web:c829bb8c384da0d055d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle =
    payload.notification?.title || "Portal da Educação SJRC";

  const notificationOptions = {
    body: payload.notification?.body || "Você tem um novo comunicado.",
    icon: "./icons/icone-app-192.png",
    data: {
      url: "./"
    }
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(
      event.notification.data?.url || "./"
    )
  );
});

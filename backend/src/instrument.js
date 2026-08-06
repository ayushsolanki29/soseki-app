// instrument.js
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://328ed8e372bccfa68e2eb2d907c04991@o4511864001134592.ingest.us.sentry.io/4511864012013568",
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { google } = require("googleapis");
admin.initializeApp();
exports.authorizeBlogger = onRequest(
  { cors: true },
  async (req, res) => {
    try {
      const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://us-central1-flashnews24-5bfd6.cloudfunctions.net/oauthCallback"
);

      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
          "https://www.googleapis.com/auth/blogger"
        ]
      });

      res.redirect(url);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
);
exports.sendNotification = onRequest(
  { cors: true },
  async (req, res) => {
    try {
      const { title, body, image, url } = req.body;

      if (!title || !body) {
        return res.status(400).json({
          success: false,
          message: "Title and body are required."
        });
      }

      const snapshot = await admin
        .firestore()
        .collection("fcmTokens")
        .get();

      if (snapshot.empty) {
        return res.status(404).json({
          success: false,
          message: "No FCM tokens found."
        });
      }

      const tokens = snapshot.docs
        .map(doc => doc.data().token)
        .filter(Boolean);

      const message = {
        notification: {
          title,
          body
        },
        data: {
          click_action: "FLUTTER_NOTIFICATION_CLICK",
          url: url || "/"
        }
      };

      if (image) {
        message.notification.image = image;
      }

      const response = await admin.messaging().sendEachForMulticast({
        tokens,
        ...message
      });

      const invalidTokens = [];

      response.responses.forEach((result, index) => {
        if (!result.success) {
          const code = result.error?.code || "";
          if (
            code === "messaging/registration-token-not-registered" ||
            code === "messaging/invalid-registration-token"
          ) {
            invalidTokens.push(tokens[index]);
          }
        }
      });

      if (invalidTokens.length > 0) {
        const invalidDocs = snapshot.docs.filter(doc =>
          invalidTokens.includes(doc.data().token)
        );

        await Promise.all(
          invalidDocs.map(doc => doc.ref.delete())
        );
      }

      res.json({
        success: true,
        totalTokens: tokens.length,
        successCount: response.successCount,
        failureCount: response.failureCount
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
);

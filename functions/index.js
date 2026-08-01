const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { google } = require("googleapis");

admin.initializeApp();

const CLIENT_ID = defineSecret("CLIENT_ID");
const CLIENT_SECRET = defineSecret("CLIENT_SECRET");
const REDIRECT_URI = defineSecret("REDIRECT_URI");


exports.authorizeBlogger = onRequest(
  {
    cors: true,
    secrets: [CLIENT_ID, CLIENT_SECRET, REDIRECT_URI],
  },
  async (req, res) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID.value(),
        CLIENT_SECRET.value(),
        REDIRECT_URI.value()
      );

      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
          "https://www.googleapis.com/auth/blogger",
        ],
      });

      res.redirect(url);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);
exports.oauthCallback = onRequest(
  {
    cors: true,
    secrets: [CLIENT_ID, CLIENT_SECRET, REDIRECT_URI],
  },
  async (req, res) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID.value(),
        CLIENT_SECRET.value(),
        REDIRECT_URI.value()
      );

      const { code } = req.query;

      if (!code) {
        return res.status(400).send("Authorization code missing.");
      }

      const { tokens } = await oauth2Client.getToken(code);

      await admin.firestore().collection("settings").doc("blogger").set({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || "",
        expiryDate: tokens.expiry_date || 0,
      });

      res.send("✅ Blogger authorization completed successfully. You can close this page.");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
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

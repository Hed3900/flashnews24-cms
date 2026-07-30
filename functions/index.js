const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendNotification = onRequest(async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "FlashNews24 Notification API is running"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

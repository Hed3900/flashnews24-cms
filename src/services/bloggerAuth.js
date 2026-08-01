const CLIENT_ID = "192814639105-ru733dedoeplvgf9qtpkkc2ltgj6lgg8.apps.googleusercontent.com";

const REDIRECT_URI = window.location.origin;

const SCOPES = [
  "https://www.googleapis.com/auth/blogger"
];

export function loginWithBlogger() {
  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "token",
      scope: SCOPES.join(" "),
      include_granted_scopes: "true",
      prompt: "consent"
    });

  window.location.href = authUrl;
}

export function getAccessToken() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

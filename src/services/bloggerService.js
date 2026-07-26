const API_KEY = "AIzaSyBX5-m0a9hbjZr3Ni31SayRN2tifGOMTNw";
const CLIENT_ID = "192814639105-ru733dedoeplvgf9qtpkkc2ltgj6lgg8.apps.googleusercontent.com";
const BLOG_ID = "4592212551421716018
";

const SCOPES = "https://www.googleapis.com/auth/blogger";

export async function initGoogleAuth() {
  return new Promise((resolve) => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/blogger/v3/rest",
        ],
      });
      resolve();
    });
  });
}

export async function signIn() {
  const auth = gapi.auth2.getAuthInstance();
  if (!auth.isSignedIn.get()) {
    await auth.signIn();
  }
}

export async function publishPost(title, content, labels = []) {
  await signIn();

  return gapi.client.blogger.posts.insert({
    blogId: BLOG_ID,
    isDraft: false,
    resource: {
      title,
      content,
      labels,
    },
  });
}

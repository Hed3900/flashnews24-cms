const API_KEY = "AIzaSyBX5-m0a9hbjZr3Ni31SayRN2tifGOMTNw";
const CLIENT_ID =
  "192814639105-ru733dedoeplvgf9qtpkkc2ltgj6lgg8.apps.googleusercontent.com";
const BLOG_ID = "4592212551421716018";

const SCOPES = "https://www.googleapis.com/auth/blogger";

let initialized = false;

export async function initGoogleAuth() {
  if (initialized) return;

  return new Promise((resolve, reject) => {
    window.gapi.load("client:auth2", async () => {
      try {
        await window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/blogger/v3/rest",
          ],
        });

        initialized = true;
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}

export async function signIn() {
  await initGoogleAuth();

  const auth = window.gapi.auth2.getAuthInstance();

  if (!auth.isSignedIn.get()) {
    await auth.signIn();
  }
}

export async function publishPost(title, content, labels = []) {
  await signIn();

  return window.gapi.client.blogger.posts.insert({
    blogId: BLOG_ID,
    isDraft: false,
    resource: {
      title,
      content,
      labels,
    },
  });
}

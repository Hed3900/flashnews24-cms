const API_KEY = "AIzaSyBX5-m0a9hbjZr3Ni31SayRN2tifGOMTNw";
const CLIENT_ID =
  "192814639105-ru733dedoeplvgf9qtpkkc2ltgj6lgg8.apps.googleusercontent.com";
const BLOG_ID = "4592212551421716018";

const SCOPES = "https://www.googleapis.com/auth/blogger";

let tokenClient;
let gapiInitialized = false;
let gisInitialized = false;

export async function initGoogleAuth() {
  if (gapiInitialized && gisInitialized) return;

  return new Promise((resolve, reject) => {
    window.gapi.load("client", async () => {
      try {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/blogger/v3/rest",
          ],
        });

        gapiInitialized = true;

        tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: "",
        });

        gisInitialized = true;
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}

export async function signIn() {
  await initGoogleAuth();

  // Already signed in అయితే మళ్లీ popup చూపించకు
  if (window.gapi.client.getToken()) {
    return;
  }

  return new Promise((resolve, reject) => {
    tokenClient.callback = (resp) => {
      if (resp.error) {
        reject(resp);
        return;
      }

      window.gapi.client.setToken({
        access_token: resp.access_token,
      });

      resolve(resp);
    };

    tokenClient.requestAccessToken({
      prompt: "consent",
    });
  });
}

async function ensureSignedIn() {
  await initGoogleAuth();

  if (!window.gapi.client.getToken()) {
    await signIn();
  }
}

export async function getPosts() {
  await ensureSignedIn();

  const response = await window.gapi.client.blogger.posts.list({
    blogId: BLOG_ID,
    maxResults: 50,
    fetchBodies: false,
  });

  return response.result.items || [];
}

export async function publishPost(title, content, labels = []) {
  await ensureSignedIn();

  return await window.gapi.client.blogger.posts.insert({
    blogId: BLOG_ID,
    isDraft: false,
    resource: {
      title,
      content,
      labels,
    },
  });
}

export async function getPost(postId) {
  await ensureSignedIn();

  const response = await window.gapi.client.blogger.posts.get({
    blogId: BLOG_ID,
    postId,
  });

  return response.result;
}

export async function updatePost(postId, title, content, labels = []) {
  await ensureSignedIn();

  return await window.gapi.client.blogger.posts.update({
    blogId: BLOG_ID,
    postId,
    resource: {
      title,
      content,
      labels,
    },
  });
}

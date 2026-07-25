import Layout from "../components/Layout";

function Settings() {
  return (
    <Layout>
      <h1>Settings</h1>

      <div className="card" style={{ maxWidth: "700px" }}>
        <h2 style={{ marginBottom: "20px" }}>Website Settings</h2>

        <div style={{ marginBottom: "20px" }}>
          <label>Website Name</label>
          <input
            type="text"
            defaultValue="FlashNews24"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Website URL</label>
          <input
            type="text"
            defaultValue="https://flashnews24.site"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Admin Email</label>
          <input
            type="email"
            defaultValue="flashnews24yt@gmail.com"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Posts Per Page</label>
          <input
            type="number"
            defaultValue="10"
          />
        </div>

        <button className="btn">
          Save Settings
        </button>
      </div>
    </Layout>
  );
}

export default Settings;

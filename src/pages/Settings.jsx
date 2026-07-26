import { useState } from "react";
import Layout from "../components/Layout";

function Settings() {
  const [siteName, setSiteName] = useState("FlashNews24");
  const [tagline, setTagline] = useState("Latest Breaking News");
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [theme, setTheme] = useState("Dark");

  const saveSettings = () => {
    localStorage.setItem(
      "cmsSettings",
      JSON.stringify({
        siteName,
        tagline,
        postsPerPage,
        theme,
      })
    );

    alert("Settings saved successfully!");
  };

  return (
    <Layout>
      <div style={{ padding: "20px", color: "white", maxWidth: "700px" }}>
        <h2>Settings</h2>

        <label>Site Name</label>
        <input
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0 20px" }}
        />

        <label>Tagline</label>
        <input
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0 20px" }}
        />

        <label>Posts Per Page</label>
        <input
          type="number"
          value={postsPerPage}
          onChange={(e) => setPostsPerPage(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0 20px" }}
        />

        <label>Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0 20px" }}
        >
          <option>Dark</option>
          <option>Light</option>
        </select>

        <button
          onClick={saveSettings}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </div>
    </Layout>
  );
}

export default Settings;

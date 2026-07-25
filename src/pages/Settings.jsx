function Settings() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#ffffff",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Settings</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
        }}
      >
        <h2>Website Settings</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>Website Name</label>
          <br />
          <input
            type="text"
            defaultValue="FlashNews24"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Website URL</label>
          <br />
          <input
            type="text"
            defaultValue="https://flashnews24.site"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Admin Email</label>
          <br />
          <input
            type="email"
            defaultValue="flashnews24yt@gmail.com"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;

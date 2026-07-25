function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#ffffff",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1>FlashNews24 CMS Dashboard</h1>

      <hr />

      <h3>Quick Actions</h3>

      <button>📝 New Article</button>
      <button>👤 Authors</button>
      <button>📂 Categories</button>
      <button>⚙️ Settings</button>
    </div>
  );
}

export default Dashboard;

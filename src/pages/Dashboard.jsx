function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        padding: "30px"
      }}
    >
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        <div>📝 Posts</div>
        <div>👤 Authors</div>
        <div>📂 Categories</div>
        <div>⚙️ Settings</div>
      </div>
    </div>
  );
}

export default Dashboard;

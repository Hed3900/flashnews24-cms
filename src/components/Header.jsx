function Header() {
  

  const handleLogout = () => {
  alert("Logout");
};

  return (
    <header className="header">
      <div>
        <h2>FlashNews24 CMS</h2>
        <p style={{ color: "#cbd5e1", fontSize: "14px" }}>
          Welcome back, Harish
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <span
          style={{
            background: "#2563eb",
            padding: "8px 12px",
            borderRadius: "20px",
            fontSize: "14px",
          }}
        >
          👤 Admin
        </span>

        <button
  onClick={() => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    window.location.reload();
  }}
  style={{
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(239,68,68,0.35)",
    transition: "all 0.3s ease"
  }}
  onMouseEnter={(e) => {
    e.target.style.background =
      "linear-gradient(135deg, #dc2626, #b91c1c)";
    e.target.style.transform = "translateY(-2px)";
  }}
  onMouseLeave={(e) => {
    e.target.style.background =
      "linear-gradient(135deg, #ef4444, #dc2626)";
    e.target.style.transform = "translateY(0)";
  }}
>
  🚪 Logout
</button>
      </div>
    </header>
  );
}

export default Header;

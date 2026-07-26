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
>
  Logout
</button>
      </div>
    </header>
  );
}

export default Header;

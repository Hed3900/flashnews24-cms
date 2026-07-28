import React from "react";

function Header() {
  const role = localStorage.getItem("role") || "Author";
  const username = localStorage.getItem("name") || "";

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    window.location.reload();
  };

  return (
    <header
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h2>FlashNews24 CMS</h2>
        <p style={{ color: "#cbd5e1", fontSize: "14px" }}>
          Welcome back, {username}
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
            background:
              role === "Admin"
                ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
                : "linear-gradient(135deg,#16a34a,#15803d)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow:
              role === "admin"
                ? "0 4px 12px rgba(37,99,235,.35)"
                : "0 4px 12px rgba(22,163,74,.35)",
          }}
        >
          {role === "admin"
  ? "👑 Admin"
  : "✍️ Author"}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "linear-gradient(135deg,#ef4444,#dc2626)",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(239,68,68,.35)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow =
              "0 8px 18px rgba(239,68,68,.45)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow =
              "0 4px 12px rgba(239,68,68,.35)";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </header>
  );
}

export default Header;

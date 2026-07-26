import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
  if (
  email.trim() === "admin@flashnews24.site" &&
  password === "Admin@123"
) {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("role", "admin");
  window.location.href = "/flashnews24-cms/";
} else if (
  email.trim() === "author@flashnews24.site" &&
  password === "Author@123"
) {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("role", "author");
  window.location.href = "/flashnews24-cms/";
} else {
  alert("Invalid email or password");
  }
    };
  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "10px",
          width: "320px",
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center" }}>
          FlashNews24 CMS
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            boxSizing: "border-box",
          }}
        />

        <button
  onClick={handleLogin}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Sign In
</button>
      </div>
    </div>
  );
}

export default Login;

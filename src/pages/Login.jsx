import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { loginWithBlogger, getAccessToken } from "../services/bloggerAuth";
import { useEffect } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  const userRef = doc(db, "users", email.trim());
  const userSnap = await getDoc(userRef);
useEffect(() => {
  const token = getAccessToken();

  if (token) {
    localStorage.setItem("blogger_token", token);
    localStorage.setItem("loggedIn", "true");
    window.location.href = "/";
  }
}, []);
  if (!userSnap.exists()) {
    alert("User not found");
    return;
  }

  const user = userSnap.data();
console.log(user);
//  if (user.status !== "active") {
 //   alert("Account is disabled");
   // return;
//  }

  if (user.password !== password) {
    alert("Invalid password");
    return;
  }

  localStorage.setItem("loggedIn", "true");
localStorage.setItem("role", user.role);
localStorage.setItem("username", user.name);
localStorage.setItem("email", user.email);
localStorage.setItem("name", user.name);

  window.location.href = "/";
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
  onClick={loginWithBlogger}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#DB4437",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Sign in with Google (Blogger)
</button>
      </div>
    </div>
  );
}

export default Login;

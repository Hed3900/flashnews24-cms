import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";

function Authors() {
  const [authors, setAuthors] = useState([]);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  useEffect(() => {
  loadAuthors();
}, []);

async function loadAuthors() {
  const snapshot = await getDocs(collection(db, "users"));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setAuthors(data);
}

async function createAuthor() {
  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  await setDoc(doc(db, "users", email), {
    name,
    email,
    password,
    role: "author",
  });

  alert("Author Created");

  setName("");
  setEmail("");
  setPassword("");

  loadAuthors();
}

async function removeAuthor(email) {
  if (!window.confirm("Delete Author?")) return;

  await deleteDoc(doc(db, "users", email));

  loadAuthors();
}
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2 style={{ marginBottom: "20px" }}>Author Management</h2>

        {/* Add Author Form */}
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "30px",
            maxWidth: "600px",
          }}
        >
          <h3>Add New Author</h3>

          <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  }}
/>

          <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
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
    marginBottom: "15px",
  }}
/>

          <button
  onClick={createAuthor}
  style={{
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Create Author
</button>
        </div>

        {/* Authors List */}
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Authors List</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "white",
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Email</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Role</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {authors.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Authors Found
                  </td>
                </tr>
              ) : (
                authors.map((author) => (
                  <tr key={author.email}>
                    <td style={{ padding: "10px" }}>{author.name}</td>
                    <td style={{ padding: "10px" }}>{author.email}</td>
                    <td style={{ padding: "10px" }}>{author.role}</td>
                    <td style={{ padding: "10px" }}>
                      <button
                        style={{
                          background: "#2563eb",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          marginRight: "8px",
                          borderRadius: "5px",
                        }}
                      >
                        Edit
                      </button>

                      <button
  onClick={() => removeAuthor(author.email)}
  style={{
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
  }}
>
  Delete
</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Authors;

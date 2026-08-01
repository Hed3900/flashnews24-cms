import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { publishPost } from "../services/bloggerService";
function Drafts() {
  const role = localStorage.getItem("role");
  const [drafts, setDrafts] = useState([]);
const navigate = useNavigate();


useEffect(() => {
  loadDrafts();
}, []);

async function loadDrafts() {
  const q = query(
    collection(db, "posts"),
    where("status", "==", "draft")
  );

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setDrafts(data);
}

async function publishDraft(post) {
  try {
    const cleanContent = post.content
  .replace(/&nbsp;/g, " ")
  .replace(/<p><br><\/p>/gi, "")
  .replace(/<br\s*\/?>/gi, "")
  .trim();

const html = `
${post.image ? `<img src="${post.image}" alt="${post.title}" style="width:100%;height:auto;border-radius:8px;margin-bottom:20px;" />` : ""}

${cleanContent}
`;

    const response = await publishPost(
      post.title,
      html,
      [post.category]
    );

    await updateDoc(doc(db, "posts", post.id), {
      status: "published",
      bloggerPostId: response.result.id,
      bloggerUrl: response.result.url || "",
      publishedAt: new Date().toISOString(),
    });

    alert("Draft Published Successfully!");
    loadDrafts();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function deleteDraft(id) {
  if (!window.confirm("Delete this draft?")) return;

  await deleteDoc(doc(db, "posts", id));

  loadDrafts();
}
  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Drafts</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {drafts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.authorName}</td>
                <td>
  {role === "admin" ? (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => navigate(`/new-post?id=${post.id}`)}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        ✏️ Edit
      </button>

      <button
        onClick={() => publishDraft(post)}
        style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        🚀 Publish
      </button>

      <button
        onClick={() => deleteDraft(post.id)}
        style={{
          background: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        🗑 Delete
      </button>
    </div>
) : (
  <div
    style={{
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    <button
      onClick={() => navigate(`/new-post?id=${post.id}`)}
      style={{
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      ✏️ Edit
    </button>

    <span
      style={{
        display: "inline-block",
        background: "#f59e0b",
        color: "#fff",
        padding: "8px 14px",
        borderRadius: "20px",
        fontWeight: "600",
        fontSize: "13px",
        whiteSpace: "nowrap",
      }}
    >
      ⏳ Waiting for Admin Approval
    </span>
  </div>
)}
</td>
              </tr>
            ))}

            {drafts.length === 0 && (
              <tr>
                <td colSpan="4">No Drafts Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Drafts;

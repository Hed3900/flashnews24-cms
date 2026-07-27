import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/bloggerService";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
function Posts() {
  const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const handleEdit = (postId) => {
  navigate(`/new-post?id=${postId}`);
};
  const handleDelete = async (postId) => {
  const ok = window.confirm("Are you sure you want to delete this post?");
  if (!ok) return;

  try {
    await deletePost(postId);

    setPosts((prev) => prev.filter((post) => post.id !== postId));

    alert("Post deleted successfully!");
  } catch (err) {
    console.error(err);
    alert(
      err?.result?.error?.message ||
      err?.message ||
      JSON.stringify(err)
    );
  }
};
  useEffect(() => {
  async function loadPosts() {
  try {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    let snapshot;

    if (role === "admin") {
      snapshot = await getDocs(collection(db, "posts"));
    } else {
      const q = query(
        collection(db, "posts"),
        where("authorEmail", "==", email)
      );

      snapshot = await getDocs(q);
    }

    const firestorePosts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(firestorePosts);
    } catch (err) {
      console.error(err);
      alert(
        err?.result?.error?.message ||
        err?.message ||
        JSON.stringify(err)
      );
    } finally {
      setLoading(false);
    }
  }

  loadPosts();
}, []);
  return (
    <Layout>
      <h2 style={{ color: "white", padding: "20px" }}>Posts</h2>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2 style={{ color: "white" }}>Posts</h2>

  <Link to="/new-post">
  <button
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    + New Post
  </button>
</Link>
</div>

<input
  type="text"
  placeholder="Search posts..."
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    marginBottom: "20px",
  }}
/>
      <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "#1e293b",
    color: "white",
  }}
>
  <thead>
    <tr>
      <th style={{ padding: "12px", textAlign: "left" }}>Title</th>
      <th>Category</th>
      <th>Status</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
  {loading ? (
    <tr>
      <td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>
        Loading...
      </td>
    </tr>
  ) : posts.length === 0 ? (
    <tr>
      <td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>
        No posts found
      </td>
    </tr>
  ) : (
    posts.map((post) => (
      <tr key={post.id}>
        <td style={{ padding: "12px" }}>{post.title}</td>

        <td style={{ padding: "12px" }}>
          {post.category || "-"}
        </td>

        <td style={{ padding: "12px" }}>
          {post.status || "Published"}
        </td>

        <td style={{ padding: "12px" }}>
          {
  post.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleDateString()
    : new Date(post.createdAt).toLocaleDateString()
}
        </td>

        <td style={{ padding: "12px" }}>
          <button
  onClick={() => handleEdit(post.bloggerPostId)}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "8px",
    cursor: "pointer",
  }}
>
  Edit
</button>

          <button
onClick={() => handleDelete(post.bloggerPostId)}
  style={{
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
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
    </Layout>
  );
}

export default Posts;

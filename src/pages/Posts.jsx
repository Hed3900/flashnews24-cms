import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../services/bloggerService";
function Posts() {
  const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
  async function loadPosts() {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load posts");
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
      <td colSpan="3">Loading...</td>
    </tr>
  ) : (
    posts.map((post) => (
      <tr key={post.id}>
        <td>{post.title}</td>
        <td>{new Date(post.published).toLocaleDateString()}</td>
        <td>Published</td>
      </tr>
    ))
  )}
</tbody>
</table>
    </Layout>
  );
}

export default Posts;

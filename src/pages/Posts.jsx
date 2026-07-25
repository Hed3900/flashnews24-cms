import Layout from "../components/Layout";

function Posts() {
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
    <tr>
      <td style={{ padding: "12px" }}>No posts available</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
  </tbody>
</table>
    </Layout>
  );
}

export default Posts;

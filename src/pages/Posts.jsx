function Posts() {
  const posts = [
    {
      id: 1,
      title: "Breaking: FlashNews24 CMS Started",
      category: "Technology",
      status: "Published",
    },
    {
      id: 2,
      title: "World News Example",
      category: "World",
      status: "Draft",
    },
  ];

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Posts</h2>

        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + New Post
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#1e293b",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "12px", textAlign: "left" }}>Title</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Category</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td style={{ padding: "12px" }}>{post.title}</td>
              <td style={{ padding: "12px" }}>{post.category}</td>
              <td style={{ padding: "12px" }}>{post.status}</td>
              <td style={{ padding: "12px" }}>
                <button>Edit</button>{" "}
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Posts;

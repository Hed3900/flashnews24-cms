function Posts() {
  const posts = [
    {
      id: 1,
      title: "Welcome to FlashNews24 CMS",
      author: "Harish",
      category: "General",
      status: "Draft"
    }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#ffffff",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1>Posts</h1>

      <button
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer"
        }}
      >
        + New Article
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #555", padding: "10px", textAlign: "left" }}>Title</th>
            <th style={{ borderBottom: "1px solid #555", padding: "10px", textAlign: "left" }}>Author</th>
            <th style={{ borderBottom: "1px solid #555", padding: "10px", textAlign: "left" }}>Category</th>
            <th style={{ borderBottom: "1px solid #555", padding: "10px", textAlign: "left" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td style={{ padding: "10px" }}>{post.title}</td>
              <td style={{ padding: "10px" }}>{post.author}</td>
              <td style={{ padding: "10px" }}>{post.category}</td>
              <td style={{ padding: "10px" }}>{post.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Posts;

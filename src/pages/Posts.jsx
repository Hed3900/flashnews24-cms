import Layout from "../components/Layout";

function Posts() {
  const posts = [
    {
      id: 1,
      title: "Welcome to FlashNews24 CMS",
      author: "Harish",
      category: "General",
      status: "Draft",
    },
  ];

  return (
    <Layout>
      <h1>Posts</h1>

      <button className="btn" style={{ marginBottom: "20px" }}>
        + New Article
      </button>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.category}</td>
              <td>{post.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Posts;

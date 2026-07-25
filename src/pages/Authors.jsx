import Layout from "../components/Layout";

function Authors() {
  const authors = [
    {
      id: 1,
      name: "Harish",
      role: "Founder & Editor",
      email: "flashnews24yt@gmail.com",
      status: "Active",
    },
  ];

  return (
    <Layout>
      <h1>Authors</h1>

      <button className="btn" style={{ marginBottom: "20px" }}>
        + Add Author
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.role}</td>
              <td>{author.email}</td>
              <td>{author.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Authors;

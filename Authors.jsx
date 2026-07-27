import Layout from "../components/Layout";

function Authors() {
  return (
    <Layout>
      <h2 style={{ color: "white", marginBottom: "20px" }}>Authors</h2>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "white" }}>Add New Author</h3>

        <input
          type="text"
          placeholder="Name"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          style={{
            background: "#2563eb",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Create Author
        </button>
      </div>

      <h3 style={{ color: "white" }}>Authors List</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
              No authors found
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}

export default Authors;

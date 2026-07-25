function Authors() {
  const authors = [
    {
      id: 1,
      name: "Harish",
      role: "Founder & Editor",
      email: "flashnews24yt@gmail.com",
      status: "Active"
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
      <h1>Authors</h1>

      <button
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer"
        }}
      >
        + Add Author
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th style={{padding:"10px",borderBottom:"1px solid #555",textAlign:"left"}}>Name</th>
            <th style={{padding:"10px",borderBottom:"1px solid #555",textAlign:"left"}}>Role</th>
            <th style={{padding:"10px",borderBottom:"1px solid #555",textAlign:"left"}}>Email</th>
            <th style={{padding:"10px",borderBottom:"1px solid #555",textAlign:"left"}}>Status</th>
          </tr>
        </thead>

        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td style={{padding:"10px"}}>{author.name}</td>
              <td style={{padding:"10px"}}>{author.role}</td>
              <td style={{padding:"10px"}}>{author.email}</td>
              <td style={{padding:"10px"}}>{author.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Authors;

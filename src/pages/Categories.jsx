function Categories() {
  const categories = [
    {
      id: 1,
      name: "General",
      slug: "general",
      posts: 1,
    },
    {
      id: 2,
      name: "World",
      slug: "world",
      posts: 0,
    },
    {
      id: 3,
      name: "India",
      slug: "india",
      posts: 0,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#ffffff",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Categories</h1>

      <button
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        + Add Category
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid #555", textAlign: "left" }}>
              Name
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #555", textAlign: "left" }}>
              Slug
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #555", textAlign: "left" }}>
              Posts
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td style={{ padding: "10px" }}>{category.name}</td>
              <td style={{ padding: "10px" }}>{category.slug}</td>
              <td style={{ padding: "10px" }}>{category.posts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;

import Layout from "../components/Layout";

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
    <Layout>
      <h1>Categories</h1>

      <button className="btn" style={{ marginBottom: "20px" }}>
        + Add Category
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Posts</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td>{category.posts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Categories;

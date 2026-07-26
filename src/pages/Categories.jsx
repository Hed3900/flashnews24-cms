import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getPosts } from "../services/bloggerService";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const posts = await getPosts();

        const map = {};

        posts.forEach((post) => {
          (post.labels || []).forEach((label) => {
            if (!map[label]) {
              map[label] = 0;
            }
            map[label]++;
          });
        });

        const data = Object.keys(map).map((name, index) => ({
          id: index + 1,
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          posts: map[name],
        }));

        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategories();
  }, []);

  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Categories</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
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

            {categories.length === 0 && (
              <tr>
                <td colSpan="3">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Categories;

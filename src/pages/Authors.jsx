import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getPosts } from "../services/bloggerService";

function Authors() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    latest: "-",
  });

  useEffect(() => {
    async function loadAuthor() {
      try {
        const posts = await getPosts();

        setStats({
          totalPosts: posts.length,
          latest: posts.length
            ? new Date(posts[0].published).toLocaleDateString()
            : "-",
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadAuthor();
  }, []);

  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Author</h2>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "500px",
          }}
        >
          <h3>FlashNews24 Admin</h3>

          <p><strong>Role:</strong> Administrator</p>
          <p><strong>Total Posts:</strong> {stats.totalPosts}</p>
          <p><strong>Latest Post:</strong> {stats.latest}</p>
          <p><strong>Status:</strong> Active</p>
        </div>
      </div>
    </Layout>
  );
}

export default Authors;

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

const data = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setPosts(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();
  }, []);

const categories = [
  ...new Set(posts.map((post) => post.category).filter(Boolean)),
];

return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Dashboard</h2>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>
  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "10px",
    }}
  >
    <h3>Total Posts</h3>
    <h1>{posts.length}</h1>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "10px",
    }}
  >
    <h3>Categories</h3>
    <h1>{categories.length}</h1>
  </div>
</div> {/* <-- Ee closing div miss ayindi */}
        <div
          style={{
            background: "#1e293b",
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Latest Posts</h3>

          {posts.slice(0, 5).map((post) => (
  <p key={post.id}>
    • {post.title || post.headline}
  </p>
))}
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link to="/new-post">
            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            >
              + New Post
            </button>
          </Link>

          <Link to="/posts">
            <button
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
              }}
            >
              View Posts
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

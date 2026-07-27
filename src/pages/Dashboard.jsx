import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";


function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({
  totalPosts: 0,
  published: 0,
  drafts: 0,
  categories: 0,
  authors: 0,
});

  useEffect(() => {
  async function loadDashboard() {
    try {
      const postsSnap = await getDocs(collection(db, "posts"));
      const categoriesSnap = await getDocs(collection(db, "categories"));
      const usersSnap = await getDocs(collection(db, "users"));

      const data = postsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(data);

      setStats({
        totalPosts: data.length,
        published: data.filter((p) => p.status === "published").length,
        drafts: data.filter((p) => p.status === "draft").length,
        categories: categoriesSnap.size,
        authors: usersSnap.size,
      });

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
      minHeight: "120px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h3>Total Posts</h3>
    <h1>{stats.totalPosts}</h1>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "10px",
      minHeight: "120px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h3>Categories</h3>
    <h1>{stats.categories}</h1>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "10px",
      minHeight: "120px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h3>Published</h3>
    <h1>{stats.published}</h1>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "10px",
      minHeight: "120px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h3>Drafts</h3>
    <h1>{stats.drafts}</h1>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "10px",
      minHeight: "120px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h3>Authors</h3>
    <h1>{stats.authors}</h1>
  </div>
</div>
        <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <h3>Today's Posts</h3>
  <h1>0</h1>
</div>

<div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <h3>Total Views</h3>
  <h1>Coming Soon</h1>
</div>
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

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { deletePost } from "../services/bloggerService";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { query, where } from "firebase/firestore";

function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [mediaCount, setMediaCount] = useState(0);
const [recentPosts, setRecentPosts] = useState([]);
const [topCategories, setTopCategories] = useState([]);
const [topAuthors, setTopAuthors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
const auth = getAuth();
  const [stats, setStats] = useState({
  totalPosts: 0,
  published: 0,
  drafts: 0,
  categories: 0,
  authors: 0,
});
async function handleDelete(post) {
  if (!currentUser || currentUser.role !== "admin") {
    alert("Access Denied");
    return;
  }

  const ok = window.confirm(`Delete "${post.title}"?`);
  if (!ok) return;

  try {
    if (post.bloggerPostId) {
      await deletePost(post.bloggerPostId);
    }

    await deleteDoc(doc(db, "posts", post.id));
    alert("Post Deleted Successfully");
    await loadDashboard();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      loadDashboard(firebaseUser);
    }
  });

  return () => unsubscribe();
}, []);
  async function loadDashboard(firebaseUser) {
    try {
alert("loadDashboard started");
      import { onAuthStateChanged } from "firebase/auth";
alert(firebaseUser?.email || "No User");

const userSnap = await getDocs(
  query(
    collection(db, "users"),
    where("email", "==", firebaseUser.email)
  )
);

alert("User docs: " + userSnap.size);

let role = "author";

if (!userSnap.empty) {
  role = userSnap.docs[0].data().role;
}

setCurrentUser({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  role,
});
const categoriesSnap = await getDocs(collection(db, "categories"));
const usersSnap = await getDocs(collection(db, "users"));
const mediaSnap = await getDocs(collection(db, "media"));
 const postsSnap = await getDocs(collection(db, "posts"));
alert("Posts = " + postsSnap.size);
console.log(postsSnap.size);
console.log(categoriesSnap.size);
console.log(usersSnap.size);
console.log(mediaSnap.size);

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

      setMediaCount(mediaSnap.size);

      const recent = [...data]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        )
        .slice(0, 5);

      setRecentPosts(recent);

      const categoryMap = {};

      data.forEach((post) => {
        const cat = post.category || "Uncategorized";
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });

      setTopCategories(
        Object.entries(categoryMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
      );

      const authorMap = {};

      data.forEach((post) => {
        const author = post.authorName || "Unknown";
        authorMap[author] = (authorMap[author] || 0) + 1;
      });

      setTopAuthors(
        Object.entries(authorMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
      );

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
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <h3>🖼 Media</h3>
  <h1>{mediaCount}</h1>
</div>
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
          <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  }}
>
  <h3 style={{ marginBottom: "15px" }}>🏆 Top Categories</h3>

  {topCategories.length === 0 ? (
    <p>No Categories Yet</p>
  ) : (
    topCategories.slice(0, 5).map((cat) => (
      <div
        key={cat.name}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: "1px solid #334155",
        }}
      >
        <span>{cat.name}</span>
        <strong>{cat.count}</strong>
      </div>
    ))
  )}
</div>
          <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  }}
>
  <h3 style={{ marginBottom: "15px" }}>👤 Top Authors</h3>

  {topAuthors.length === 0 ? (
    <p>No Authors Yet</p>
  ) : (
    topAuthors.slice(0, 5).map((author) => (
      <div
        key={author.name}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: "1px solid #334155",
        }}
      >
        <span>{author.name}</span>
        <strong>{author.count}</strong>
      </div>
    ))
  )}
</div>
          
          <div
  style={{
    background: "#1e293b",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "20px",
  }}
>
  <h3 style={{ marginBottom: "15px" }}>
    📰 Recent Posts
  </h3>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      color: "white",
    }}
  >
    <thead>
      <tr
        style={{
          borderBottom: "1px solid #334155",
        }}
      >
        <th align="left">Title</th>
        <th>Status</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {recentPosts.map((post) => (
        <tr
          key={post.id}
          style={{
            borderBottom: "1px solid #334155",
          }}
        >
          <td style={{ padding: "12px 0" }}>
            {post.title}
          </td>

          <td align="center">
            {post.status === "published"
              ? "🟢 Published"
              : "🟡 Draft"}
          </td>
<td align="center">
  {post.category || "General"}
</td>
          <td align="center">
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      flexWrap: "wrap",
    }}
  >
    {(currentUser?.role === "admin" ||
      currentUser?.role === "editor" ||
      post.authorId === currentUser?.uid) && (
      <button
        onClick={() =>
          navigate(`/new-post?id=${post.bloggerPostId || post.id}`)
        }
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ✏ Edit
      </button>
    )}

    {currentUser?.role === "admin" && (
      <button
        onClick={() => handleDelete(post)}
        style={{
          background: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        🗑 Delete
      </button>
    )}
  </div>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        </div>
<div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "20px",
  }}
>
  <h3>⏰ Scheduled Posts</h3>

  {posts.filter(p => p.scheduledDate).length === 0 ? (

    <p style={{ color: "#94a3b8" }}>
      No Scheduled Posts
    </p>

  ) : (

    posts
      .filter(p => p.scheduledDate)
      .map(post => (

        <div
          key={post.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #334155",
            padding: "10px 0",
          }}
        >
          <span>{post.title}</span>

          <span>
            {post.scheduledDate} {post.scheduledTime}
          </span>
        </div>

      ))

  )}
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

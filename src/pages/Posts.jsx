import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/bloggerService";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
function Posts() {
  const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");
const [selectedPosts, setSelectedPosts] = useState([]);
  const [previewPost, setPreviewPost] = useState(null);


const POSTS_PER_PAGE = 10;
const [currentPage, setCurrentPage] = useState(1);

const handleEdit = (postId) => {
  navigate(`/new-post?id=${postId}`);
};
  const handleDelete = async (post) => {
  const ok = window.confirm("Are you sure you want to delete this post?");
  if (!ok) return;

  try {
    // Delete from Blogger only if it has a Blogger post ID
    if (post.bloggerPostId) {
      await deletePost(post.bloggerPostId);
    }

    // Delete from Firestore
    await deleteDoc(doc(db, "posts", post.id));

    // Update UI
    setPosts((prev) => prev.filter((p) => p.id !== post.id));

    alert("Post deleted successfully!");
  } catch (err) {
    console.error(err);
    alert(
      err?.result?.error?.message ||
      err?.message ||
      JSON.stringify(err)
    );
  }
};
  useEffect(() => {
  async function loadPosts() {
  try {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    let snapshot;

    if (role === "admin") {
      snapshot = await getDocs(collection(db, "posts"));
    } else {
      const q = query(
        collection(db, "posts"),
        where("authorEmail", "==", email)
      );

      snapshot = await getDocs(q);
    }

    const firestorePosts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(firestorePosts);
    } catch (err) {
      console.error(err);
      alert(
        err?.result?.error?.message ||
        err?.message ||
        JSON.stringify(err)
      );
    } finally {
      setLoading(false);
    }
  }

  loadPosts();
}, []);
  const categories = [
  ...new Set(posts.map((post) => post.category).filter(Boolean)),
];
  const filteredPosts = posts.filter((post) => {
  const text = search.toLowerCase();

  const matchesSearch =
    post.title?.toLowerCase().includes(text) ||
    post.category?.toLowerCase().includes(text) ||
    post.authorName?.toLowerCase().includes(text);

  const matchesStatus =
    statusFilter === "" || post.status === statusFilter;

  const matchesCategory =
    categoryFilter === "" || post.category === categoryFilter;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesCategory
  );
});
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

const paginatedPosts = filteredPosts.slice(
  (currentPage - 1) * POSTS_PER_PAGE,
  currentPage * POSTS_PER_PAGE
);
  return (
    <Layout>
      <h2 style={{ color: "white", padding: "20px" }}>Posts</h2>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2 style={{ color: "white" }}>Posts</h2>

  <Link to="/new-post">
  <button
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    + New Post
  </button>
</Link>
</div>
{selectedPosts.length > 0 && (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    }}
  >
    <button
  type="button"
  onClick={async () => {
    if (selectedPosts.length === 0) {
      alert("Please select at least one post.");
      return;
    }

    const ok = window.confirm(
      `Delete ${selectedPosts.length} selected post(s)?`
    );

    if (!ok) return;

    try {
      for (const id of selectedPosts) {
        const post = posts.find((p) => p.id === id);

        if (post?.bloggerPostId) {
          await deletePost(post.bloggerPostId);
        }

        await deleteDoc(doc(db, "posts", id));
      }

      setPosts(posts.filter((p) => !selectedPosts.includes(p.id)));
      setSelectedPosts([]);

      alert("Selected posts deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete selected posts.");
    }
  }}
  style={{
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "10px",
  }}
>
  🗑 Delete Selected
</button>

    <button
  type="button"
  onClick={async () => {
    if (selectedPosts.length === 0) {
      alert("Please select at least one post.");
      return;
    }

    try {
      for (const id of selectedPosts) {
        await updateDoc(doc(db, "posts", id), {
          status: "published",
        });
      }

      setPosts(
        posts.map((post) =>
          selectedPosts.includes(post.id)
            ? { ...post, status: "published" }
            : post
        )
      );

      setSelectedPosts([]);
      alert("Selected posts published successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to publish selected posts.");
    }
  }}
  style={{
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "10px",
  }}
>
  ✅ Publish Selected
</button>

    <button
  type="button"
  onClick={async () => {
    if (selectedPosts.length === 0) {
      alert("Please select at least one post.");
      return;
    }

    try {
      for (const id of selectedPosts) {
        await updateDoc(doc(db, "posts", id), {
          status: "draft",
        });
      }

      setPosts(
        posts.map((post) =>
          selectedPosts.includes(post.id)
            ? { ...post, status: "draft" }
            : post
        )
      );

      setSelectedPosts([]);
      alert("Selected posts moved to draft!");
    } catch (err) {
      console.error(err);
      alert("Failed to move posts.");
    }
  }}
  style={{
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  📦 Move to Draft
</button>
  </div>
)}
<input
  type="text"
  placeholder="Search posts..."
  value={search}
  onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    marginBottom: "20px",
  }}
/>
      <div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  <select
    value={statusFilter}
    onChange={(e) => {
      setStatusFilter(e.target.value);
      setCurrentPage(1);
    }}
    style={{
      padding: "10px",
      borderRadius: "8px",
      background: "#1e293b",
      color: "white",
      border: "1px solid #334155",
    }}
  >
    <option value="">All Status</option>
    <option value="published">Published</option>
    <option value="draft">Draft</option>
  </select>

  <select
    value={categoryFilter}
    onChange={(e) => {
      setCategoryFilter(e.target.value);
      setCurrentPage(1);
    }}
    style={{
      padding: "10px",
      borderRadius: "8px",
      background: "#1e293b",
      color: "white",
      border: "1px solid #334155",
    }}
  >
    <option value="">All Categories</option>

    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>
      <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "#1e293b",
    color: "white",
  }}
>
  <thead>
    <tr>
      <th style={{ padding: "12px" }}>
  <input
    type="checkbox"
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedPosts(paginatedPosts.map((p) => p.id));
      } else {
        setSelectedPosts([]);
      }
    }}
  />
</th>
<th style={{ padding: "12px", textAlign: "left" }}>Image</th>
<th style={{ padding: "12px", textAlign: "left" }}>Title</th>
      <th>Category</th>
      <th>Status</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
  {loading ? (
    <tr>
      <td colSpan="6" style={{ padding: "20px", textAlign: "center" }}>
        Loading...
      </td>
    </tr>
  ) : filteredPosts.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ padding: "20px", textAlign: "center" }}>
        No posts found
      </td>
    </tr>
  ) : (
    paginatedPosts.map((post) => (
      <tr key={post.id}>
<td style={{ padding: "12px" }}>
  <input
    type="checkbox"
    checked={selectedPosts.includes(post.id)}
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedPosts([...selectedPosts, post.id]);
      } else {
        setSelectedPosts(
          selectedPosts.filter((id) => id !== post.id)
        );
      }
    }}
  />
</td>

  {/* Image */}
  <td style={{ padding: "12px" }}>
    {post.image ? (
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "60px",
          height: "40px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />
    ) : (
      <div
        style={{
          width: "60px",
          height: "40px",
          background: "#374151",
          color: "#fff",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
        }}
      >
        No Image
      </div>
    )}
  </td>

  {/* Title */}
  <td style={{ padding: "12px" }}>
    {post.title || "-"}
  </td>

  {/* Category */}
  <td style={{ padding: "12px" }}>
    {post.category || "-"}
  </td>

  {/* Status */}
  <td style={{ padding: "12px" }}>
    <span
      style={{
        background:
          post.status === "published"
            ? "#16a34a"
            : "#f59e0b",
        color: "#fff",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {post.status || "draft"}
    </span>
  </td>

  {/* Date */}
  <td style={{ padding: "12px" }}>
    {post.createdAt?.toDate
      ? post.createdAt.toDate().toLocaleDateString()
      : post.createdAt
      ? new Date(post.createdAt).toLocaleDateString()
      : "-"}
  </td>

  {/* Actions */}
   <td style={{ padding: "12px" }}>
    <button
      onClick={() => handleEdit(post.bloggerPostId)}
      style={{
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        marginRight: "8px",
        cursor: "pointer",
      }}
    >
      Edit
    </button>

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
      Delete
    </button>
    
    <button
  onClick={() => setPreviewPost(post)}
  style={{
    background: "#0ea5e9",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "8px",
    cursor: "pointer",
  }}
>
  👁 View
</button>
  </td>
</tr>
    ))
  )}
</tbody>
</table>
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
  }}
>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    Previous
  </button>

  <span style={{ color: "white" }}>
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    Next
  </button>
</div>
      {previewPost && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        width: "90%",
        maxWidth: "700px",
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#1e293b",
        color: "#fff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2>{previewPost.title}</h2>

      {previewPost.image && (
        <img
          src={previewPost.image}
          alt={previewPost.title}
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />
      )}

      <p>
        <strong>Category:</strong> {previewPost.category}
      </p>

      <p>
        <strong>Status:</strong> {previewPost.status}
      </p>

      <hr />
      <div
        dangerouslySetInnerHTML={{
          __html: previewPost.content || "<p>No content</p>",
        }}
      />

      <button
        onClick={() => setPreviewPost(null)}
        style={{
          marginTop: "20px",
          background: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
    </Layout>
  );
}

export default Posts;

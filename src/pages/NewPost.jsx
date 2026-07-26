import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { publishPost, getPost, updatePost } from "../services/bloggerService";
import { useSearchParams } from "react-router-dom";

function NewPost() {
  const [searchParams] = useSearchParams();
const postId = searchParams.get("id");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("World");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  async function loadPost() {
    if (!postId) return;

    const post = await getPost(postId);

    setTitle(post.title);
    setCategory(post.labels?.[0] || "World");
    const temp = document.createElement("div");
temp.innerHTML = post.content;
const img = temp.querySelector("img");

if (img) {
  setImage(img.src);
}
setContent(temp.innerText);
  }

  loadPost();
}, [postId]);

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Please enter headline and article content.");
      return;
    }

    setLoading(true);

    try {
      const html = image
  ? `<img src="${image}" style="max-width:100%;height:auto;" /><br/><br/>${content.replace(/\n/g, "<br/>")}`
  : content.replace(/\n/g, "<br/>");

if (postId) {
  await updatePost(postId, title, html, [category]);
} else {
  await publishPost(title, html, [category]);
}

      alert(
  postId
    ? "Article Updated Successfully!"
    : "Article Published Successfully!"
);

      setTitle("");
      setCategory("World");
      setImage("");
      setContent("");
    } catch (error) {
  console.error(error);

  alert(
    error?.result?.error?.message ||
    error?.message ||
    JSON.stringify(error)
  );
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>{postId ? "Edit Post" : "Create New Post"}</h2>

        <div style={{ marginTop: "20px" }}>
          <label>Headline</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter headline..."
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <option>World</option>
            <option>India</option>
            <option>Politics</option>
            <option>Technology</option>
            <option>Sports</option>
            <option>Entertainment</option>
          </select>

          <label>Featured Image URL</label>

          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste image URL..."
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          />

          <label>Article Content</label>

          <textarea
  value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder="Write your article..."
  style={{
    width: "100%",
    minHeight: "500px",
    height: "500px",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    borderRadius: "8px",
    resize: "vertical",
    overflowY: "auto",
  }}
/>

          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            >
              Save Draft
            </button>

            <button
              onClick={handlePublish}
              disabled={loading}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {loading
  ? (postId ? "Updating..." : "Publishing...")
  : (postId ? "Update" : "Publish")}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewPost;

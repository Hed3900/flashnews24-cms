import { useState } from "react";
import Layout from "../components/Layout";
import { publishPost } from "../services/bloggerService";

function NewPost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("World");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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

      await publishPost(title, html, [category]);

      alert("Article Published Successfully!");

      setTitle("");
      setCategory("World");
      setImage("");
      setContent("");
    } catch (error) {
      console.error(error);
      alert("Publish failed.");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Create New Post</h2>

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
            rows="12"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article..."
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "8px",
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
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewPost;

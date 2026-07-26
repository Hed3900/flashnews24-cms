import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { publishPost, getPost, updatePost } from "../services/bloggerService";
import { useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useRef } from "react";
function NewPost() {
  const fileInputRef = useRef(null);

const CLOUD_NAME = "ye80kxro";
const UPLOAD_PRESET = "flashnews24";
  const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};
  const [searchParams] = useSearchParams();
const postId = searchParams.get("id");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("World");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const wordCount = content
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  useEffect(() => {
  async function loadPost() {
    if (!postId) return;

    const post = await getPost(postId);
console.log(post.content);
    setTitle(post.title);
    setCategory(post.labels?.[0] || "World");
    const temp = document.createElement("div");
temp.innerHTML = post.content;

const img = temp.querySelector("img");

if (img) {
  setImage(img.src);
  img.remove();
}

setContent(temp.innerHTML);

setDescription(post.summary || "");
setSlug(generateSlug(post.title));
  }

  loadPost();
}, [postId]);
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
  {
    method: "POST",
    body: formData,
  }
);

  const data = await res.json();

  if (data.secure_url) {
  setImage(data.secure_url);
  alert("Image uploaded successfully!");
} else {
  alert(JSON.stringify(data));
  }
};
  const handlePublish = async () => {
  if (!title || !content) {
    alert("Please enter headline and article content.");
    return;
  }

  setLoading(true);

  try {

    const html = `
<!-- META_DESCRIPTION:${description} -->
<!-- META_KEYWORDS:${keywords} -->
${image ? `<img src="${image}" style="max-width:100%;height:auto;" /><br/><br/>` : ""}
${content.replace(/\n/g, "<br/>")}
`;

    if (postId) {
      await updatePost(postId, title, html, [category]);
    } else {
      await publishPost(title, html, [category]);
    }

    // migatha code...
  alert(
    postId
      ? "Article Updated Successfully!"
      : "Article Published Successfully!"
  );

  if (!postId) {
    setTitle("");
    setCategory("World");
    setImage("");
    setContent("");
    setDescription("");
setKeywords("");
setSlug("");
  }

} catch (error) {
  console.error(error);

  alert(
    error?.result?.error?.message ||
    error?.message ||
    JSON.stringify(error)
  );
}

setLoading(false);
  }
  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>{postId ? "Edit Post" : "Create New Post"}</h2>

        <div style={{ marginTop: "20px" }}>
          <label>Headline</label>

          <input
  type="text"
  value={title}
  onChange={(e) => {
    setTitle(e.target.value);
    setSlug(generateSlug(e.target.value));
  }}
  placeholder="Enter headline..."
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    borderRadius: "8px"
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
          <input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  style={{
    width: "100%",
    marginTop: "10px",
    marginBottom: "20px",
  }}
/>
 <label>Meta Description</label>

<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Enter SEO meta description (150-160 characters)"
  rows={4}
  maxLength={160}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    borderRadius: "8px",
    resize: "vertical"
  }}
/>

<div style={{
  textAlign: "right",
  color: "#888",
  marginBottom: "20px"
}}>
  {description.length}/160
</div>
          <label>SEO Slug</label>

<input
  type="text"
  value={slug}
  onChange={(e) => setSlug(e.target.value)}
  placeholder="seo-friendly-url"
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    borderRadius: "8px"
  }}
/>
         <label>SEO Keywords</label>

<input
  type="text"
  value={keywords}
  onChange={(e) => setKeywords(e.target.value)}
  placeholder="breaking news, india, politics, flashnews24"
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "20px",
    borderRadius: "8px"
  }}
/>
          <label>Article Content</label>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    color: "#888",
    fontSize: "14px",
    marginBottom: "10px",
  }}
>
  <span>Words: {wordCount}</span>
  <span>{readingTime} min read</span>
</div>
<div
  style={{
    textAlign: "right",
    color: "#888",
    marginBottom: "10px",
    fontSize: "14px",
  }}
>
  Words: {wordCount}
</div>

<ReactQuill
  theme="snow"
  value={content}
  onChange={setContent}
  modules={modules}
  style={{
    marginTop: "8px",
    marginBottom: "20px",
    background: "white",
    color: "black",
    minHeight: "500px",
  }}
/>
          {showPreview && (
  <div
    style={{
      background: "#fff",
      color: "#000",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "20px",
    }}
  >
    <h1>{title}</h1>

    <p style={{ color: "#666" }}>
      {description}
    </p>

    {image && (
      <img
        src={image}
        alt={title}
        style={{
  width: "100%",
  height: "auto",
  maxHeight: "450px",
  objectFit: "cover",
  borderRadius: "12px",
  display: "block",
  margin: "20px auto"
}}
      />
    )}

    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  </div>
)}
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
            <button
  onClick={() => setShowPreview(!showPreview)}
  style={{
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    marginRight: "10px",
  }}
>
  {showPreview ? "Hide Preview" : "Preview"}
</button>
    </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewPost;

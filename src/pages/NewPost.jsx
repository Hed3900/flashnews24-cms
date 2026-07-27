import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { publishPost, getPost, updatePost } from "../services/bloggerService";
import { useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const navigate = useNavigate();
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
  const [categories, setCategories] = useState([]);
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
  async function loadCategories() {
    const snapshot = await getDocs(collection(db, "categories"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCategories(data);
  }

  loadCategories();
}, []);

useEffect(() => {
  async function loadPost() {
    if (!postId) return;

    const post = await getPost(postId);

    setTitle(post.title);
    setCategory(post.labels?.[0] || "World");

    const temp = document.createElement("div");
    temp.innerHTML = post.content;

    // 👇 Ikkadi nundi nee existing code
    const img = temp.querySelector("img");
    if (img) {
      setImage(img.src);
      img.remove();
    }

    temp.querySelectorAll("p").forEach((p) => {
      if (!p.textContent.trim() && !p.querySelector("img")) {
        p.remove();
      }
    });

    const cleanedHtml = temp.innerHTML
      .replace(/&nbsp;/g, " ")
      .replace(/&#39;/g, "'")
      .replace(/<br\s*\/?>/gi, "")
      .trim();

    setContent(cleanedHtml);
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
  const handleSaveDraft = async () => {
  if (!title) {
    alert("Please enter headline.");
    return;
  }

  setLoading(true);

  try {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");

    const draftId = postId || crypto.randomUUID();

    await setDoc(doc(db, "posts", draftId), {
      bloggerPostId: "",
      authorEmail: email,
      authorName: name,
      title,
      category,
      image,
      description,
      keywords,
      slug,
      content,
      status: "draft",
      createdAt: new Date().toISOString(),
    });

    alert("Draft Saved Successfully!");
    navigate("/drafts");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }

  setLoading(false);
};
  const handlePublish = async () => {
    console.log(content);
  if (!title || !content) {
    alert("Please enter headline and article content.");
    return;
  }

  setLoading(true);

  try {
const cleanContent = content
  .replace(/&nbsp;/g, " ")
  .trim();
    const html = `
<!-- META_DESCRIPTION:${description} -->
<!-- META_KEYWORDS:${keywords} -->
${cleanContent}
`;
    let response;

if (postId) {
  response = await updatePost(postId, title, html, [category]);
} else {
  response = await publishPost(title, html, [category]);
}

const email = localStorage.getItem("email");
const name = localStorage.getItem("name");

const bloggerPostId = postId || response.result.id;

await setDoc(doc(db, "posts", bloggerPostId), {
  bloggerPostId,
  authorEmail: email,
  authorName: name,
  title,
  category,
  image,
  description,
  keywords,
  slug,
  content,
  status: "published",
  createdAt: new Date().toISOString(),
});

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

const previewHtml = `
<!-- META_DESCRIPTION:${description} -->
<!-- META_KEYWORDS:${keywords} -->
${content}
`;

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
  {categories.map((cat) => (
    <option key={cat.id} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>

          <label>Featured Image URL</label>

          <img
  src={image}
  alt={title}
  style={{
    width: "100%",
    maxWidth: "900px",
    height: "350px",
    objectFit: "cover",
    display: "block",
    margin: "20px auto",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,.15)"
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
  width: "100%",
  maxWidth: "100%",
  margin: "20px auto"
}}
/>
  {showPreview && (
  <div
    style={{
  width: "100%",
  maxWidth: "100%",
  margin: "30px auto",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxSizing: "border-box",
  overflow: "hidden",
}}
  >
    <h1
  style={{
    fontSize: "36px",
    fontWeight: "700",
    color: "#111",
    marginBottom: "16px",
    lineHeight: "1.3",
  }}
>
  {title}
</h1>

    <p style={{ color: "#666" }}>
      {description}
    </p>
    {image && (
      <img
  src={image}
  alt={title}
  style={{
    width: "100%",
maxWidth: "100%",
height: "auto",
display: "block",
margin: "24px auto",
borderRadius: "12px",
objectFit: "cover",
  }}
      />
    )}

<div
  className="preview-content"
  style={{
    width: "100%",
    marginTop: "24px",
    fontSize: "20px",
    lineHeight: "2",
    color: "#222",
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: "0.2px",
    whiteSpace: "normal",
  }}
  dangerouslySetInnerHTML={{ __html: previewHtml }}
/>
</div>
  )}
          <div style={{ marginTop: "20px" }}>
            <button
  onClick={handleSaveDraft}
  disabled={loading}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    marginRight: "10px",
    cursor: "pointer",
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
  onClick={() =>
  navigate("/preview", {
    state: {
      title,
      description,
      image,
      content,
    },
  })
  }
  style={{
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    marginRight: "10px",
  }}
>
  Preview
</button>
    </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewPost;

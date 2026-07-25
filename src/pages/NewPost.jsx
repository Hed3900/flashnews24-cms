import Layout from "../components/Layout";
import { useState } from "react";

function NewPost() {
  
  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Create New Post</h2>

        <div style={{ marginTop: "20px" }}>
          <label>Headline</label>
          <input
            type="text"
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
  placeholder="Write your article..."
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
  }}
/>

          <div style={{ marginTop: "25px" }}>
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
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: "8px",
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewPost;

import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebase";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function MediaLibrary() {
  const fileInputRef = useRef(null);

  const CLOUD_NAME = "ye80kxro";
  const UPLOAD_PRESET = "flashnews24";

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    try {
      const snapshot = await getDocs(collection(db, "media"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      data.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );

      setMedia(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setLoading(false);
  }

  async function handleUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        UPLOAD_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        alert("Upload Failed");
        setUploading(false);
        return;
      }

      await addDoc(collection(db, "media"), {
        imageUrl: data.secure_url,
        publicId: data.public_id,
        fileName: file.name,
        size: file.size,
        format: data.format,
        width: data.width,
        height: data.height,
        createdAt: new Date().toISOString(),
      });

      alert("Image Uploaded Successfully");

      loadMedia();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setUploading(false);
  }

  async function handleDelete(id) {
    const ok = window.confirm(
      "Delete this image?"
    );

    if (!ok) return;

    try {
      await deleteDoc(doc(db, "media", id));

      setMedia((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Deleted Successfully");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url);

    alert("Image URL Copied");
  }

  const filteredMedia = media.filter((item) =>
    item.fileName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div
        style={{
          padding: "20px",
          color: "white",
        }}
      >
        <h2>Media Library</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() =>
              fileInputRef.current.click()
            }
            disabled={uploading}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {uploading
              ? "Uploading..."
              : "Upload Image"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUpload}
          />

          <input
            type="text"
            placeholder="Search Images..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              flex: 1,
              minWidth: "220px",
              background: "#1e293b",
              color: "white",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "12px",
            }}
          />
        </div>
                {loading ? (
          <h3>Loading...</h3>
        ) : filteredMedia.length === 0 ? (
          <h3>No Images Found</h3>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(250px,1fr))",
              gap: "20px",
            }}
          >
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#1e293b",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,.3)",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.fileName}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    padding: "15px",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      marginBottom: "10px",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.fileName}
                  </h4>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                      marginBottom: "10px",
                    }}
                  >
                    {item.width} × {item.height}
                  </p>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                      marginBottom: "15px",
                    }}
                  >
                    {Math.round(item.size / 1024)} KB
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() =>
                        window.open(
                          item.imageUrl,
                          "_blank"
                        )
                      }
                      style={{
                        flex: 1,
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Preview
                    </button>

                    <button
                      onClick={() =>
                        copyUrl(item.imageUrl)
                      }
                      style={{
                        flex: 1,
                        background: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Copy URL
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      style={{
                        width: "100%",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MediaLibrary;

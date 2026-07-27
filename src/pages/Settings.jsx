import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Settings() {
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const CLOUD_NAME = "ye80kxro";
  const UPLOAD_PRESET = "flashnews24";

  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    websiteUrl: "",
    logo: "",
    favicon: "",
    facebook: "",
    twitter: "",
    instagram: "",
    telegram: "",
    youtube: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const ref = doc(db, "settings", "site");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setSettings(snap.data());
      }
    } catch (err) {
      console.error(err);
    }
  }

  function updateField(name, value) {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function uploadImage(file, field) {
    if (!file) return;

    setLoading(true);

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

      if (data.secure_url) {
        updateField(field, data.secure_url);
      } else {
        alert("Upload Failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setLoading(false);
  }

  async function saveSettings() {
    setLoading(true);

    try {
      await setDoc(
        doc(db, "settings", "site"),
        settings
      );

      alert("Settings Saved Successfully");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div
        style={{
          padding: "20px",
          color: "white",
          maxWidth: "900px",
        }}
      >
        <h2>Settings</h2>

        <label>Site Name</label>

        <input
          value={settings.siteName}
          onChange={(e) =>
            updateField(
              "siteName",
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />

        <label>Site Description</label>

        <textarea
          rows={3}
          value={settings.siteDescription}
          onChange={(e) =>
            updateField(
              "siteDescription",
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />

        <label>Website URL</label>

        <input
          value={settings.websiteUrl}
          onChange={(e) =>
            updateField(
              "websiteUrl",
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />
                <label>Site Logo</label>

        {settings.logo && (
          <img
            src={settings.logo}
            alt="Logo"
            style={{
              width: "180px",
              height: "auto",
              display: "block",
              margin: "15px 0",
              borderRadius: "8px",
            }}
          />
        )}

        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) =>
            uploadImage(e.target.files[0], "logo")
          }
        />

        <button
          onClick={() => logoInputRef.current.click()}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Upload Logo
        </button>

        <label>Favicon</label>

        {settings.favicon && (
          <img
            src={settings.favicon}
            alt="Favicon"
            style={{
              width: "64px",
              height: "64px",
              display: "block",
              margin: "15px 0",
            }}
          />
        )}

        <input
          ref={faviconInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) =>
            uploadImage(e.target.files[0], "favicon")
          }
        />

        <button
          onClick={() => faviconInputRef.current.click()}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "25px",
          }}
        >
          Upload Favicon
        </button>

        <h3>Social Media</h3>

        {[
          "facebook",
          "twitter",
          "instagram",
          "telegram",
          "youtube",
        ].map((field) => (
          <input
            key={field}
            placeholder={field}
            value={settings[field]}
            onChange={(e) =>
              updateField(field, e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          />
        ))}

        <h3>SEO</h3>

        <input
          placeholder="Default SEO Title"
          value={settings.seoTitle}
          onChange={(e) =>
            updateField("seoTitle", e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        />

        <textarea
          rows={4}
          placeholder="Default SEO Description"
          value={settings.seoDescription}
          onChange={(e) =>
            updateField(
              "seoDescription",
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        />

        <input
          placeholder="Default SEO Keywords"
          value={settings.seoKeywords}
          onChange={(e) =>
            updateField(
              "seoKeywords",
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "25px",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={saveSettings}
          disabled={loading}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading
            ? "Saving..."
            : "Save Settings"}
        </button>
      </div>
    </Layout>
  );
}

export default Settings;

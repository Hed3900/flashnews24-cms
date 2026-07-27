import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function MediaPickerModal({
  open,
  onClose,
  onSelect,
}) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) {
      loadMedia();
    }
  }, [open]);

  async function loadMedia() {
    setLoading(true);

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
    }

    setLoading(false);
  }

  if (!open) return null;

  const filtered = media.filter((item) =>
    (item.fileName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#0f172a",
          borderRadius: "12px",
          padding: "20px",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>
            Media Library
          </h2>

          <button
            onClick={onClose}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "#fff",
          }}
        />
                {loading ? (
          <h3>Loading images...</h3>
        ) : filtered.length === 0 ? (
          <h3>No Images Found</h3>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#1e293b",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid #334155",
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

                <div style={{ padding: "12px" }}>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: "15px",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.fileName}
                  </h4>

                  <button
                    onClick={() => {
                      onSelect(item.imageUrl);
                      onClose();
                    }}
                    style={{
                      width: "100%",
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Select Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

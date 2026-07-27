import Layout from "../components/Layout";

function MediaLibrary() {
  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Media Library</h2>

        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Upload Image
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://via.placeholder.com/300x180"
              alt="media"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <button>Edit</button>
              <button style={{ marginLeft: "10px" }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MediaLibrary;

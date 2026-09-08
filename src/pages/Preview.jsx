import { useLocation, useNavigate } from "react-router-dom";

function Preview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No Preview Available</h2>

        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            marginTop: "15px",
          }}
        >
          ← Back to Editor
        </button>
      </div>
    );
  }

  const {
    title = "",
    description = "",
    image = "",
    content = "",
  } = state;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxSizing: "border-box",
        }}
      >

        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#475569",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          ← Back to Editor
        </button>

        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            color: "#111",
            marginBottom: "20px",
          }}
        >
          {title || "No Title"}
        </h1>

        {description && (
          <p
            style={{
              color: "#666",
              marginBottom: "20px",
            }}
          >
            {description}
          </p>
        )}

        {image && (
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              borderRadius: "12px",
              marginBottom: "24px",
              display: "block",
            }}
          />
        )}

        <div
          className="preview-content"
          style={{
            fontSize: "22px",
            lineHeight: "2",
            color: "#222",
            fontFamily: 'Georgia, "Times New Roman", serif',
            wordBreak: "normal",
            overflowWrap: "normal",
            whiteSpace: "normal",
          }}
          dangerouslySetInnerHTML={{
            __html: content
              ? content
                  .replace(/&nbsp;/g, " ")
                  .replace(/<p><br><\/p>/g, "")
              : "",
          }}
        />

      </div>
    </div>
  );
}

export default Preview;

import { useLocation } from "react-router-dom";

function Preview() {
  const { state } = useLocation();

  if (!state) {
    return <h2 style={{ padding: 20 }}>No Preview Available</h2>;
  }

  const { title, description, image, content } = state;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <h1>{title}</h1>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        {description}
      </p>

      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "20px",
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
      .replace(/&nbsp;/g, " ")
      .replace(/<p><br><\/p>/g, "")
  }}
/>
    </div>
  );
}

export default Preview;

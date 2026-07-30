import { useState } from "react";

export default function Notification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNotification = async () => {
    if (!title || !body) {
      alert("Enter title and message");
      return;
    }

    setLoading(true);

    try {
      // Cloud Function URL ni ikkada add chestam
      // const response = await fetch("YOUR_CLOUD_FUNCTION_URL", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     title,
      //     body,
      //   }),
      // });

      alert("Notification request is ready.");
    } catch (err) {
      console.error(err);
      alert("Failed to send notification");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: "#1b1b1b",
        borderRadius: "12px",
        color: "#fff",
      }}
    >
      <h2>📢 Send Notification</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Notification Title"
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "8px",
          border: "1px solid #333",
        }}
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Notification Message"
        rows={5}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          borderRadius: "8px",
          border: "1px solid #333",
        }}
      />

      <button
        onClick={sendNotification}
        disabled={loading}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "14px",
          background: "#d60000",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Sending..." : "🚀 Send Notification"}
      </button>
    </div>
  );
}

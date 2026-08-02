import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function DeletePosts() {
  const [loading, setLoading] = useState(false);

  async function deleteAllPosts() {
    const ok = window.confirm(
      "Delete ALL posts from Firestore?"
    );

    if (!ok) return;

    setLoading(true);

    try {
      const snapshot = await getDocs(collection(db, "posts"));

      for (const d of snapshot.docs) {
        await deleteDoc(doc(db, "posts", d.id));
      }

      alert("✅ All posts deleted successfully.");
    } catch (e) {
      console.error(e);
      alert(e.message);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        padding: 40,
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h2>Delete Firestore Posts</h2>

      <button
        onClick={deleteAllPosts}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "15px 30px",
          background: "#d60000",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {loading ? "Deleting..." : "Delete All Posts"}
      </button>
    </div>
  );
}

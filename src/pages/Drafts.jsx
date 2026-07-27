import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

function Drafts() {
  const [drafts, setDrafts] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    loadDrafts();
  }, []);

  async function loadDrafts() {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "draft")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setDrafts(data);
  }
async function publishDraft(id) {
  await updateDoc(doc(db, "posts", id), {
    status: "published",
  });

  alert("Draft Published Successfully!");

  loadDrafts();
}

async function deleteDraft(id) {
  if (!window.confirm("Delete this draft?")) return;

  await deleteDoc(doc(db, "posts", id));

  loadDrafts();
}
  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Drafts</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {drafts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.authorName}</td>
                <td>
  <button
    onClick={() => navigate(`/new-post?id=${post.id}`)}
    style={{ marginRight: "8px" }}
  >
    Edit
  </button>

  <button
    onClick={() => publishDraft(post.id)}
    style={{ marginRight: "8px" }}
  >
    Publish
  </button>

  <button
    onClick={() => deleteDraft(post.id)}
  >
    Delete
  </button>
</td>
              </tr>
            ))}

            {drafts.length === 0 && (
              <tr>
                <td colSpan="4">No Drafts Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Drafts;

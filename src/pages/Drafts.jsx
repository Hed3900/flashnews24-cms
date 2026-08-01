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
import { publishPost } from "../services/bloggerService";
function Drafts() {
  const [drafts, setDrafts] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    loadDrafts();
  }, []);

  async function publishDraft(post) {
  try {
    const html = `
${post.image ? `<img src="${post.image}" alt="${post.title}" style="width:100%;height:auto;border-radius:8px;margin-bottom:20px;" />` : ""}

${post.content}
`;

    const response = await publishPost(
      post.title,
      html,
      [post.category]
    );

    await updateDoc(doc(db, "posts", post.id), {
      status: "published",
      bloggerPostId: response.result.id,
      bloggerUrl: response.result.url || "",
      publishedAt: new Date().toISOString(),
    });

    alert("Draft Published Successfully!");
    loadDrafts();

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  }
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
    onClick={() => publishDraft(post)} 
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

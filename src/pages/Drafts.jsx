import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Drafts() {
  const [drafts, setDrafts] = useState([]);

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
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {drafts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.authorName}</td>
                <td>{post.status}</td>
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

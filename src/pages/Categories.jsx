import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
  loadCategories();
}, []);

async function loadCategories() {
  try {
    const snapshot = await getDocs(collection(db, "categories"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCategories(data);
  } catch (err) {
    console.error(err);
  }
}

async function addCategory() {
  if (!name.trim()) {
    alert("Enter category name");
    return;
  }

  await setDoc(doc(db, "categories", name), {
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  });

  setName("");
  loadCategories();
}

async function removeCategory(id) {
  if (!window.confirm("Delete Category?")) return;

  await deleteDoc(doc(db, "categories", id));

  loadCategories();
}

return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Categories</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
  <button onClick={() => removeCategory(category.id)}>
    Delete
  </button>
</td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="3">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Categories;

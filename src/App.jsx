import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Categories from "./pages/Categories";
import Authors from "./pages/Authors";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/authors" element={<Authors />} />
    </Routes>
  );
}

export default App;

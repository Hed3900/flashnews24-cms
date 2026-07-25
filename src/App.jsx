import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Authors from "./pages/Authors";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;

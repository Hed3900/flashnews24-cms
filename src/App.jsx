import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Categories from "./pages/Categories";
import Authors from "./pages/Authors";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function App() {
const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/authors" element={role === "admin" ? <Authors /> : <Dashboard />} />
<Route path="/categories" element={role === "admin" ? <Categories /> : <Dashboard />} />
<Route path="/settings" element={role === "admin" ? <Settings /> : <Dashboard />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// migatha imports...

function App() {
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {!isLoggedIn ? (
        <Route path="*" element={<Login />} />
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/notification" element={<Notification />} />

          <Route
            path="/authors"
            element={role === "admin" ? <Authors /> : <Dashboard />}
          />
          <Route
            path="/categories"
            element={role === "admin" ? <Categories /> : <Dashboard />}
          />
          <Route
            path="/settings"
            element={role === "admin" ? <Settings /> : <Dashboard />}
          />
        </>
      )}
    </Routes>
  );
}

export default App;

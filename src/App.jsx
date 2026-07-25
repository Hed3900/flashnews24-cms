import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

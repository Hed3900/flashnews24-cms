import { NavLink } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <aside className="sidebar">
      <div className="logo">
        FlashNews24 CMS
      </div>

      <nav>
        <NavLink to="/">Dashboard</NavLink><br />
<NavLink to="/posts">Posts</NavLink><br />
<NavLink to="/new-post">New Post</NavLink><br />
<NavLink to="/drafts">Drafts</NavLink><br />
        <NavLink to="/media">Media Library</NavLink><br />
        <NavLink to="/media">Media Library</NavLink><br />
<NavLink to="/notification">🔔 Notifications</NavLink><br />
{role === "admin" && (
  <>
    <NavLink to="/authors">Authors</NavLink><br />
    <NavLink to="/categories">Categories</NavLink><br />
    <NavLink to="/settings">Settings</NavLink>
  </>
)}
      </nav>
    </aside>
  );
}

export default Sidebar;

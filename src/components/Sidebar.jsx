import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        FlashNews24 CMS
      </div>

      <nav>
        <NavLink to="/">Dashboard</NavLink><br />
        <NavLink to="/posts">Posts</NavLink><br />
        <NavLink to="/authors">Authors</NavLink><br />
        <NavLink to="/categories">Categories</NavLink><br />
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;

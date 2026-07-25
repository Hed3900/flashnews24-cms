import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Posts", path: "/posts", icon: "📰" },
    { name: "New Article", path: "/new-post", icon: "✍️" },
    { name: "Categories", path: "/categories", icon: "📂" },
    { name: "Authors", path: "/authors", icon: "👤" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        FlashNews24
        <br />
        <span style={{ fontSize: "14px", color: "#cbd5e1" }}>
          CMS v1
        </span>
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              <span style={{ marginRight: "10px" }}>{item.icon}</span>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;

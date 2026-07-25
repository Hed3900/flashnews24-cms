import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <Header />

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

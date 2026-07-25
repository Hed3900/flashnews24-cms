import Layout from "../components/Layout";

function Dashboard() {
  return (
    <Layout>
      <h1>Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <h2>Total Posts</h2>
          <p>120</p>
        </div>

        <div className="card">
          <h2>Published</h2>
          <p>98</p>
        </div>

        <div className="card">
          <h2>Drafts</h2>
          <p>22</p>
        </div>

        <div className="card">
          <h2>Authors</h2>
          <p>5</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

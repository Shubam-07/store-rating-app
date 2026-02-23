import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const role = localStorage.getItem("role");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "230px",
        background: "#1f2937",
        color: "white",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "30px" }}>Store Rating</h2>

        <p style={{ marginBottom: "20px", fontSize: "14px", opacity: 0.7 }}>
          {role}
        </p>

        <button
          style={sidebarBtn}
          onClick={() => navigate(`/${role.toLowerCase()}`)}
        >
          Dashboard
        </button>

        <button
          style={{ ...sidebarBtn, backgroundColor: "#ef4444" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f9fafb", padding: "30px" }}>
        {children}
      </div>
    </div>
  );
};

const sidebarBtn = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#374151",
  color: "white",
  cursor: "pointer"
};

export default Layout;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error500 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setTimeout(() => navigate("/signin"), 3000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Error 500</h1>
      <p>El servidor no responde. Te redirigiremos al login...</p>
    </div>
  );
};

export default Error500;

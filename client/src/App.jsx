import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/health`);
        setMessage(res.data.message);
      } catch (error) {
        setMessage("API not reachable");
      }
    };

    fetchHealth();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Smart-Stack-IMS</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
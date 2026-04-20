import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000"; // change after deploy

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, data);
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
      console.log(err.response?.data || err.message);
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/api/profile`, {
        headers: { Authorization: token }
      });

      alert(res.data.message);
    } catch {
      alert("Access denied");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loggedIn) {
    return (
      <div>
        <h2>Dashboard</h2>
        <button onClick={getProfile}>Get Profile</button>
        <br /><br />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
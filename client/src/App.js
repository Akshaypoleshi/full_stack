import { useState } from "react";
import Login from "./Login";
import Register from "./register";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? <Login /> : <Register />}

      <br />

      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Go to Register" : "Go to Login"}
      </button>
    </div>
  );
}

export default App;
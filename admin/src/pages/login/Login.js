import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:  "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url('https://wallpapercave.com/wp/wp5063607.jpg')",
        backgroundSize: "cover"
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 40, width:250 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20, width:250 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:150 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
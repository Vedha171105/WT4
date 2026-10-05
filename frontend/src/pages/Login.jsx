import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server.");
    }
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">LOGIN / ACCESS</span>
          <h1>
            LOGIN<span>.</span>
          </h1>
        </div>

        <p>Login to register for TechFest events.</p>
      </div>

      <div className="registration-layout">
        <form className="brutal-form" onSubmit={handleSubmit}>
          <label>
            EMAIL *
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOU@EMAIL.COM"
              required
            />
          </label>

          <label>
            PASSWORD *
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="YOUR PASSWORD"
              required
            />
          </label>

          <button className="black-btn submit-btn" type="submit">
            LOGIN ↗
          </button>

          {message && (
            <p className="error-msg">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
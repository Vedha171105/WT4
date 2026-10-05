import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed.");
        return;
      }

      setSuccess(true);
      setMessage("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server.");
    }
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">SIGN UP / JOIN</span>
          <h1>
            SIGN UP<span>.</span>
          </h1>
        </div>

        <p>Create your TechFest account and join the experience.</p>
      </div>

      <div className="registration-layout">
        <form className="brutal-form" onSubmit={handleSubmit}>
          <label>
            FULL NAME *
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR NAME"
              required
            />
          </label>

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
              placeholder="CREATE PASSWORD"
              required
            />
          </label>

          <label>
            CONFIRM PASSWORD *
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="REPEAT PASSWORD"
              required
            />
          </label>

          <button className="black-btn submit-btn" type="submit">
            CREATE ACCOUNT ↗
          </button>

          {message && (
            <p className={success ? "success-msg" : "error-msg"}>
              {message}
            </p>
          )}
        </form>

        <aside className="validation-card">
          <span className="eyebrow">ACCOUNT / 01</span>
          <h2>JOIN<br />TECHFEST.</h2>

          <ul>
            <li><b>✓</b> Create your account</li>
            <li><b>✓</b> Secure password</li>
            <li><b>✓</b> Register for events</li>
            <li><b>✓</b> Track your registrations</li>
          </ul>

          <div className="mini-note">
            Your password is securely encrypted before being stored.
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Signup;
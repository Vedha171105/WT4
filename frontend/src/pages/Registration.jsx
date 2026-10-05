import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Registration() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [registeredEvent, setRegisteredEvent] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({});
    setMessage("");

    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (eventId === "") {
      newErrors.event = "Please select an event";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      setMessage("Please login before registering for an event.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: eventId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed.");
        return;
      }

      const selectedEvent = events.find(
        (event) => event._id === eventId
      );

      setRegisteredEvent(selectedEvent);
      setShowPopup(true);

    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server.");
    }
  }

  function closePopup() {
    setShowPopup(false);
    setEventId("");
  }

  return (
    <div className="page">

      <div className="page-heading">
        <div>
          <span className="eyebrow">03 / JOIN US</span>

          <h1>
            REGISTER<span>.</span>
          </h1>
        </div>

        <p>
          Fill in your details and select an event.
        </p>
      </div>

      <div className="registration-layout">

        <form
          className="brutal-form"
          onSubmit={handleSubmit}
        >

          <label>
            FULL NAME *

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR NAME"
            />

            {errors.name && (
              <small className="error-msg">
                {errors.name}
              </small>
            )}
          </label>

          <label>
            EMAIL *

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOU@EMAIL.COM"
            />

            {errors.email && (
              <small className="error-msg">
                {errors.email}
              </small>
            )}
          </label>

          <label>
            MOBILE NUMBER *

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-DIGIT NUMBER"
            />

            {errors.phone && (
              <small className="error-msg">
                {errors.phone}
              </small>
            )}
          </label>

          <label>
            SELECT EVENT *

            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            >
              <option value="">
                CHOOSE AN EVENT
              </option>

              {events.map((event) => (
                <option
                  key={event._id}
                  value={event._id}
                >
                  {event.name}
                </option>
              ))}
            </select>

            {errors.event && (
              <small className="error-msg">
                {errors.event}
              </small>
            )}
          </label>

          <button
            className="black-btn submit-btn"
            type="submit"
          >
            SUBMIT REGISTRATION ↗
          </button>

          {message && (
            <p className="error-msg">
              {message}
            </p>
          )}

        </form>

        <aside className="validation-card">

          <span className="eyebrow">
            CHECKLIST / 04
          </span>

          <h2>READY?</h2>

          <ul>
            <li>
              <b>✓</b> Name is required
            </li>

            <li>
              <b>✓</b> Valid email address
            </li>

            <li>
              <b>✓</b> 10 digit mobile number
            </li>

            <li>
              <b>✓</b> Choose an event
            </li>
          </ul>

          <div className="mini-note">
            You must be logged in to register for an event.
          </div>

          {!token && (
            <Link
              to="/login"
              className="black-btn"
              style={{
                display: "inline-block",
                marginTop: "15px",
                textDecoration: "none",
              }}
            >
              LOGIN FIRST →
            </Link>
          )}

        </aside>

      </div>

      {/* SUCCESS POPUP */}

      {showPopup && registeredEvent && (
        <div className="registration-modal-overlay">

          <div className="registration-modal">

            <button
              className="modal-close"
              onClick={closePopup}
            >
              ×
            </button>

            <div className="success-icon">
              ✓
            </div>

            <span className="eyebrow">
              REGISTRATION SUCCESSFUL
            </span>

            <h2>
              YOU'RE IN<span>.</span>
            </h2>

            <p className="modal-subtitle">
              Your registration has been successfully recorded.
            </p>

            <div className="registration-details">

              <div>
                <span>PARTICIPANT</span>
                <strong>{name}</strong>
              </div>

              <div>
                <span>EMAIL</span>
                <strong>{email}</strong>
              </div>

              <div>
                <span>EVENT</span>
                <strong>{registeredEvent.name}</strong>
              </div>

              <div>
                <span>CATEGORY</span>
                <strong>{registeredEvent.category}</strong>
              </div>

              <div>
                <span>FEE</span>
                <strong>
                  ₹{registeredEvent.fee}
                </strong>
              </div>

              <div>
                <span>EVENT DATE</span>
                <strong>
                  {new Date(
                    registeredEvent.date
                  ).toLocaleDateString("en-IN")}
                </strong>
              </div>

            </div>

            <button
              className="black-btn modal-button"
              onClick={closePopup}
            >
              DONE ✓
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Registration;
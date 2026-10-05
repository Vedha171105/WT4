import { useState } from "react";
import { Link } from "react-router-dom";

function EventCard({ event, index }) {
  const [seatsLeft, setSeatsLeft] = useState(event.seats);

  function handleRegister() {
    if (seatsLeft > 0) setSeatsLeft((value) => value - 1);
  }

  const soldOut = seatsLeft === 0;

  return (
    <article className={`event-card accent-${index % 4}`}>
      <div className="event-image-wrap">
        <img src={event.image} alt={event.name} className="event-image" />
        <span className="event-number">0{index + 1}</span>
      </div>

      <div className="event-body">
        <span className="tag">{event.category}</span>
        <h3>{event.name}</h3>

        <div className="event-meta">
          <span>◷ {event.time}</span>
          <span>₹ {event.fee === 0 ? "FREE" : event.fee}</span>
          <span>{seatsLeft} SEATS</span>
        </div>

        <div className="event-footer">
          {soldOut ? (
            <button className="black-btn sold" disabled>SOLD OUT</button>
          ) : (
            <button className="black-btn" onClick={handleRegister}>
              QUICK REGISTER ↗
            </button>
          )}
          <Link to="/register" className="arrow-link">→</Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;

import { useEffect, useState } from "react";
import EventList from "../components/EventList";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load events from the server.");
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const nameMatches = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatches =
      category === "All" || event.category === category;

    return nameMatches && categoryMatches;
  });

  if (loading) {
    return <div className="page">LOADING EVENTS...</div>;
  }

  if (error) {
    return <div className="page">{error}</div>;
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">02 / DISCOVER</span>
          <h1>
            EVENTS<span>.</span>
          </h1>
        </div>

        <p>Find your challenge. Pick your category. Save your seat.</p>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="SEARCH EVENTS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">ALL CATEGORIES</option>
          <option value="Technical">TECHNICAL</option>
          <option value="Workshop">WORKSHOP</option>
          <option value="Cultural">CULTURAL</option>
          <option value="Sports">SPORTS</option>
        </select>

        <span className="result-count">
          {filteredEvents.length} FOUND
        </span>
      </div>

      <EventList events={filteredEvents} />
    </div>
  );
}

export default Events;
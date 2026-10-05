import EventCard from "./EventCard";

function EventList({ events }) {
  if (events.length === 0) {
    return <div className="empty-state">NO EVENTS MATCH YOUR SEARCH.</div>;
  }

  return (
    <div className="event-grid">
      {events.map((event, index) => (
        <EventCard key={event._id} event={event} index={index} />
      ))}
    </div>
  );
}

export default EventList;

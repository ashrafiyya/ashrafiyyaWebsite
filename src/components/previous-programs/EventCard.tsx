import type { PastEvent } from "../../types/event";

type EventCardProps = {
  event: PastEvent;
};

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="event-card">
      <div className="detail-row">
        <strong>Event</strong>
        <span> {event.event}</span>
      </div>
      <div className="detail-row">
        <strong>Date</strong>
        <span> {event.date}</span>
      </div>
      {event.venue && (
        <div className="detail-row">
          <strong>Venue</strong>
          <span> {event.venue}</span>
        </div>
      )}
      {event.speaker && (
        <div className="detail-row">
          <strong>Speaker</strong>
          <span> {event.speaker}</span>
        </div>
      )}
      {event.notes && (
        <div className="detail-row">
          <strong>Notes</strong>
          <span> {event.notes}</span>
        </div>
      )}
    </div>
  );
};


import type { EventDetail } from "../../types/program";
import { DetailRow } from "../common/DetailRow";

type EventDetailsProps = {
  details: EventDetail[];
};

export const EventDetails = ({ details }: EventDetailsProps) => {
  return (
    <div className="event-details">
      {details.map((detail) => (
        <DetailRow key={detail.label} label={detail.label} value={detail.value} />
      ))}
    </div>
  );
};


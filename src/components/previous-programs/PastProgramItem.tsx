import type { BranchPastEvents } from "../../types/event";
import { Divider } from "../common/Divider";
import { EventCard } from "./EventCard";

type PastProgramItemProps = {
  branchEvents: BranchPastEvents;
  showDivider?: boolean;
};

export const PastProgramItem = ({ branchEvents, showDivider = true }: PastProgramItemProps) => {
  return (
    <div className="program-item">
      <h4>{branchEvents.branchName}</h4>
      <div className="event-details-multi">
        <div className="event-intro">Past {branchEvents.branchName} Events:</div>
        {branchEvents.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {showDivider && <Divider />}
    </div>
  );
};


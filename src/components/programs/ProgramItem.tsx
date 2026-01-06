import type { Program } from "../../types/program";
import { ExpandableDescription } from "../ExpandableDescription";
import { Divider } from "../common/Divider";
import { RegistrationButton } from "../common/RegistrationButton";
import { EventDetails } from "./EventDetails";

type ProgramItemProps = {
  program: Program;
  showDivider?: boolean;
};

export const ProgramItem = ({ program, showDivider = true }: ProgramItemProps) => {
  return (
    <div className="program-item">
      <h4>{program.title}</h4>
      
      {program.descriptions &&
        program.descriptions.map((description, index) => <p key={index}>{description}</p>)}
      
      {program.expandableDescription && (
        <ExpandableDescription
          intro={program.expandableDescription.intro}
          body={program.expandableDescription.body}
          extra={program.expandableDescription.extra}
        />
      )}
      
      <EventDetails details={program.eventDetails} />
      
      <RegistrationButton
        href={program.registrationLink}
        text={program.registrationText}
      />
      
      {showDivider && <Divider />}
    </div>
  );
};


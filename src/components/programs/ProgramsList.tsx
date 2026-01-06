import type { Program } from "../../types/program";
import { ProgramItem } from "./ProgramItem";

type ProgramsListProps = {
  programs: Program[];
};

export const ProgramsList = ({ programs }: ProgramsListProps) => {
  return (
    <div className="programs-list">
      {programs.map((program, index) => (
        <ProgramItem
          key={program.id}
          program={program}
          showDivider={index < programs.length - 1}
        />
      ))}
    </div>
  );
};


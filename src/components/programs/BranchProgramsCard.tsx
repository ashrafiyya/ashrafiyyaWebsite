import type { BranchPrograms } from "../../types/program";
import { ProgramsList } from "./ProgramsList";

type BranchProgramsCardProps = {
  branchPrograms: BranchPrograms;
};

export const BranchProgramsCard = ({ branchPrograms }: BranchProgramsCardProps) => {
  return (
    <div className="program-card-v4">
      <h3>
        {branchPrograms.branchName}
        <br />
        <small>{branchPrograms.branchSubtitle}</small>
      </h3>
      <ProgramsList programs={branchPrograms.programs} />
    </div>
  );
};


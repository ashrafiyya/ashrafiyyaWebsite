import { BranchProgramsCard } from "../components/programs/BranchProgramsCard";
import { branchPrograms } from "../data/programs";

export const ProgramsSection = () => {
  return (
    <section id="programs" className="programs">
      <h2>Programs</h2>
      <div className="program-grid">
        {branchPrograms.map((branch) => (
          <BranchProgramsCard key={branch.branchId} branchPrograms={branch} />
        ))}
      </div>
    </section>
  );
};

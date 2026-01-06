import { BranchIntroCard } from "../components/branches/BranchIntroCard";
import { branchIntros } from "../data/branches";

export const BranchesSection = () => {
  return (
    <section id="branches" className="programs">
      <h2>Branches</h2>
      <div className="program-grid">
        {branchIntros.map((branch) => (
          <BranchIntroCard
            key={branch.id}
            icon={branch.icon}
            iconAlt={branch.iconAlt}
            title={branch.name}
            description={branch.description}
          />
        ))}
      </div>
    </section>
  );
};

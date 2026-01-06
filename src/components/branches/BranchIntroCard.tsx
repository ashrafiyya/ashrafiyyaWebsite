type BranchIntroCardProps = {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
};

export const BranchIntroCard = ({
  icon,
  iconAlt,
  title,
  description,
}: BranchIntroCardProps) => {
  return (
    <div className="branch-intro-item">
      <img src={icon} alt={iconAlt} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};


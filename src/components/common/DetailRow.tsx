type DetailRowProps = {
  label: string;
  value: string;
};

export const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className="detail-row">
      <strong>{label}</strong>
      <span> {value}</span>
    </div>
  );
};


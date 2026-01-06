type DonateButtonProps = {
  href: string;
  logo: string;
  logoAlt: string;
  label: string;
  className: string;
};

export const DonateButton = ({
  href,
  logo,
  logoAlt,
  label,
  className,
}: DonateButtonProps) => {
  return (
    <a className={`donate-btn ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      <img src={logo} alt={logoAlt} className="donate-logo" />
      <span className={className === "zelle" ? "zelle-email" : ""}>{label}</span>
    </a>
  );
};


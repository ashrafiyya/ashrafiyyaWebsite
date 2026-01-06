type RegistrationButtonProps = {
  href?: string;
  text: string;
};

export const RegistrationButton = ({ href, text }: RegistrationButtonProps) => {
  const isActive = href && href !== "#";
  const isMailto = href?.startsWith("mailto:");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isActive) {
      e.preventDefault();
    }
  };

  return (
    <div className="button-container">
      <a
        className="insta-link insta-link-light"
        href={isActive ? href : "#"}
        {...(isActive && !isMailto && { target: "_blank", rel: "noopener noreferrer" })}
        onClick={handleClick}
        aria-label={text}
        {...(!isActive && { "aria-disabled": "true" })}
      >
        {text}
      </a>
    </div>
  );
};


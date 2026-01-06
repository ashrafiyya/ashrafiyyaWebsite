type SocialButtonProps = {
  href: string;
  svgPath: string;
  labelLong: string;
  labelShort: string;
  tooltip: string;
};

export const SocialButton = ({
  href,
  svgPath,
  labelLong,
  labelShort,
  tooltip,
}: SocialButtonProps) => {
  return (
    <a
      href={href}
      className="social-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tooltip}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={svgPath} />
      </svg>
      <span className="button-label">
        <span className="button-label-long">{labelLong}</span>
        <span className="button-label-short">{labelShort}</span>
      </span>
      <span className="button-tooltip">{tooltip}</span>
    </a>
  );
};


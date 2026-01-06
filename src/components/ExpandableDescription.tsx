import { useState } from "react";

type ExpandableDescriptionProps = {
  intro: string;
  body: string;
  extra: string[];
};

export const ExpandableDescription = ({ intro, body, extra }: ExpandableDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="expandable-description">
      <div className={`description-content${expanded ? "" : " collapsed"}`}>
        <p>{intro}</p>
        <p>{body}</p>
        {extra.map((paragraph) => (
          <p className="description-extra" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <button
        className="read-more-btn"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Collapse" : "Read More"}
      </button>
    </div>
  );
};

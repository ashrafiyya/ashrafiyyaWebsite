import { EXTERNAL_LINKS } from "../../lib/constants";

export const DonationEmbed = () => {
  return (
    <div className="zeffy-embed-container">
      <iframe
        title="Donation form powered by Zeffy"
        src={EXTERNAL_LINKS.ZEFFY_EMBED}
        allow="payment"
        loading="lazy"
      />
    </div>
  );
};


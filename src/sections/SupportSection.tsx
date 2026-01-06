import { DonateButton } from "../components/donation/DonateButton";
import { DonationEmbed } from "../components/donation/DonationEmbed";
import { donationMethods } from "../data/donationMethods";

export const SupportSection = () => {
  return (
    <section id="support-us" className="support-section">
      <div className="support-container">
        <div className="support-left">
          <h2>How You Can Support Us</h2>
          <p className="support-message">
            Secure your Ākhirah and earn reward for every good deed done — equal to the deed itself
            and those who benefit, even years from now.
          </p>
          <p className="support-message">As always, we appreciate your continued duʿās and support.</p>
        </div>
        <div className="support-right">
          <div className="support-donate-content">
            <h3 className="donate-now-header">General Donations</h3>
            <DonationEmbed />
            <div className="donate-buttons-row">
              {donationMethods.map((method) => (
                <DonateButton
                  key={method.method}
                  href={method.href}
                  logo={method.logo}
                  logoAlt={method.logoAlt}
                  label={method.label}
                  className={method.className}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

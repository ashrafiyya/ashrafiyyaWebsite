const baseUrl = import.meta.env.BASE_URL;

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
            <div className="zeffy-embed-container">
              <iframe
                title="Donation form powered by Zeffy"
                src="https://www.zeffy.com/embed/donation-form/support-ashrafiyya"
                allow="payment"
              />
            </div>
            <div className="donate-buttons-row">
              <a className="donate-btn zelle" href="mailto:AshrafiyyaNJ@gmail.com">
                <img src={`${baseUrl}images/zelle_long_logo.png`} alt="Zelle" className="donate-logo" />
                <span className="zelle-email">AshrafiyyaNJ@gmail.com</span>
              </a>
              <a
                className="donate-btn paypal"
                href="https://www.paypal.com/donate/?hosted_button_id=JQGU9HTFPJWZ4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={`${baseUrl}images/paypal_logo.png`} alt="PayPal" className="donate-logo" />
                PayPal and Card
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

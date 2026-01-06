import { SocialButton } from "../components/social/SocialButton";
import { socialLinks } from "../data/socialLinks";

export const SocialMediaSection = () => {
  return (
    <section className="social-media">
      <h2>Connect With Us</h2>
      <div className="social-buttons">
        {socialLinks.map((link) => (
          <SocialButton
            key={link.platform}
            href={link.href}
            svgPath={link.svgPath}
            labelLong={link.labelLong}
            labelShort={link.labelShort}
            tooltip={link.tooltip}
          />
        ))}
      </div>
    </section>
  );
};

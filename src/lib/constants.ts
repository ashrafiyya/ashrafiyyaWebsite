export const BASE_URL = import.meta.env.BASE_URL;

export const ASSET_PATHS = {
  LOGO: `${BASE_URL}images/logo.png`,
  HEALTH_ICON: `${BASE_URL}images/health.png`,
  CIRCLES_ICON: `${BASE_URL}images/circles.png`,
  ITQAN_ICON: `${BASE_URL}images/itqan.png`,
  ZELLE_LOGO: `${BASE_URL}images/zelle_long_logo.png`,
  PAYPAL_LOGO: `${BASE_URL}images/paypal_logo.png`,
} as const;

export const DIVIDER_SYMBOL = "◆";

export const CONTACT_EMAIL = "admin@ashrafiyya.com";
export const DONATION_EMAIL = "AshrafiyyaNJ@gmail.com";

export const EXTERNAL_LINKS = {
  PAYPAL_DONATE: "https://www.paypal.com/donate/?hosted_button_id=JQGU9HTFPJWZ4",
  ZEFFY_EMBED: "https://www.zeffy.com/embed/donation-form/support-ashrafiyya",
} as const;


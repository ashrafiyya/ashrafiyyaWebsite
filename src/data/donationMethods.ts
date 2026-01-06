import type { DonationOption } from "../types/donation";
import { ASSET_PATHS, DONATION_EMAIL, EXTERNAL_LINKS } from "../lib/constants";

export const donationMethods: DonationOption[] = [
  {
    method: "zelle",
    href: `mailto:${DONATION_EMAIL}`,
    logo: ASSET_PATHS.ZELLE_LOGO,
    logoAlt: "Zelle",
    label: DONATION_EMAIL,
    className: "zelle",
  },
  {
    method: "paypal",
    href: EXTERNAL_LINKS.PAYPAL_DONATE,
    logo: ASSET_PATHS.PAYPAL_LOGO,
    logoAlt: "PayPal",
    label: "PayPal and Card",
    className: "paypal",
  },
];


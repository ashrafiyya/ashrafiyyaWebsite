export type DonationMethod = "zelle" | "paypal";

export type DonationOption = {
  method: DonationMethod;
  href: string;
  logo: string;
  logoAlt: string;
  label: string;
  className: string;
};


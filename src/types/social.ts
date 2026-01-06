export type SocialPlatform = "whatsapp" | "telegram" | "instagram" | "facebook" | "x" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
  labelLong: string;
  labelShort: string;
  tooltip: string;
  svgPath: string;
};


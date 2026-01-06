import type { BranchIntro } from "../types/branch";
import { ASSET_PATHS } from "../lib/constants";

export const branchIntros: BranchIntro[] = [
  {
    id: "health",
    name: "Ashrafiyya Health",
    icon: ASSET_PATHS.HEALTH_ICON,
    iconAlt: "Ashrafiyya Health Icon",
    description:
      "Integrating Islamic ethics and principles into modern healthcare education and practice.",
  },
  {
    id: "circles",
    name: "Ashrafiyya Circles",
    icon: ASSET_PATHS.CIRCLES_ICON,
    iconAlt: "Ashrafiyya Circles Icon",
    description:
      "Regular learning sessions and programs for spiritual development and practical guidance.",
  },
  {
    id: "itqan",
    name: "Ashrafiyya Itqān",
    icon: ASSET_PATHS.ITQAN_ICON,
    iconAlt: "Ashrafiyya Itqān Icon",
    description:
      "Advanced Islamic studies focused on deep engagement with classical texts and scholarly traditions.",
  },
];


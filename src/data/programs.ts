import type { BranchPrograms } from "../types/program";
import { CONTACT_EMAIL } from "../lib/constants";

export const branchPrograms: BranchPrograms[] = [
  {
    branchId: "health",
    branchName: "Ashrafiyya Health",
    branchSubtitle: "Islamic Medical Ethics & Healthcare Training",
    programs: [
      {
        id: "heart-of-care",
        title: "The Heart of Care",
        descriptions: [
          "Shifting Paradigms: Medicine on an Islamic Foundation",
          "It is time to look at our field differently. Modern medicine operates on hidden assumptions that subtly define health, ethics, and the human being. This session, led by Shaykh Mateen Khan, offers a critical look at these foundational premises.",
          "We will explore a distinct Islamic framework designed to challenge these norms and fundamentally reorient the aims and daily practice of the Muslim healthcare practitioner.",
        ],
        eventDetails: [
          { label: "Date", value: "January 08, 2026" },
          { label: "Time", value: "7:00 PM – 9:00 PM" },
          { label: "Venue", value: "Remote" },
        ],
        registrationLink: "#",
        registrationText: "Details & Registration via Email",
      },
      {
        id: "rise-to-respond",
        title: "Rise to Respond: Heartsaver Course for Sisters",
        descriptions: [
          "A sister-led initiative providing American Heart Association-certified CPR training with a focus on essential first aid and emergency response—equipping Muslim women with the skills and confidence to act when it matters most.",
        ],
        eventDetails: [{ label: "Status", value: "More Coming Soon" }],
        registrationText: "Details & Registration Coming Soon",
      },
    ],
  },
  {
    branchId: "circles",
    branchName: "Ashrafiyya Circles",
    branchSubtitle: "Traditional Islamic Learning",
    programs: [
      {
        id: "hierarchy-of-knowledges",
        title: "Hierarchy of Knowledges",
        expandableDescription: {
          intro: "A Study of Tartīb al-ʿUlūm with Mawlana Numaan Cheema",
          body: "This workshop turns to the Muqaddimah of Muḥammad al-Marʿashī's Tartīb al-ʿUlūm, a work that represents one of the more deliberate post-classical reflections on the nature of the shar'i sciences, the relations between them, and the dispositions required for their proper study. This muqaddimah is not a routine preface: it advances a unified intellectual vision, mapping the sciences, clarifying their aims, and setting out the ethical and psychological cautions that must accompany their pursuit.",
          extra: [
            "Our sessions will examine al-Marʿashī's survey of the \"sciences that yield real benefit,\" which he categorizes across linguistic foundations, rational disciplines, and the revealed sciences. We will explore his distinctions between ʿilm sharʿī and other forms of knowledge, his definitions of what counts as \"revealed knowledge,\" and his principle that the legal status of knowledge follows the legal status of the maʿlūm; the object of knowledge.",
            "A central part of the discussion will be his critique of faulty pedagogical habits what he terms tadbīrāt raddiyya or beginning advanced works before grasping the essentials, entering commentaries and glosses prematurely, and overwhelming the mind with multiplicity before establishing clarity. His reliance on earlier authorities such as al-Ghazālī, Ibn Ḥajar, and Ibn Nujaym situates these concerns within a longer scholarly conversation on the aims, order, and ethics of learning.",
          ],
        },
        eventDetails: [
          { label: "Date", value: "January 10, 2026" },
          { label: "Time", value: "3:30 PM – 7:30 PM" },
          { label: "Venue", value: "Zubaida Foundation (ZF)" },
        ],
        registrationText: "Details & Registration Coming Soon",
      },
      {
        id: "kayfiyyat-salat",
        title: "A Study of Kayfiyyat Ṣalāt al-Nabī ﷺ",
        descriptions: [
          "A focused reading of this treatise on the Prophet's ﷺ prayer as upheld by the Ḥanafī school. Rooted in Qur'an, ḥadīth, early authorities, and sound legal reasoning, the work offers a rigorous defense of the school's method and reaffirms its deep connection to the Sunnah.",
        ],
        eventDetails: [{ label: "Status", value: "Coming Soon" }],
        registrationText: "Details & Registration Coming Soon",
      },
    ],
  },
  {
    branchId: "itqan",
    branchName: "Ashrafiyya Itqān",
    branchSubtitle: "Advanced Islamic Studies",
    programs: [
      {
        id: "al-durr-study",
        title: "Al-Durr Study Program",
        descriptions: [
          "A rare opportunity for graduates and advanced students to engage the influential Ḥanafī text Al-Durr al-Mukhtār through structured group readings—paired with Ibn ʿĀbidīn's Radd al-Muḥtār for deeper fiqh understanding.",
        ],
        eventDetails: [
          { label: "Status", value: "Ongoing" },
          { label: "Notes", value: "By invite only" },
        ],
        registrationLink: `mailto:${CONTACT_EMAIL}`,
        registrationText: "Inquire",
      },
    ],
  },
];


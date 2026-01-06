import type { BranchId } from "./branch";

export type EventDetail = {
  label: string;
  value: string;
};

export type ExpandableContent = {
  intro: string;
  body: string;
  extra: string[];
};

export type Program = {
  id: string;
  title: string;
  descriptions?: string[];
  expandableDescription?: ExpandableContent;
  eventDetails: EventDetail[];
  registrationLink?: string;
  registrationText: string;
};

export type BranchPrograms = {
  branchId: BranchId;
  branchName: string;
  branchSubtitle: string;
  programs: Program[];
};


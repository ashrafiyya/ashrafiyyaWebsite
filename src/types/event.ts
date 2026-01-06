import type { BranchId } from "./branch";

export type PastEventDetail = {
  label: string;
  value: string;
};

export type PastEvent = {
  id: string;
  event: string;
  date: string;
  venue?: string;
  speaker?: string;
  notes?: string;
};

export type BranchPastEvents = {
  branchId: BranchId;
  branchName: string;
  events: PastEvent[];
};


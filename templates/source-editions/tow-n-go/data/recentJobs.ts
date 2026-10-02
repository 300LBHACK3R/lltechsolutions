import type { ServiceType } from "@/data/servicePathways";

export type JobPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional factual description displayed below an additional photograph. */
  caption?: string;
};

export type RecentJob = {
  id: string;
  title: string;
  summary: string;
  /** General community only, never a customer's street address. */
  location: string;
  trailer: string;
  service: ServiceType;
  /** Main photograph used on the homepage and the project card. */
  image: JobPhoto;
  /** Additional approved photographs, shown on the recent-jobs page. */
  photos?: readonly JobPhoto[];
  /** Set true only after the actual job details and permission to publish are confirmed. */
  approvedForWebsite: boolean;
};

// Add real, approved jobs here, newest first. Advertising artwork is not evidence of a job.
// See the included editing guide for the authoring instructions.
export const recentJobs: readonly RecentJob[] = [];

export function getPublishedJobs(): readonly RecentJob[] {
  return recentJobs.filter((job) => job.approvedForWebsite);
}

import Process from "@/components/home/Process";
import Proof from "@/components/home/Proof";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process | L&L Tech Solutions",
  description:
    "See the L&L Tech Solutions process for auditing, planning, building, fixing, and maintaining business technology systems.",
};

export default function ProcessPage() {
  return (
    <>
      <Process />
      <Proof />
    </>
  );
}

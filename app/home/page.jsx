import { DateTimeDisplay, Navbar } from "@/components";
import AssignedSites from "@/components/assignedSites/AssignedSites";
import FieldSites from "@/sections/fieldSites/FieldSites";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      <section className="padding-x py-6">
        <section className="max-container">
          <DateTimeDisplay />
        </section>
      </section>
      <section className='padding-x py-12'>
        <section className="max-container">
          {/* <FieldSites /> */}
          <AssignedSites />
        </section>
      </section>

    </main>
  );
}

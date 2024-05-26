import { DateTimeDisplay, Navbar } from "@/components";
import FieldSites from "@/sections/fieldSites/FieldSites";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      <section className="padding">
        <section className="max-container">
          <DateTimeDisplay />
        </section>
      </section>
      <section className="padding">
        <FieldSites />
      </section>
    </main>
  );
}

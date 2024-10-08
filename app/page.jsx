import { DateTimeDisplay, LoginForm, Navbar, RegisterForm } from "@/components";
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
      <section className='padding'>
        <section className="max-container">
          <RegisterForm />
        </section>
      </section>
    </main>
  );
}

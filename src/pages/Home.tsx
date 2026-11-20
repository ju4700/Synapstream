import { Capabilities } from "../components/Capabilities";
import { Contact } from "../components/Contact";
import { Delivery } from "../components/Delivery";
import { Governance } from "../components/Governance";
import { Hero } from "../components/Hero";

export function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Delivery />
      <Governance />
      <Contact />
    </>
  );
}

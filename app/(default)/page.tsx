import Features04 from "@/app/components/features-04";
import Hero from "@/app/components/hero";
import Features from "@/app/components/features";

export const metadata = {
  title: "TestOpenAPI",
  description: "Automated Integration Testing for APIs",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features04 />
      <Features />
    </>
  );
}

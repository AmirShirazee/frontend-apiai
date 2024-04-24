import Maintenance from "@/app/components/Maintenance";
import Hero from "@/app/components/hero";
import Features04 from "@/app/components/features-04";
import Features from "@/app/components/features";

export const metadata = {
  title: "TestOpenAPI",
  description: "Automated Integration Testing for APIs",
};

export default function MaintenancePage() {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return <Maintenance />;
  } else {
    return (
      <>
        <Hero />
        <Features04 />
        <Features />
      </>
    );
  }
}

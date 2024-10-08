"use client";
import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import Header from "@/app/components/ui/landing-ui/header";
import Footer from "@/app/components/ui/landing-ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 1000,
      easing: "ease-out-cubic",
    });
  });

  const isInMaintenanceMode =
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <>
      {!isInMaintenanceMode && <Header />}
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}

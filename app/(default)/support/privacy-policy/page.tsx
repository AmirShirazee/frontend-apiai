import React from "react";
import PrivacyPolicy from "@/app/components/PrivacyPolicy";

export default function Story() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="pb-12 md:pb-20">
            <div className="max-w-3xl mx-auto pb-12 md:pb-16">
              <div className="text-slate-400 space-y-6">
                <PrivacyPolicy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

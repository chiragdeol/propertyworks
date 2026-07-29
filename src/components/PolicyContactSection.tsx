import React from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { Logo } from "./sections/shared";

interface PolicyContactSectionProps {
  description?: string;
}

export default function PolicyContactSection({
  description = "For questions regarding this policy or requests relating to your personal information, please contact:",
}: PolicyContactSectionProps) {
  const { settings } = useSettings();

  const phone = settings?.contactPhone || "+91-8433826365";
  const email = settings?.contactEmail || "support@propertyworks.in";
  const cleanPhone = phone.replace(/[^\d+]/g, "");

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 font-heading">
        Contact Us
      </h2>
      <p>{description}</p>
      <div className="bg-primary border border-slate-200/60 rounded-xl p-6 mt-4 space-y-2 font-medium text-slate-700">
        {/* <p className="text-lg font-bold text-primary">Property<span className="text-gold">Works</span></p>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-6">
          Real Estate Intelligence & Advisory Services
        </p> */}
         <Logo light={true} imageClassName="h-[75px] xl:h-[95px] 2xl:h-[115px]" />
        <p className="text-white">
          Email:{" "}
          <a
            href={`mailto:${email}`}
            className="text-gold hover:underline"
          >
            {email}
          </a>
        </p>
        <p className="text-white">
          Phone:{" "}
          <a
            href={`tel:${cleanPhone}`}
            className="text-gold hover:underline"
          >
            {phone}
          </a>
        </p>
        <p className="text-white">
          Website:{" "}
          <a
            href="https://www.propertyworks.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            www.propertyworks.in
          </a>
        </p>
      </div>
    </div>
  );
}

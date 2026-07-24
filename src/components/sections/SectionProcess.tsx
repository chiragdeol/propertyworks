import {
  NAVY,
  GOLD,
  RenderIcon,
  iconUserSearchMagnifier,
  iconClipboardCheckCircle,
  iconScaleBalanceCircle,
  iconChecksCircle,
  iconCalendarCircle,
  iconHandshakeCircle,
  iconLightbulbCircle2,
} from "./shared";

export default function SectionProcess() {
  const steps = [
    {
      n: "01",
      icon: iconUserSearchMagnifier,
      title: "Understand Requirements",
      body: "We deeply understand your needs, preferences, lifestyle, budget, and long-term goals.",
    },
    {
      n: "02",
      icon: iconClipboardCheckCircle,
      title: "Evaluate Priorities",
      body: "We evaluate what truly matters and map opportunities aligned with your priorities.",
    },
    {
      n: "03",
      icon: iconScaleBalanceCircle,
      title: "Compare Opportunities",
      body: "We compare projects across key factors to identify the best aligned options.",
    },
    {
      n: "04",
      icon: iconChecksCircle,
      title: "Shortlist Projects",
      body: "We present a focused shortlist that truly matches your priorities.",
    },
    {
      n: "05",
      icon: iconCalendarCircle,
      title: "Coordinate Site Visits",
      body: "We coordinate and schedule structured site visits at your convenience.",
    },
    {
      n: "06",
      icon: iconHandshakeCircle,
      title: "Support Decision Making",
      body: "We provide guidance and support you towards a confident final decision.",
    },
  ];
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1760px] mx-auto w-full">
        <div className="px-5 sm:px-8 lg:px-16 pt-12 pb-6">
          <div className="text-center">
            <h2 className="h1-global text-[#001B4F]">
              A Better Way To
              <br />
              <span style={{ color: GOLD }}>Evaluate Real Estate</span>
            </h2>
            <div className="h-[3px] w-20 mt-4 mx-auto" style={{ background: GOLD }} />
            <p className="mt-5 font-sans text-[#001B4F] text-base sm:text-lg lg:text-[20px] font-semibold">
              Our Structured Evaluation Process
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-6 lg:px-12 py-10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4 relative">
            {/* Dashed connector line for desktop */}
            <div className="hidden lg:block absolute top-[56px] sm:top-[64px] left-14 right-14 h-[1px] border-t border-dashed border-[#D4A13A]/50 -z-10" />

            {steps.map((s, i) => (
              <div key={s.n} className="flex flex-col items-center text-center relative">
                {/* Circle wrapper */}
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0">
                  {/* Circle Icon Container */}
                  <div className="w-full h-full rounded-full border border-[#D4A13A] flex items-center justify-center bg-white shadow-sm transition-all hover:border-[#D4A13A]/80 hover:shadow-md">
                    <RenderIcon
                      icon={s.icon}
                      className="h-16 w-16 sm:h-18 sm:w-18 object-contain"
                    />
                  </div>
                  {/* Badge overlapping top-center */}
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md z-10"
                    style={{ background: NAVY }}
                  >
                    {s.n}
                  </div>
                </div>

                <div className="font-serif text-[#001B4F] text-base sm:text-lg mt-4 leading-tight font-semibold">
                  {s.title}
                </div>
                <div className="h-[2px] w-10 my-2" style={{ background: GOLD }} />
                <div className="text-[#001B4F]/70 text-xs px-2 leading-snug">{s.body}</div>

                {/* Connecting gold arrows for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[56px] sm:top-[64px] -right-2.5 -translate-y-1/2 z-20">
                    <svg
                      className="h-4 w-4 text-[#D4A13A] shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className="mt-12 mx-auto max-w-4xl px-6 py-6 rounded-2xl flex flex-col md:flex-row items-center gap-4 shadow-lg text-center md:text-left border border-[#D4A13A]/50"
            style={{
              background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
              backgroundSize: "300% 300%",
              animation: "glowMove 10s ease infinite",
            }}
          >
            <div className="h-12 w-12 rounded-full border border-[#D4A13A] flex items-center justify-center shrink-0 p-1.5">
              <RenderIcon icon={iconLightbulbCircle2} className="h-8 w-8 object-contain" />
            </div>
            <div className="w-full">
              <p className="text-white text-base sm:text-lg font-medium">
                A structured process. Objective evaluation.{" "}
                <span style={{ color: GOLD }}>Informed decisions.</span>
              </p>
              <p className="p-global text-white/70 mt-1">That's the PropertyWorks difference.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

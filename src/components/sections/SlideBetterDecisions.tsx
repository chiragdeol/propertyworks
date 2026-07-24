import { y, SlideLogoBadge, SlidePanel, w, ee, SlideImage } from "./shared";

export default function SlideBetterDecisions() {
  return (
    <section className="slide-section w-full overflow-visible lg:overflow-hidden">
      <div className="block lg:hidden w-full bg-[#fcfdfe] text-primary relative">
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[350px] overflow-hidden flex flex-col justify-end p-6 md:p-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Betterdecision_img.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
          <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/20">
            <SlideLogoBadge variant="inline" size="small" />
          </div>
          <div className="relative z-10 text-white max-w-[90%]">
            <h1 className="h1-global text-white">
              Better
              <span className="text-gold">Decisions.</span>
              <br />
              Stronger
              <span className="text-gold">Futures.</span>
            </h1>
            <p className="mt-1 text-[12px] sm:text-[14px] md:text-[16px] text-white/80 font-medium">
              Real Estate Intelligence & Advisory Services
            </p>
          </div>
        </div>
        <div className="px-5 py-8 md:px-10 md:py-12 flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <div className="gold-divider" />
            <p className="text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-relaxed text-primary/80">
              We bring clarity to complexity, confidence to decisions, and value to every step of
              your real estate journey. Let's build a better future together.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="font-heading text-[18px] sm:text-[20px] font-bold text-primary text-center">
              Our Core Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {w.map((e) => (
                <div
                  key={e.title}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-sm border border-primary/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary shadow-md">
                    <SlideImage src={e.icon} size={26} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-[14px] sm:text-[15px] font-heading leading-tight mb-1">
                      {e.title}
                    </h4>
                    <p className="text-primary/70 text-[11.5px] sm:text-[12px] font-medium leading-relaxed whitespace-pre-line">
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary rounded-[14px] p-6 text-white shadow-xl border border-white/10 flex flex-col gap-5 max-w-md mx-auto w-full">
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke="#D4A13A"
                  strokeWidth="1.8"
                />
                <path
                  d="M9 11l2 2 4-4"
                  stroke="#D4A13A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-white text-[16px] sm:text-[18px] font-heading font-bold leading-tight">
                Your Goals. Our Commitment.
              </h3>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex flex-col gap-3">
              {ee.map((e) => (
                <div key={e.bold} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full border border-gold flex items-center justify-center shrink-0 mt-0.5 bg-gold/10">
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4 7L8 3"
                        stroke="#D4A13A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-white text-[12px] sm:text-[13px] font-bold">
                      {e.bold}{" "}
                    </span>
                    <span className="text-white/65 text-[11px] sm:text-[12px] font-medium">
                      {e.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-px bg-white/10" />
            <div className="font-heading font-bold text-[18px] sm:text-[20px] leading-tight text-center">
              <span className="text-gold">That's the</span>{" "}
              <span className="text-gold font-bold">PropertyWorks</span>{" "}
              <span className="text-white">Promise.</span>
            </div>
          </div>
          <div className="bg-primary rounded-[14px] p-5 shadow-lg flex flex-col gap-6 text-white">
            <div className="text-center border-b border-white/10 pb-4">
              <h3 className="text-white text-[16px] sm:text-[18px] font-heading font-bold leading-snug">
                Let's find the right place for your next chapter.
              </h3>
              <p className="text-gold text-[16px] sm:text-[18px] font-heading font-bold mt-1">
                Connect with us today.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="flex items-start gap-3 pb-3 border-b border-white/5 sm:border-b-0">
                <div className="w-[36px] h-[36px] rounded-full border border-gold/50 flex items-center justify-center shrink-0 bg-gold/10">
                  <SlideImage src={y.phone} size={22} />
                </div>
                <div className="mt-1.5">
                  <p className="text-white text-[12px] sm:text-[13px] font-semibold">
                    +91-8433826365
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-white/5 sm:border-b-0">
                <div className="w-[36px] h-[36px] rounded-full border border-gold/50 flex items-center justify-center shrink-0 bg-gold/10">
                  <SlideImage src={y.email} size={22} />
                </div>
                <div className="mt-1.5">
                  <p className="text-white text-[12px] sm:text-[13px] font-semibold truncate">
                    stany.brahmane@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-white/5 sm:border-b-0">
                <div className="w-[36px] h-[36px] rounded-full border border-gold/50 flex items-center justify-center shrink-0 bg-gold/10">
                  <SlideImage src={y.clock} size={22} />
                </div>
                <div className="mt-1.5">
                  <p className="text-white text-[12px] sm:text-[13px] font-semibold truncate">
                    11:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-white/5 sm:border-b-0">
                <div className="w-[36px] h-[36px] rounded-full border border-gold/50 flex items-center justify-center shrink-0 bg-gold/10">
                  <SlideImage src={y.location} size={22} />
                </div>
                <div>
                  <p className="text-white text-[11px] sm:text-[12px] font-bold text-[#D4A13A] uppercase tracking-wider mb-0.5">
                    Service Locations
                  </p>
                  <p className="text-white text-[12px] sm:text-[13px] font-semibold">
                    Mumbai | Thane | Navi Mumbai
                  </p>
                  <p className="text-white text-[12px] sm:text-[13px] font-semibold">
                    Emerging Growth Corridors
                  </p>
                </div>
              </div>
              <div className="sm:col-span-2 flex flex-col items-center gap-2 pt-4 border-t border-white/10">
                <div className="border border-white/15 rounded-[6px] p-[4px] bg-white flex items-center justify-center shadow-md w-[64px] h-[64px]">
                  <img
                    src="/images/dummy_qr.webp"
                    alt="QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-white/75 text-[11px] font-semibold text-center">
                  Scan to connect
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white flex items-center justify-center py-4 border-t border-b-[10px] border-gold px-4 text-center mt-4">
          <p className="text-primary text-[13.5px] sm:text-[15px] font-heading font-semibold">
            Smarter evaluation. Better choices. <span className="text-gold">A stronger future</span>{" "}
            for you and your family.
          </p>
        </div>
      </div>
      <div className="hidden lg:block slide-canvas-16-9">
        <div
          className="absolute right-0 top-0 h-[65%] w-[62%] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Betterdecision_img.webp')" }}
        />
        <SlideLogoBadge variant="absolute" spacing={6} />
        <div className="absolute left-[3%] top-[14%] w-[32%] flex flex-col gap-4">
          <h1 className="h1-global text-[#001B4F] tracking-tight leading-[1.2]">
            Better
            <span className="text-gold">Decisions.</span>
            <br />
            Stronger
            <span className="text-gold">Futures.</span>
            <div className="gold-divider mt-[4%] mb-[8%]" />
          </h1>
          <p className="mt-[5%] text-[clamp(13px,0.92vw,16px)] leading-[1.65] text-primary/80 font-medium">
            We bring clarity to complexity, confidence to decisions,
            <br />
            and value to every step of your real estate journey.
            <br />
            Let's build a better future together.
          </p>
          <div className="relative mt-[8%] grid grid-cols-2 gap-x-[32px] gap-y-[32px]">
            <div className="absolute left-1/2 top-0 w-px h-[42%] bg-primary/15 -translate-x-1/2 pointer-events-none" />
            <div className="absolute left-1/2 bottom-0 w-px h-[42%] bg-primary/15 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-0 h-px w-[42%] bg-primary/15 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-0 h-px w-[42%] bg-primary/15 -translate-y-1/2 pointer-events-none" />
            {w.map((e) => (
              <div key={e.title} className="flex items-start gap-[16px]">
                <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-primary shadow-md">
                  <SlideImage src={e.icon} size={48} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="font-bold text-primary text-[clamp(16.5px,1.05vw,22.5px)] font-heading leading-tight">
                    {e.title}
                  </p>
                  <p className="text-primary/70 text-[clamp(12px,0.85vw,15.5px)] leading-[1.45] whitespace-pre-line font-medium mt-[2px]">
                    {e.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute right-[1%] top-[4%] w-[14%] h-[50%] bg-primary rounded-[12px] text-white flex flex-col justify-start shadow-[0_8px_25px_rgba(0,28,61,0.22)] border border-white/10 z-20 gap-4"
          style={{ padding: "28px 20px" }}
        >
          <div className="w-[36px] h-[36px] mb-[6px] shrink-0">
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke="#D4A13A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11l2 2 4-4"
                stroke="#D4A13A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-white text-[clamp(13px,0.95vw,20px)] font-heading font-bold leading-tight">
            Your Goals.
            <br />
            Our Commitment.
            <div className="w-[28px] h-[1.5px] bg-gold mt-[8px] mb-[12px] shrink-0" />
          </h3>
          <div className="flex flex-col gap-[8px]">
            {ee.map((e) => (
              <div key={e.bold} className="flex items-start gap-[8px]">
                <div className="w-[16px] h-[16px] rounded-full border border-gold flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="15" height="15" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5L4 7L8 3"
                      stroke="#D4A13A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-[1px]">
                  <p className="text-white text-[clamp(10px,0.75vw,13px)] font-bold leading-none">
                    {e.bold}
                  </p>
                  <p className="text-white/65 text-[clamp(9px,0.6vw,11px)] font-medium leading-tight mt-[1px]">
                    {e.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-[12px] flex flex-col font-heading font-bold text-[clamp(12px,0.9vw,20px)] leading-[1.25]">
            <span className="text-gold">That's the</span>
            <span className="text-gold">PropertyWorks</span>
            <span className="text-white">Promise.</span>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-[6%] h-[22%] bg-primary flex items-center justify-between z-10 px-[2.5%]"
          style={{ paddingLeft: "5%", paddingRight: "5%" }}
        >
          <div className="w-[18%] flex flex-col justify-center">
            <p className="text-white text-[clamp(15px,1.1vw,24px)] font-heading font-bold leading-tight">
              Let's find the right place
              <br />
              for your next chapter.
            </p>
            <p className="text-gold text-[clamp(15px,1.1vw,24px)] font-heading font-bold leading-tight mt-[3px]">
              Connect with us today.
            </p>
          </div>
          <div className="h-[40%] w-px bg-white/15 shrink-0" />
          <div className="flex items-start gap-[clamp(4px,0.8vw,10px)] w-[14%] min-w-0">
            <SlideImage src={y.phone} size="clamp(24px, 2.2vw, 36px)" className="shrink-0 mt-0.5" />
            <div className="min-w-0 mt-1">
              <p className="text-white text-[clamp(11px,0.75vw,14px)] leading-[1.35] font-semibold whitespace-nowrap">
                +91-8433826365
              </p>
            </div>
          </div>
          <div className="h-[40%] w-px bg-white/15 shrink-0" />
          <div className="flex items-start gap-[clamp(4px,0.8vw,10px)] w-[16%] min-w-0">
            <SlideImage src={y.email} size="clamp(24px, 2.2vw, 36px)" className="shrink-0 mt-0.5" />
            <div className="min-w-0 mt-1">
              <p className="text-white text-[clamp(10px,0.75vw,14px)] leading-[1.35] font-semibold truncate">
                stany.brahmane@gmail.com
              </p>
            </div>
          </div>
          <div className="h-[40%] w-px bg-white/15 shrink-0" />
          <div className="flex items-start gap-[clamp(4px,0.8vw,10px)] w-[13%] min-w-0">
            <SlideImage src={y.clock} size="clamp(24px, 2.2vw, 36px)" className="shrink-0 mt-0.5" />
            <div className="min-w-0" style={{ marginTop: "4px" }}>
              <p className="text-white text-[clamp(10px,0.75vw,14px)] leading-[1.35] font-semibold truncate">
                11:00 AM – 7:00 PM
              </p>
            </div>
          </div>
          <div className="h-[40%] w-px bg-white/15 shrink-0" />
          <div className="flex items-start gap-[clamp(4px,0.8vw,10px)] w-[23%] min-w-0">
            <SlideImage
              src={y.location}
              size="clamp(24px, 2.2vw, 36px)"
              className="shrink-0 mt-0.5"
            />
            <div className="min-w-0">
              <p className="text-[clamp(9px,0.6vw,12px)] font-bold text-[#D4A13A] uppercase tracking-wider leading-none mb-1">
                Service Locations
              </p>
              <p className="text-white text-[clamp(10px,0.75vw,14px)] leading-[1.35] font-semibold">
                Mumbai | Thane | Navi Mumbai
              </p>
              <p className="text-white text-[clamp(10px,0.75vw,14px)] leading-[1.35] font-semibold">
                Emerging Growth Corridors
              </p>
            </div>
          </div>
          <div className="h-[40%] w-px bg-white/15 shrink-0" />
          <div className="flex flex-col items-center gap-[4px] w-[10%] shrink-0">
            <div
              className="border border-white/15 rounded-[6px] p-[3px] bg-white flex items-center justify-center shadow-md"
              style={{ width: "clamp(42px, 3.2vw, 56px)", height: "clamp(42px, 3.2vw, 56px)" }}
            >
              <img
                src="/images/dummy_qr.webp"
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-white/75 text-[clamp(9px,0.6vw,12px)] font-semibold leading-none text-center">
              Scan to connect
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[6%] bg-white flex items-center justify-center border-t border-b-[15px] border-gold">
          <p className="text-center text-primary text-[clamp(13px,1.1vw,24px)] font-heading font-semibold">
            Smarter evaluation. Better choices. <span className="text-gold">A stronger future</span>{" "}
            for you and your family.
          </p>
        </div>
      </div>
    </section>
  );
}

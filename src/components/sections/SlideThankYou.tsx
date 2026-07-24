import { y, SlideLogoBadge, O, k, SlideImage } from "./shared";

export default function SlideThankYou() {
  return (
    <section className="slide-section w-full overflow-visible lg:overflow-hidden">
      <div className="block lg:hidden w-full bg-[#fcfdfe] text-primary relative">
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[350px] overflow-hidden flex flex-col justify-end p-6 md:p-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Thankyou_img.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
          <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/20">
            <SlideLogoBadge variant="inline" size="small" />
          </div>
          <div className="relative z-10 text-white max-w-[90%]">
            <h1 className="font-heading font-semibold text-[28px] sm:text-[34px] md:text-[44px] leading-tight text-white">
              Thank You!
            </h1>
            <p className="mt-1 text-[12px] sm:text-[14px] md:text-[16px] text-white/80 font-medium">
              Real Estate Intelligence & Advisory Services
            </p>
          </div>
        </div>
        <div className="px-5 py-8 md:px-10 md:py-12 flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <div className="gold-divider" />
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-heading font-bold leading-normal text-primary">
              For considering <span className="text-gold font-bold">PropertyWorks</span> as your
              real estate advisory partner.
            </p>
            <p className="text-[13px] sm:text-[14px] font-medium leading-relaxed text-primary/75 mt-2">
              We appreciate the opportunity to be a part of your property journey and look forward
              to helping you make confident, well-informed decisions.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-[18px] sm:text-[20px] font-bold text-primary text-center">
              Our Core Commitments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {O.map((e) => (
                <div
                  key={e.title}
                  className="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-sm border border-primary/5"
                >
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-3 shadow-md">
                    <SlideImage src={e.icon} size={28} />
                  </div>
                  <h4 className="font-bold text-primary text-[14px] sm:text-[15px] font-heading leading-tight mb-1">
                    {e.title}
                  </h4>
                  <p className="text-primary/70 text-[11px] sm:text-[11.5px] leading-relaxed whitespace-pre-line">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary rounded-[14px] p-6 shadow-lg flex flex-col gap-6 text-white">
            <div className="w-[85%] border-t-2 border-b-2 border-x-0 border-gold flex flex-col justify-center items-center py-4 relative mx-auto my-2">
              <span className="absolute left-2 top-0 -translate-y-1/2 text-gold text-2xl font-heading bg-primary px-1 select-none">
                “
              </span>
              <p className="text-white text-[15px] sm:text-[17px] font-heading font-bold leading-normal text-center">
                The right guidance today
                <br />
                leads to a <span className="text-gold font-bold">better tomorrow.</span>
              </p>
              <span className="absolute right-2 bottom-0 translate-y-1/2 text-gold text-2xl font-heading bg-primary px-1 select-none">
                ”
              </span>
            </div>
            <div className="text-center border-b border-white/10 pb-4">
              <h3 className="text-white text-[16px] sm:text-[18px] font-heading font-bold leading-snug">
                Let's Build a Better Future. <span className="text-gold">Together.</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {k.map((e, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 pb-3 border-b border-white/5 sm:border-b-0 last:border-0 sm:pb-0"
                >
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                    <SlideImage src={e.icon} size={40} />
                  </div>
                  <div>
                    {e.lines.map((l) => (
                      <p key={l} className="text-white text-[12px] sm:text-[13px] font-semibold">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full bg-white flex flex-col sm:flex-row items-center justify-between py-4 border-t border-primary/10 px-6 gap-2 text-center mt-4">
          <div className="flex items-center gap-2">
            <SlideImage src={y.logo} size={44} />
            <p className="text-primary text-[11px] sm:text-[12.5px] font-bold">
              Real Estate Intelligence. Honest Advice. Better Decisions.
            </p>
          </div>
          <p className="text-primary text-[11px] sm:text-[12.5px] font-bold">Thane (W) | Mumbai</p>
        </div>
      </div>
      <div className="hidden lg:block slide-canvas-16-9 shadow-[0_12px_44px_rgba(0,0,0,0.06)] border-t border-primary/5">
        <div
          className="absolute right-0 top-0 h-[75%] w-[58%] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Thankyou_img.webp')" }}
        />
        <SlideLogoBadge variant="absolute" spacing={6} />
        <div className="absolute left-[3%] top-[14%] w-[33%] flex flex-col gap-3">
          <h1 className="font-heading font-bold text-[clamp(44px,4.5vw,72px)] leading-none text-primary">
            Thank You!
            <div className="gold-divider mt-[2%] mb-[4%]" />
          </h1>
          <p className="text-primary text-[clamp(14px,2.25vw,38px)] font-heading font-bold leading-[1.35] mt-[4%]">
            For considering <span className="text-gold font-bold">PropertyWorks</span>
            <br />
            as your real estate advisory partner.
          </p>
          <p className="text-primary/75 text-[clamp(12px,0.95vw,18px)] leading-[1.6] mt-[4%] font-medium">
            We appreciate the opportunity to be a part of your
            <br />
            property journey and look forward to helping you
            <br />
            make confident, well-informed decisions.
          </p>
          <div className="mt-[6%] overflow-hidden flex">
            {O.map((e, t) => (
              <div
                key={e.title}
                className={`flex-1 flex flex-col items-center text-center ${t < O.length - 1 ? `border-r-2 border-primary/10` : ``}`}
                style={{ padding: "3% 3%" }}
              >
                <div
                  className="w-[52px] h-[52px] rounded-full bg-primary items-center justify-center shadow-sm flex"
                  style={{ marginBottom: "6px" }}
                >
                  <SlideImage src={e.icon} size={34} />
                </div>
                <p
                  className="font-bold text-primary text-[clamp(13px,0.95vw,24px)] font-heading leading-tight"
                  style={{ marginBottom: "4px" }}
                >
                  {e.title}
                </p>
                <p className="text-primary/70 text-[clamp(10px,0.85vw,15px)] mt-[3px] leading-tight font-semibold whitespace-pre-line">
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-[6%] h-[19%] bg-primary flex items-center z-10"
          style={{ paddingLeft: "3%", paddingRight: "3%" }}
        >
          <div className="w-[31%] flex items-center justify-center h-[75%]">
            <div className="w-[75%] border-t-2 border-b-2 border-x-0 border-gold flex flex-col justify-center items-center h-full relative">
              <span className="absolute left-2 top-0 -translate-y-1/2 text-gold text-[clamp(32px,2.8vw,44px)] font-heading leading-none bg-primary px-1 select-none">
                “
              </span>
              <p className="text-white text-[clamp(22px,1.5vw,28px)] font-heading font-bold leading-[1.45] text-center">
                The right guidance today
                <br />
                leads to a <span className="text-gold font-bold">better tomorrow.</span>
              </p>
              <span className="absolute right-2 bottom-0 translate-y-1/2 text-gold text-[clamp(32px,2.8vw,44px)] font-heading leading-none bg-primary px-1 select-none">
                ”
              </span>
            </div>
          </div>
          <div
            className="w-[2px] h-[75%] bg-white/15 shrink-0 self-center mx-[3.5%]"
            style={{ marginRight: "3%" }}
          />
          <div className="w-[58%] flex flex-col justify-center h-[75%] pr-[1%] gap-4">
            <h3 className="text-white text-[clamp(14px,1.6vw,24px)] font-heading font-bold">
              Let's Build a Better Future. <span className="text-gold font-bold">Together.</span>
              <div className="w-[36px] h-[2px] bg-gold mt-[8px] mb-[16px]" />
            </h3>
            <div className="flex justify-between items-center w-full">
              {k.map((e, t) => (
                <div key={t}>
                  {t > 0 && <div className="h-[24px] w-px bg-white/15 shrink-0" />}
                  <div className="flex items-center gap-[10px] max-w-[24%]">
                    <div className="flex items-center justify-center flex-shrink-0">
                      <SlideImage src={e.icon} size="clamp(30px, 3.2vw, 50px)" />
                    </div>
                    <div>
                      {e.lines.map((l) => (
                        <p
                          key={l}
                          className="text-white text-[clamp(10px,0.75vw,14.5px)] leading-[1.35] font-semibold truncate"
                        >
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-[6%] bg-white flex items-center justify-between"
          style={{ paddingLeft: "3%", paddingRight: "3%" }}
        >
          <div className="flex items-center gap-[8px]">
            <div className="border-r border-primary/15 pr-[8px] h-[36px] flex items-center">
              <SlideImage src={y.logo} size={52} />
            </div>
            <p className="text-primary text-[clamp(12px,1vw,14.5px)] font-bold">
              Real Estate Intelligence. Honest Advice. Better Decisions.
            </p>
          </div>
          <p className="text-primary text-[clamp(12px,1vw,14.5px)] font-bold">Thane (W) | Mumbai</p>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    number: "01",
    title: "Choose your destination",
    text: "Select where you're moving and where you're from. We tailor everything to your exact situation.",
  },
  {
    number: "02",
    title: "Follow your checklist",
    text: "A personalised step-by-step guide: registration, banking, healthcare, school, housing — in the right order.",
  },
  {
    number: "03",
    title: "Move with confidence",
    text: "Every step links to official government websites. Information verified monthly by our team.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center font-sans text-[36px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A]">
          Three steps to your new home
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl bg-[#F8FAFC] p-8"
            >
              <p className="font-sans text-[56px] font-light leading-none text-[#2563EB]">
                {step.number}
              </p>
              <h3 className="mt-4 font-sans text-lg font-semibold text-[#0F172A]">
                {step.title}
              </h3>
              <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#475569]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

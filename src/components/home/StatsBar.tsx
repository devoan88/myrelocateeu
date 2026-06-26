const STATS = [
  { value: "7", label: "Countries fully covered" },
  { value: "300+", label: "Verified steps" },
  { value: "Monthly", label: "Source checks" },
  { value: "100%", label: "Official links" },
] as const;

export default function StatsBar() {
  return (
    <section className="bg-[#0F172A] py-10">
      <div className="mx-auto max-w-[1200px] px-6">
        <ul className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0">
          {STATS.map((stat) => (
            <li key={stat.label} className="px-4 text-center sm:px-6">
              <p className="font-sans text-[40px] font-semibold leading-none tracking-[-0.02em] text-[#3B82F6]">
                {stat.value}
              </p>
              <p className="mt-2 font-sans text-sm text-[#94A3B8]">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

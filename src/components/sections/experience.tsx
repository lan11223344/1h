import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { timeline, values } from "@/data/site";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-b border-border py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="经历"
            title="一路走来的时间线"
            description="从写页面到定义规范，做的事情在变，判断标准没变：交付之后还好不好维护。"
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          {/* 时间线 */}
          <ol className="relative space-y-8 border-l border-border pl-7">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 90}>
                  <li className="relative">
                    <span className="absolute -left-[2.55rem] grid size-7 place-items-center rounded-full border border-border bg-background text-muted-foreground">
                      <Icon className="size-3.5" />
                    </span>
                    <time className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {item.period}
                    </time>
                    <h3 className="mt-2 text-base font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          {/* 工作原则 */}
          <Reveal delay={120}>
            <div className="rounded-xl border border-border bg-card p-6 text-card-foreground sm:p-7">
              <h3 className="text-sm font-semibold tracking-tight">
                我的几条原则
              </h3>
              <ul className="mt-5 space-y-4">
                {values.map((value, index) => (
                  <li key={value} className="flex gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-border text-[11px] font-semibold tabular-nums text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

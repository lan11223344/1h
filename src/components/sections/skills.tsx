import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/data/site";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-b border-border bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="技能"
            title="我现在的技术边界"
            description="按真实熟练度分层，不堆关键词 —— 「能独立上手」和「正在学」是两回事，混在一起说反而不可信。"
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={index * 70} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 sm:p-6">
                  <span className="grid size-10 place-items-center rounded-lg border border-border bg-secondary text-secondary-foreground">
                    <Icon className="size-[18px]" />
                  </span>
                  <h3 className="mt-5 text-sm font-semibold tracking-tight">
                    {group.title}
                  </h3>
                  {"note" in group && group.note ? (
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/80">
                      {group.note}
                    </p>
                  ) : null}
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          className="size-1 shrink-0 rounded-full bg-foreground/25"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

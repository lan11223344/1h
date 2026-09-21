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
            title="工具与能力边界"
            description="不追新，但每次选型都会想清楚它为什么值得替换掉现有方案。"
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={index * 70}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                  <span className="grid size-10 place-items-center rounded-lg border border-border bg-secondary text-secondary-foreground">
                    <Icon className="size-[18px]" />
                  </span>
                  <h3 className="mt-5 text-sm font-semibold tracking-tight">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="size-1 rounded-full bg-foreground/25" />
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

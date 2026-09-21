import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/site";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 border-b border-border py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="作品"
            title="做过的一些东西"
            description="从企业级中台到开源工具，下面这些项目都真正跑在生产环境里。"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.title} delay={index * 70}>
                <a
                  href={project.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_18px_48px_-24px_rgb(0_0_0_/_0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {/* 悬停时浮现的强调色光晕 */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{ background: project.accent }}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <span
                      className="grid size-10 place-items-center rounded-lg border"
                      style={{
                        borderColor: `color-mix(in srgb, ${project.accent} 30%, transparent)`,
                        background: `color-mix(in srgb, ${project.accent} 12%, transparent)`,
                        color: project.accent,
                      }}
                    >
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  <div className="relative mt-5 flex-1">
                    <h3 className="text-base font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="relative mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="relative mt-5 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <div className="text-lg font-semibold tabular-nums tracking-tight">
                        {project.metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {project.metric.label}
                      </div>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

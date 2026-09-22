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
            title="我做出来的东西"
            description="数量不多，但每一个都从想法走到了能访问的地址。"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.title} delay={index * 70} className="h-full">
                <a
                  href={project.href}
                  // 不用 target="_blank"：规避国产浏览器新窗口打不开的问题
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-5 text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_18px_48px_-24px_rgb(0_0_0_/_0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-6"
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
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
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

                  <div className="relative mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
                    <div className="min-w-0">
                      <div className="truncate text-lg font-semibold tabular-nums tracking-tight">
                        {project.metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {project.metric.label}
                      </div>
                    </div>
                    <ArrowUpRight className="mb-1 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* 作品数量不多，这里坦白说明比堆砌假项目更可信 */}
        <Reveal delay={240}>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            目前公开项目还不多 —— 与其凑数，不如把每一个都做扎实。这个站点会持续更新。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

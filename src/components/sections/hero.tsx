import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { DisplayCards } from "@/components/ui/display-cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroCards, profile, socials } from "@/data/site";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-border pt-28 sm:pt-32"
    >
      {/* 背景装饰 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-noise opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/[0.14]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8">
          {/* 左：文案 */}
          <div className="animate-fade-up max-w-xl">
            <Badge variant="outline" className="gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              当前可接受新的合作
            </Badge>

            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {profile.name}
              <span className="mt-2 block text-muted-foreground">
                {profile.role}
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#work">
                查看作品
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline" href={`mailto:${profile.email}`}>
                <Mail className="size-4" />
                联系我
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {profile.location}
              </span>
              {socials.slice(0, 3).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid-cols-4">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 右：Display Cards 卡片堆 —— 页面视觉核心 */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[26rem] lg:max-w-none">
              <p className="mb-1 pl-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                现在的状态
              </p>
              <DisplayCards
                cards={heroCards}
                spread={1}
                offsetY={0}
                className="mx-auto lg:mx-0"
              />
              <p className="mt-1 pl-1 text-xs text-muted-foreground">
                悬停或按 Tab 聚焦，卡片会展开
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

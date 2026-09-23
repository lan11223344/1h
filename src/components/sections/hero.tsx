import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { DisplayCards } from "@/components/ui/display-cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroCards, profile, socials } from "@/data/site";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-border pt-24 sm:pt-32"
    >
      {/* 背景装饰 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-noise opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] max-w-none -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/[0.14]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
        {/*
          移动端顺序：先身份 → 再卡片堆 → 最后统计。
          桌面端恢复成「左文案 / 右卡片」的两栏布局。
        */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8">
          {/* 左：文案 */}
          <div className="animate-fade-up max-w-xl">
            <Badge variant="outline" className="gap-1.5">
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
              寻找实习 / 项目机会
            </Badge>

            <h1 className="mt-5 text-balance text-[2.125rem] font-bold leading-[1.1] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl">
              {profile.name}
              <span className="mt-2 block text-[1.375rem] leading-snug text-muted-foreground sm:text-2xl lg:text-3xl">
                {profile.role}
              </span>
            </h1>

            {/* 学校信息：面试官第一眼要看到的关键事实 */}
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 shrink-0" />
                {profile.location}
              </span>
              <span className="hidden text-border sm:inline" aria-hidden="true">
                |
              </span>
              <span>{profile.headline}</span>
            </p>

            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-base lg:text-lg">
              {profile.summary}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
              <Button href="#work">
                查看作品
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline" href={`mailto:${profile.email}`}>
                <Mail className="size-4" />
                联系我
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground sm:mt-8">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  /*
                    不用 target="_blank"：vivo / QQ / UC 等国产浏览器内核
                    对新窗口打开支持不完整，点按可能完全无响应。
                    当前页跳转在所有浏览器上都可靠，且手机上有返回键。
                    py-2/-my-2 把触控热区扩到 44px 而不改变视觉布局。
                  */
                  className="inline-flex items-center py-2 -my-2 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* 统计：桌面端跟文案走，移动端挪到卡片堆下面（见下方 sm:hidden 区块） */}
            <dl className="mt-10 hidden grid-cols-4 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 text-xl font-semibold tabular-nums tracking-tight lg:text-2xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 右：Display Cards 卡片堆 —— 页面视觉核心 */}
          <div className="flex flex-col items-center lg:justify-end">
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
              {/*
                交互提示：点按（或键盘聚焦）换位，设备之间行为一致
              */}
              <p className="mt-2 pl-1 text-xs leading-relaxed text-muted-foreground">
                <span className="hidden sm:inline">
                  点击卡片，或用 Tab 聚焦后按回车 —— 最前的一张沉到底，下一张浮上来
                </span>
                <span className="sm:hidden">
                  点按卡片切换顺序，最前的一张沉到底
                </span>
              </p>
            </div>
          </div>

          {/* 移动端专属：统计条放在卡片堆之后，避免把首屏内容挤下去 */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-7 sm:hidden">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { interests, profile, socials } from "@/data/site";

export function About() {
  return (
    <section className="border-b border-border bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="关于"
              title="工作之外"
              description="写代码之外的时间，大多花在这几件事上 —— 它们反过来也在影响我怎么做产品。"
            />
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {interests.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    <div className="mt-3 text-sm font-medium">{item.label}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {item.note}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <blockquote className="rounded-xl border border-border bg-card p-7 text-card-foreground sm:p-9">
              <p className="text-lg font-medium leading-relaxed tracking-tight sm:text-xl">
                「{profile.tagline}」
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {profile.initials}
                </span>
                <div>
                  <div className="text-sm font-medium">{profile.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {profile.role}
                  </div>
                </div>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-7 py-14 text-center text-card-foreground sm:px-14 sm:py-20">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
            />
            <div className="relative">
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                有想法？聊聊看
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                无论是新项目、设计系统梳理，还是只想讨论一个交互细节，都欢迎来信。
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href={`mailto:${profile.email}`}>
                  <Mail className="size-4" />
                  {profile.email}
                </Button>
                <Button variant="outline" href="#home">
                  回到顶部
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-border pt-8 text-sm text-muted-foreground">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-muted-foreground sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. 保留所有权利。
        </p>
        <p className="flex items-center gap-3">
          <span>React · TypeScript · Tailwind CSS</span>
          <span aria-hidden="true" className="text-border">
            |
          </span>
          <a
            href="https://21st.dev/r/user_Codehagen/display-cards"
            target="_blank"
            rel="noreferrer noopener"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Display Cards by Codehagen
          </a>
        </p>
      </div>
    </footer>
  );
}

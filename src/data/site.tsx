import {
  Aperture,
  Boxes,
  Compass,
  Cpu,
  Database,
  Gamepad2,
  Gauge,
  Layers,
  LayoutDashboard,
  Music4,
  PenTool,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Type,
  Workflow,
} from "lucide-react";
import type { DisplayCardItem } from "@/components/ui/display-cards";
import * as React from "react";

/* ------------------------------------------------------------------ */
/* 基本信息                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "兰浩",
  initials: "LH",
  role: "前端工程师 · 界面系统设计",
  location: "中国 · 深圳",
  email: "hello@example.com",
  tagline: "把复杂的产品逻辑，收敛成一眼就懂的界面。",
  summary:
    "七年时间在做同一件事：让界面在真实业务里既好看又好用。擅长 React 生态、设计系统搭建与交互动效，习惯把设计稿拆到像素级，也习惯用性能数据说话。",
  stats: [
    { label: "年经验", value: "7+" },
    { label: "交付项目", value: "60+" },
    { label: "开源 Star", value: "2.4k" },
    { label: "设计系统", value: "4" },
  ],
};

export const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "即刻", href: "https://web.okjike.com" },
];

/* ------------------------------------------------------------------ */
/* Hero 卡片堆（Display Cards 核心演示）                                */
/* ------------------------------------------------------------------ */

export const heroCards: DisplayCardItem[] = [
  {
    icon: <Compass className="size-4" />,
    title: "正在做的",
    description: "为一家新能源企业重构数据中台，把 12 个后台收敛成一套设计系统。",
    date: "进行中",
    iconClassName:
      "border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    titleClassName: "text-foreground",
  },
  {
    icon: <Boxes className="size-4" />,
    title: "开源项目",
    description: "ui-kit-pro：一套无样式依赖可换肤的组件底座，覆盖 48 个基础组件。",
    date: "2 周前更新",
    iconClassName:
      "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: <Sparkles className="size-4" />,
    title: "最近专注",
    description: "交互动效与可访问性——让键盘用户也能走完每一条主流程。",
    date: "本周",
    iconClassName:
      "border-cyan-500/25 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
];

/* ------------------------------------------------------------------ */
/* 技能                                                                */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    icon: Terminal,
    title: "工程与框架",
    items: ["React 18/19", "TypeScript", "Next.js", "Vite", "Node.js", "TanStack"],
  },
  {
    icon: PenTool,
    title: "样式与设计系统",
    items: ["Tailwind CSS", "shadcn/ui", "Radix UI", "Design Tokens", "Figma", "CVA"],
  },
  {
    icon: Gauge,
    title: "性能与体验",
    items: ["Core Web Vitals", "Lazy / Suspense", "虚拟列表", "WCAG 2.2", "Lighthouse", "动效性能"],
  },
  {
    icon: Database,
    title: "数据与协作",
    items: ["REST / GraphQL", "Zustand", "React Query", "Git Flow", "CI/CD", "Vitest"],
  },
];

/* ------------------------------------------------------------------ */
/* 作品集                                                              */
/* ------------------------------------------------------------------ */

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  icon: React.ElementType;
  accent: string;
  metric: { value: string; label: string };
  href: string;
};

export const projects: Project[] = [
  {
    title: "Insight 数据中台",
    subtitle: "企业级数据分析工作台",
    description:
      "把 12 个分散的后台统一为单一工作台，抽象出可组合的图表与筛选器原语，业务方可自行搭建看板。",
    tags: ["React", "TypeScript", "ECharts", "设计系统"],
    year: "2026",
    icon: LayoutDashboard,
    accent: "hsl(217 91% 60%)",
    metric: { value: "-38%", label: "看板搭建耗时" },
    href: "#",
  },
  {
    title: "ui-kit-pro",
    subtitle: "开源组件底座",
    description:
      "零样式依赖的组件层，通过 CSS 变量换肤，48 个基础组件全部通过 a11y 自动化测试，被 3 个团队接入生产。",
    tags: ["开源", "Radix UI", "Tailwind", "Vitest"],
    year: "2025",
    icon: Layers,
    accent: "hsl(271 81% 56%)",
    metric: { value: "2.4k", label: "GitHub Stars" },
    href: "#",
  },
  {
    title: "Critique 协作批注",
    subtitle: "设计稿实时评审工具",
    description:
      "基于 CRDT 的多人实时批注画布，支持像素级锚点与线程讨论，把评审往返从三天压到一次会议。",
    tags: ["Next.js", "Yjs", "WebSocket", "Canvas"],
    year: "2025",
    icon: Aperture,
    accent: "hsl(189 94% 43%)",
    metric: { value: "3×", label: "评审效率" },
    href: "#",
  },
  {
    title: "Pulse 实时监控",
    subtitle: "前端可观测平台",
    description:
      "自研埋点 SDK 与错误聚合面板，准确还原用户操作路径，线上问题平均定位时间从小时级降到分钟级。",
    tags: ["SDK", "数据可视化", "性能", "告警"],
    year: "2024",
    icon: Gauge,
    accent: "hsl(160 84% 39%)",
    metric: { value: "12min", label: "平均定位时长" },
    href: "#",
  },
  {
    title: "Mosaic 低代码搭建",
    subtitle: "营销页面可视化编辑器",
    description:
      "拖拽式搭建引擎，产出静态页面首屏 0.9s，支撑市场团队月均发布 40 个活动页，无需研发介入。",
    tags: ["低代码", "Schema", "SSR", "内容运营"],
    year: "2024",
    icon: Workflow,
    accent: "hsl(31 97% 55%)",
    metric: { value: "0.9s", label: "首屏 LCP" },
    href: "#",
  },
  {
    title: "Type Craft 字体工具",
    subtitle: "中文字体子集化与预览",
    description:
      "面向中文场景的字体子集化工具，按需裁剪字形，把 8MB 中文字体压到 240KB，附带网页实时预览。",
    tags: ["工具", "WASM", "字体", "性能"],
    year: "2023",
    icon: Type,
    accent: "hsl(340 82% 52%)",
    metric: { value: "-97%", label: "字体体积" },
    href: "#",
  },
];

/* ------------------------------------------------------------------ */
/* 经历                                                                */
/* ------------------------------------------------------------------ */

export const timeline = [
  {
    period: "2023 — 至今",
    title: "资深前端工程师 · 某科技公司",
    description:
      "负责数据产品线的前端架构与设计系统。推动组件库从 0 到 1，覆盖 9 条业务线，前端需求交付周期缩短约 40%。",
    icon: Rocket,
  },
  {
    period: "2021 — 2023",
    title: "前端工程师 · 某 SaaS 平台",
    description:
      "主导管理后台重构，抽象权限与表单引擎，把 200+ 页面收敛到 20 个可复用模板，同时把首屏从 4.1s 优化到 1.2s。",
    icon: Cpu,
  },
  {
    period: "2019 — 2021",
    title: "前端开发 · 某互联网创业团队",
    description:
      "从零参与产品上线，负责 Web 端与移动 H5，建立代码规范、CI 流程与错误监控体系，团队从 2 人扩到 8 人。",
    icon: ShieldCheck,
  },
];

/* ------------------------------------------------------------------ */
/* 关于我 —— 兴趣与状态                                                 */
/* ------------------------------------------------------------------ */

export const interests = [
  { icon: Gamepad2, label: "单机游戏", note: "偏爱叙事与沉浸感" },
  { icon: Music4, label: "电子音乐", note: "写代码时的背景音" },
  { icon: Cpu, label: "硬件折腾", note: "装机与性能调优" },
  { icon: Music4, label: "长跑", note: "每周 3 次，配速 5'30\"" },
];

export const values = [
  "先把问题定义清楚，再动手写代码。",
  "界面是产品的一部分，不是贴上去的皮。",
  "能被测试覆盖的约定，才叫规范。",
  "性能是功能，不是优化项。",
];

export const nav = [
  { label: "首页", href: "#home" },
  { label: "作品", href: "#work" },
  { label: "技能", href: "#skills" },
  { label: "经历", href: "#experience" },
  { label: "联系", href: "#contact" },
];

export { Compass };
